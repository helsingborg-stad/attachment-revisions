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
        if (!is_admin() || !get_post_type() === 'attachment') {
            return;
        }

        wp_enqueue_media();
        wp_enqueue_script('attachment-revisions', ATTACHMENTREVISIONS_URL . '/dist/js/attachment-revisions.min.js', null, '1.0.0');
    }
}
