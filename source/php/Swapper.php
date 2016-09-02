<?php

namespace AttachmentRevisions;

class Swapper
{
    public function __construct()
    {
        add_action('add_meta_boxes', array($this, 'addSwapperMetaBox'));
        add_action('wp_ajax_attachment_revisions_swap', array($this, 'swap'));
    }

    public function addSwapperMetaBox()
    {
        add_meta_box(
            'swapper',
            __('Media swapper', 'attachment-revisions'),
            array($this, 'swapperMetaBoxContent'),
            null,
            'normal',
            'high'
        );
    }

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

        // Do the swap
        // 1. Create revision of old values
        // 2. Change the current file path

        // Ajax return
        if (defined('DOING_AJAX')) {
            echo "HEJ";
            wp_die();
        }

        return true;
    }
}
