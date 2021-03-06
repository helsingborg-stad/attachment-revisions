<?php

namespace AttatchmentRevisions;

class App
{
    public static $revisionMetaKey = '_media-replace-revisions';

    public function __construct()
    {
        add_action('admin_enqueue_scripts', array($this, 'enqueueScripts'));
        add_action('edit_attachment', array($this, 'replaceMedia'));
        add_action('edit_attachment', array($this, 'restoreRevision'));

        add_filter('attachment_fields_to_edit', array($this, 'formFields'), 10, 2);

        add_filter('wp_get_attachment_image_src', array($this, 'preventCache'));
        add_filter('wp_prepare_attachment_for_js', array($this, 'jsPreventCache'));

        // Ajax
        add_action('wp_ajax_attachment_revisions_remove_attachment', array($this, 'removeAttachment'));
    }

    public function enqueueScripts()
    {
        global $current_screen;
        if (!in_array($current_screen->id, array('attachment', 'upload'))) {
            return;
        }

        wp_enqueue_style('media-replacer', ATTACHMENT_REVISIONS_URL . '/dist/'
            .\AttatchmentRevisions\Helper\CacheBust::name('css/attachment-revisions.css'),
            array(), '1.0.0');


        wp_enqueue_script('media-replacer', ATTACHMENT_REVISIONS_URL . '/dist/'
            .\AttatchmentRevisions\Helper\CacheBust::name('js/attachment-revisions.js'),
            array(), '1.0.0', true);


        wp_localize_script(
            'media-replacer',
            'mediaReplacer',
            array(
                'newImage' => __("Upload new image", 'media-replacer'),
                'replace' => __("Replace image", 'media-replacer'),
            )
        );
    }

    public function restoreRevision($postId)
    {
        if (!isset($_POST['media-replace-restore']) || empty($_POST['media-replace-restore'])) {
            return;
        }

        if (!file_exists($_POST['media-replace-restore'])) {
            wp_die('The reivions file did not exist and could therefore not be restored.');
        }

        $uploadDir = wp_upload_dir();

        $current = $uploadDir['basedir'] . '/' . get_post_meta($postId, '_wp_attached_file', true);
        $restore = $_POST['media-replace-restore'];

        $backup = $this->createBackup($current);
        $replace = $this->replaceFile($current, $restore);

        // Update attachment metadata
        $meta = wp_generate_attachment_metadata($postId, $current);
        wp_update_attachment_metadata($postId, $meta);

        // Update revision meta
        $revisions = get_post_meta($postId, self::$revisionMetaKey, true);
        if (!$revisions) {
            $revisions = array();
        }

        $revisions[time()] = $backup;
        update_post_meta($postId, self::$revisionMetaKey, $revisions);
    }

    /**
     * Replaces the media file
     * @return void
     */
    public function replaceMedia($postId)
    {
        if (empty($_POST['media-replacer-replace-with']) || !is_numeric($_POST['media-replacer-replace-with'])) {
            return;
        }

        $uploadDir = wp_upload_dir();

        $filename = $uploadDir['basedir'] . '/' . get_post_meta($postId, '_wp_attached_file', true);
        $file = pathinfo($filename);
        $replacementFile = $uploadDir['basedir'] . '/' . get_post_meta($_POST['media-replacer-replace-with'], '_wp_attached_file', true);

        $backup = $this->createBackup($filename);
        $replaced = $this->replaceFile($filename, $replacementFile);

        if ($replaced) {
            unlink($replacementFile);
        }

        // Update attachment metadata
        $meta = wp_generate_attachment_metadata($postId, $filename);
        wp_update_attachment_metadata($postId, $meta);

        // Update revision meta
        $revisions = get_post_meta($postId, self::$revisionMetaKey, true);
        if (!$revisions) {
            $revisions = array();
        }

        $revisions[time()] = $backup;
        update_post_meta($postId, self::$revisionMetaKey, $revisions);

        // Remove replacement attachment post
        $this->removeAttachment($_POST['media-replacer-replace-with']);
    }

    /**
     * Replaces a file
     * @param  string $original    Path to original
     * @param  string $replacement Path to replacement
     * @return string|boolean
     */
    public function replaceFile($original, $replacement)
    {
        $this->removeThumbnails($original);

        if (copy($replacement, $original)) {
            return $original;
        }

        return false;
    }

    /**
     * Remove thumbnails for a image
     * @param  string $filename Path to original file
     * @return boolean
     */
    public function removeThumbnails($filename)
    {
        $file = pathinfo($filename);

        // Regexp pattern to find thumbs
        $pattern = '/' . $file['filename'] . '-([0-9]+)x([0-9]+)\.' . $file['extension'] . '/';

        $remove = (array) glob($file['dirname'] . '/*.' . $file['extension']);
        $remove = array_filter($remove, function ($item) use ($pattern) {
            return preg_match($pattern, $item);
        });

        array_map('unlink', $remove);

        return true;
    }

    /**
     * Creates a backup of a media file
     * @param  string $originalPath The original file path
     * @return [type]               [description]
     */
    public function createBackup($originalPath)
    {
        // Bail if file does not exist
        if (!file_exists($originalPath)) {
            return false;
        }

        $pathinfo = pathinfo($originalPath);

        $backupPrefered = $pathinfo['dirname'] . '/' . $pathinfo['filename'] . '.' . $pathinfo['extension'] . '.bkp';
        $backupFile = $backupPrefered;

        $i = 0;
        while (file_exists($backupFile)) {
            $i++;
            $backupFile = $backupPrefered . $i;
        }

        if (copy($originalPath, $backupFile)) {
            return $backupFile;
        }

        return false;
    }

    /**
     * Adds replacer field to the edit attachment form
     * @param  array $fields Original fields
     * @return array         Fields to use
     */
    public function formFields($fields, $post)
    {
        // Bail if its not edit attachment page
        if (!isset($_GET['post']) || $post->post_type !== 'attachment') {
            return $fields;
        }

        add_thickbox();
        wp_enqueue_media();
        $uploadDir = wp_upload_dir();

        $mime =  mime_content_type($uploadDir['basedir'] . '/' . get_post_meta(get_the_id(), '_wp_attached_file', true));

        // Media replace button
        $html = '<button type="button" class="button-secondary button-large" data-action="media-replacer-replace" data-mime="' . $mime . '" data-edit-link="' . get_edit_post_link($post->ID) . '">' . __('Replace media', 'media-replacer') . '</button>
                 <input type="hidden" name="media-replacer-replace-with">';

        // Revision button
        $revisions = get_post_meta($post->ID, self::$revisionMetaKey, true);
        if (!is_array($revisions)) {
            $revisions = array();
        }

        $revisions = array_reverse($revisions, true);

        if (count($revisions) > 0) {
            $html .= '<a href="#TB_inline?width=600&height=550&inlineId=media-replace-revisions-thickbox-' . $post->ID . '" class="thickbox button-secondary button-large" data-action="media-replacer-revisions" data-edit-link="' . get_edit_post_link($post->ID) . '">' . __('Media revisions', 'media-replacer') . '</a>';
            $html .= '<div id="media-replace-revisions-thickbox-' . $post->ID . '" style="display:none;"><ul class="media-replace-revisions">';
        }

        foreach ($revisions as $time => $path) {
            if (!file_exists($path)) {
                continue;
            }

            $url = str_replace($uploadDir['basedir'], $uploadDir['baseurl'], $path);

            $date = mysql2date('Y-m-d H:i', date('Y-m-d H:i:s', $time));
            $html .= '<li data-restore="' . $path . '">';

            if (explode('/', mime_content_type($path))[0] === 'image') {
                $html .= '<div class="media-replace-revision-thumb" style="background-image:url(' . $url . ')"></div>';
            }

            $html .= '<time>' . $date . '</time>';
            $html .= '</li>';
        }

        if (count($revisions)) {
            $html .= '</ul>
                <div class="media-replace-revision-footer">
                    <button type="button" class="button button-large" data-action="media-replace-close-thickbox">' . __('Cancel') . '</button>
                    <button type="button" class="button button-large button-primary" data-action="media-replace-close-thickbox">' . __('Ok') . '</button>
                </div>
            </div><input type="hidden" name="media-replace-restore">';
        }

        $fields['media_replacer'] = array(
            'label' => '',
            'input' => 'html',
            'html' => $html
        );

        return $fields;
    }

    public function preventCache($attributes)
    {
        if (!is_admin() || empty($attributes[0])) {
            return $attributes;
        }

        if (!isset($attr[0]) || strpos($attr[0], '?') === false) {
            $attributes[0] .= '?_t=' . time();
        } else {
            $attributes[0] .= '&_t=' . time();
        }

        return $attributes;
    }

    public function jsPreventCache($response)
    {
        if (!is_admin()) {
            return $response;
        }

        if (!isset($response['url']) || !isset($response['sizes'])) {
            return $response;
        }

        if (strpos($response['url'], '?') !== false) {
            $response['url'] .= (strpos($response['url'], '?') === false ? '?' : '&') . '_t=' . time();
        }

        foreach ($response['sizes'] as $sizeName => $size) {
            $response['sizes'][$sizeName]['url'] .= (strpos($size['url'], '?') === false ? '?' : '&') . '_t=' . time();
        }

        return $response;
    }

    public function removeAttachment($id = null)
    {
        if (defined('DOING_AJAX') && DOING_AJAX) {
            if (isset($_POST['id'])) {
                $id = $_POST['id'];
            } else {
                echo 'failure!';
                wp_die();
            }
        }

        wp_delete_post($id, true);

        if (defined('DOING_AJAX') && DOING_AJAX) {
            echo 'success';
            wp_die();
        }

        return true;
    }
}
