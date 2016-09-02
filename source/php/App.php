<?php

namespace AttachmentRevisions;

class App
{
    public function __construct()
    {
        // add_action('admin_enqueue_scripts', array($this, 'enqueueStyles'));
        add_action('admin_enqueue_scripts', array($this, 'enqueueScripts'));

        new Revision();
        new Swapper();
    }

    public function enqueueScripts()
    {
        if (!is_admin() || !get_post_type() === 'attachment' || !isset($_GET['post'])) {
            return;
        }

        global $post;

        wp_enqueue_media();
        echo '<script>var attachment_revisions_current_post_id = ' . $post->ID . '</script>';
        wp_enqueue_script('attachment-revisions', ATTACHMENTREVISIONS_URL . '/dist/js/attachment-revisions.min.js', null, '1.0.0');

        wp_enqueue_style('attachment-revisions', ATTACHMENTREVISIONS_URL . '/dist/css/attachment-revisions.min.css', null, '1.0.0');
    }
}
