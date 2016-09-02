<?php

namespace AttachmentRevisions;

class Revisions
{
    public function __construct()
    {
        add_action('init', array($this, 'activate'));
        add_action('attachment_updated', array($this, 'addRevision'), 10, 3);
    }

    public function activate()
    {
        add_post_type_support('attachment', 'revisions');
    }

    /**
     * Adds a attachment revision when attachment is updated
     * @param integer $id     Attachment post id
     * @param object  $after  Data after update
     * @param object  $before Data before update
     *
     * @todo  Check if we can use non-private function for creating revision
     */
    public function addRevision($id, $after, $before)
    {
        $afterComp = clone $after;
        $beforeComp = clone $before;

        unset($afterComp->post_modified);
        unset($afterComp->post_modified_gmt);
        unset($beforeComp->post_modified);
        unset($beforeComp->post_modified_gmt);

        // No fields changed
        if ($afterComp == $beforeComp) {
            return false;
        }

        // Something changed, create a revision
        // Todo: Check if we can use non-private function for creating the revision
        $revision = _wp_put_post_revision($before);
        return $revision;
    }
}
