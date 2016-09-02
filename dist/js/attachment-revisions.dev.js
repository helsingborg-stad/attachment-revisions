var AttachmentRevisions = AttachmentRevisions || {};

var AttachmentRevisions = AttachmentRevisions || {};
AttachmentRevisions.MediaUpload = (function ($) {

    var _fileUploader = null;

    function MediaUpload() {
        $(document).on('click', '[data-attachment-revisions-action="swap-media"]', function (e) {
            e.preventDefault();
            this.openUploader();
        }.bind(this));
    }

    MediaUpload.prototype.openUploader = function() {
        if (_fileUploader) {
            _fileUploader.open();
            return;
        }

        _fileUploader = wp.media.frames.fileUploader = wp.media({
            title: 'Media swapper',
            button: {
                text: 'Swap',
            },
            multiple: false
        });

        _fileUploader.on('select', function () {
            var selectedFile = _fileUploader.state().get('selection').first().toJSON();

            var data = {
                action: 'attachment_revisions_swap',
                id: 1,
                file: selectedFile
            };

            $.post(ajaxurl, data, function (response) {
                console.log(response);
            });
        });

        _fileUploader.open();

        // Default to upload file tab
        $('.media-router a:first-of-type').trigger('click');
    };

    return new MediaUpload();

})(jQuery);
