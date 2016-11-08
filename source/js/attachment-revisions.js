var AttatchmentRevisions = {};
var AttachmentRevisions = AttachmentRevisions || {};
AttachmentRevisions.MediaUpload = (function ($) {

    var _fileUploader = null;

    function MediaUpload() {
        this.handleEvents();
    }

    MediaUpload.prototype.handleEvents = function() {
        // Replace media button
        $(document).on('click', '[data-action="media-replacer-replace"]', function () {
            this.openFileUploader();
        }.bind(this));

        // Revisions button
        $(document).on('click', '[data-action="media-replacer-revisions"]', function () {
            if ($(this).parents('.media-modal').length) {
                location.href = $(this).data('edit-link');
                return false;
            }
        });

        $(document).on('click', '.media-replace-revisions [data-restore]', function () {
            if ($(this).hasClass('selected')) {
                $('[name="media-replace-restore"]').val('');
                $(this).removeClass('selected');
                return;
            }

            $('.media-replace-revisions li.selected').removeClass('selected');

            var path = $(this).data('restore');
            $('[name="media-replace-restore"]').val(path);
            $(this).addClass('selected');
            return;
        });
    };

    MediaUpload.prototype.openFileUploader = function() {
        // If opened from media modal redirect to edit post page
        if ($(this).parents('.media-modal').length) {
            location.href = $(this).data('edit-link');
            return;
        }

        if (_fileUploader) {
            // Open the modal
            _fileUploader.open();

            // Default to upload file tab
            $('.media-router a:first-of-type').trigger('click');

            return;
        }

        this.setupFileUploader();
    };

    MediaUpload.prototype.setupFileUploader = function() {
        var query = wp.media.query({
            orderby: 'date',
            query: true,
            uploadedTo: -1
        });

        _fileUploader = wp.media({
            title: 'Select replacement file',
            button: {
                text: 'Replace'
            },
            multiple: false,
            states: [
                new wp.media.controller.Library({
                    library: query
                })
            ]
        });

        _fileUploader.on('select', function () {
            var selected = _fileUploader.state().get('selection').first().toJSON().id;

            if (typeof selected != 'undefined') {
                $('[name="media-replacer-replace-with"]').val(selected).closest('form').submit();
            } else {
                alert('You did not select a file. Media will not be replaced.');
            }
        });

        this.openFileUploader();
    };


    return new MediaUpload();

})(jQuery);

