var AttachmentRevisions = AttachmentRevisions || {};
AttachmentRevisions.MediaUpload = (function ($) {

    var _fileUploader = null;

    function MediaUpload() {
        $(document).on('click', '[data-attachment-revisions-action="swap-media"]', function (e) {
            e.preventDefault();
            this.openUploader();
        }.bind(this));
    }

    /**
     * Opens a meda library upload modal
     * @return {void}
     */
    MediaUpload.prototype.openUploader = function() {
        if (_fileUploader) {
            _fileUploader.open();
            return;
        }

        // Creates the file uploader modal
        _fileUploader = wp.media.frames.fileUploader = wp.media({
            title: 'Media swapper',
            button: {
                text: 'Swap',
            },
            multiple: false
        });

        // File uploader selection callback
        _fileUploader.on('select', function () {
            var selectedFile = _fileUploader.state().get('selection').first().toJSON();

            var data = {
                action: 'attachment_revisions_swap',
                id: attachment_revisions_current_post_id,
                file: selectedFile
            };

            $.post(ajaxurl, data, function (response) {
                if (response == 'success') {
                    location.reload();
                    return;
                }

                alert(response + '. Aborting.');
                return false;
            });
        });

        // Open the modal
        _fileUploader.open();

        // Default to upload file tab
        $('.media-router a:first-of-type').trigger('click');
    };

    return new MediaUpload();

})(jQuery);
