<?php

namespace AttachmentRevisions;

class Swapper
{
    public function __construct()
    {
        add_action('add_meta_boxes', array($this, 'addSwapperMetaBox'));
        add_action('wp_ajax_attachment_revisions_swap', array($this, 'swap'));

        add_filter('wp_get_revision_ui_diff', array($this, 'revisionCompareUi'), 10, 3);

        //add_action('admin_init', array($this, 'test'));
    }

    public function test()
    {
        $this->swap(31759, json_decode('{"id":31783,"title":"Helsingborgare i olika åldrar och av olika ursprung umgås.","filename":"varvinter_1800x350_9.jpg","url":"http://hbg2.dev/wp-content/uploads/2016/01/varvinter_1800x350_9.jpg","link":"http://hbg2.dev/?attachment_id=30494","alt":"","author":"1","description":"","caption":"Helsingborgare i olika åldrar och av olika ursprung umgås.","name":"helsingborgare-i-olika-aldrar-och-av-olika-ursprung-umgas","status":"inherit","uploadedTo":26987,"date":"2016-03-15T11:56:50.000Z","modified":"2016-06-23T09:02:33.000Z","menuOrder":0,"mime":"image/jpeg","type":"image","subtype":"jpeg","icon":"http://hbg2.dev/wp-includes/images/media/default.png","dateFormatted":"15 mars, 2016","nonces":{"update":"0bbf865a59","delete":"8f85cf8931","edit":"36692925af"},"editLink":"http://hbg2.dev/wp-admin/post.php?post=30494&action=edit","meta":false,"authorName":"Beth","uploadedToLink":"http://hbg2.dev/wp-admin/post.php?post=26987&action=edit","uploadedToTitle":"Front page hero","filesizeInBytes":517644,"filesizeHumanReadable":"506 KB","sizes":{"thumbnail":{"height":150,"width":150,"url":"http://hbg2.dev/wp-content/uploads/2016/01/varvinter_1800x350_9-150x150.jpg","orientation":"landscape"},"large":{"height":199,"width":1024,"url":"http://hbg2.dev/wp-content/uploads/2016/01/varvinter_1800x350_9-1024x199.jpg","orientation":"landscape"},"full":{"url":"http://hbg2.dev/wp-content/uploads/2016/01/varvinter_1800x350_9.jpg","height":350,"width":1800,"orientation":"landscape"},"medium_large":{"height":149,"width":768,"url":"http://hbg2.dev/wp-content/uploads/2016/01/varvinter_1800x350_9-768x149.jpg","orientation":"landscape"}},"height":350,"width":1800,"orientation":"landscape","compat":{"item":"","meta":""},"filesize":"506 KB","acf_errors":false}'));
    }

    /**
     * Adds meta box for swap button
     * @return  void
     */
    public function addSwapperMetaBox()
    {
        global $post;

        if (!isset($post->post_type) || $post->post_type != 'attachment') {
            return;
        }

        add_meta_box(
            'swapper',
            __('Media swapper', 'attachment-revisions'),
            array($this, 'swapperMetaBoxContent'),
            null,
            'normal',
            'high'
        );
    }

    /**
     * Swap button metabox content
     * @return void
     */
    public function swapperMetaBoxContent()
    {
        echo '
            <p>' . __('Click the "Swap media file" button to replace the media file in this attachment. This will also create a revision of the attachment so that you can undo your changes if you would like.', 'attachment-revisions') . '</p>
            <p><button class="button" data-attachment-revisions-action="swap-media">' . __('Swap media file', 'attachment-revisions') . '</button></p>
        ';
    }

    /**
     * Executes the media file swap
     * @param  integer $id    Attachment id
     * @param  object  $file  Media file object
     * @return boolean
     */
    public function swap($id = null, $file = null)
    {
        // Populate parameters if ajax
        if (defined('DOING_AJAX')) {
            $id = $_POST['id'];
            $file = $_POST['file'];
        }

        // Convert file from array or object to object
        $file = json_decode(json_encode($file));

        // Get and check attachment
        $attachment = get_post($id);
        if (!$attachment) {
            if (defined('DOING_AJAX')) {
                wp_die('Attachment does not exist');
            }

            throw new Error('Attachment does not exist');
            exit;
        }

        // New file path
        $newFilePath = str_replace(WP_CONTENT_URL, WP_CONTENT_DIR, $file->url);
        if (!file_exists($newFilePath)) {
            if (defined('DOING_AJAX')) {
                wp_die('File at url ' . $newFilePath . ' does not exist');
            }

            throw new Error('File at url ' . $newFilePath . ' does not exist');
            exit;
        }

        // Create revision
        $revisionPost = clone $attachment;
        $now = current_time('mysql');
        $now_gmt = current_time('mysql', 1);

        $revisionPost->post_modified = $now;
        $revisionPost->post_modified_gmt = $now_gmt;

        $revision = _wp_put_post_revision($revisionPost);
        $meta = add_metadata('post', $revision, 'attachment-revision-file', $attachment->guid, true);

        // Update attachment
        update_attached_file($attachment->ID, $newFilePath);
        global $wpdb;
        $wpdb->update(
            $wpdb->posts,
            array('guid' => $file->url),
            array('ID' => $attachment->ID),
            array('%s'),
            array('%d')
        );
        update_post_meta($attachment->ID, 'attachment-revision-file', $file->url);

        // Delete the temp version of the "swapped to" image
        $delete = wp_delete_attachment($file->id, true);

        // Ajax return
        if (defined('DOING_AJAX')) {
            echo 'success';
            wp_die();
        }

        return true;
    }

    /**
     * Setup the compare revision ui to compare attachment
     * @param  array  $return      UI parameters to return
     * @param  object $compareFrom Post object from
     * @param  object $compareTo   Post object to
     * @return array               UI parameters to return
     */
    public function revisionCompareUi($return, $compareFrom, $compareTo)
    {
        $fileFrom = get_metadata('post', $compareFrom->ID, 'attachment-revision-file', true);
        $fileTo = get_metadata('post', $compareTo->ID, 'attachment-revision-file', true);

        if ($fileFrom == $fileTo) {
            return $return;
        }

        $fileFrom = str_replace(WP_CONTENT_DIR, WP_CONTENT_URL, $fileFrom);
        if ($fileFrom && file_exists(str_replace(WP_CONTENT_URL, WP_CONTENT_DIR, $fileFrom)) && strpos(mime_content_type(str_replace(WP_CONTENT_URL, WP_CONTENT_DIR, $fileFrom)), 'image/') !== false) {
            $fileFrom = '<img src="' . $fileFrom . '" width="200">';
        }

        $fileTo = str_replace(WP_CONTENT_DIR, WP_CONTENT_URL, $fileTo);
        if ($fileTo && file_exists(str_replace(WP_CONTENT_URL, WP_CONTENT_DIR, $fileTo)) && strpos(mime_content_type(str_replace(WP_CONTENT_URL, WP_CONTENT_DIR, $fileTo)), 'image/') !== false) {
            $fileTo = '<img src="' . $fileTo . '" width="200">';
        }

        $return[] = array(
            'id' => 'attachment-revision-file',
            'name' => __('Media'),
            'diff' => '<table class="diff"><colgroup><col class="content diffsplit left"><col class="content diffsplit middle"><col class="content diffsplit right"></colgroup><tbody><tr><td class="diff-deletedline">' . $fileFrom . '</td><td></td><td class="diff-addedline">' . $fileTo . '</td></tr></tbody></table>'
        );

        return $return;
    }
}
