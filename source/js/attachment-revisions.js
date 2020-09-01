var AttatchmentRevisions = {};
var AttachmentRevisions = AttachmentRevisions || {};
AttachmentRevisions.MediaUpload = (function ($) {

    var _fileUploader = null;
    var _shouldDeleteAttachment = true;

    function MediaUpload() {
        this.handleEvents();
    }

    MediaUpload.prototype.handleEvents = function() {
        // Replace media button
        $(document).on('click', '[data-action="media-replacer-replace"]', function (e) {
            this.openFileUploader(e.target);
        }.bind(this));

        // Revisions button
        $(document).on('click', '[data-action="media-replacer-revisions"]', function (e) {
            if ($(this).parents('.media-modal').length) {
                location.href = $(this).data('edit-link');
                return false;
            }
        });

        $(document).on('click', '.media-replace-revisions [data-restore]', function (e) {
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

        $('[data-action="media-replace-close-thickbox"]').on('click', function () {
            $('#TB_closeWindowButton').trigger('click');
        });
    };

    MediaUpload.prototype.openFileUploader = function(element) {
        //$('.uploader-inline-content').show();
        // If opened from media modal redirect to edit post page
        if ($(element).parents('.media-modal').length) {
            location.href = $(element).closest('[data-edit-link]').data('edit-link');
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
        
        wp.Uploader.queue.on('reset', function() {
            $('.uploader-inline-content').hide();
        });
        
        _fileUploader.on('select', function () {

            var selected = _fileUploader.state().get('selection').first().toJSON().id;
            if (typeof selected != 'undefined') {
                _shouldDeleteAttachment = false;
                $('[name="media-replacer-replace-with"]').val(selected).closest('form').submit();
                
            } else {
                alert('You did not select a file. Media will not be replaced.');
            }
        });

        _fileUploader.on('close', function () {
            var selected = null;

            if (typeof _fileUploader.state().get('selection').first() != 'undefined') {
                selected = _fileUploader.state().get('selection').first().toJSON().id;
            }

            if (!selected) {
                return;
            }

            setTimeout(function () {
                if (!_shouldDeleteAttachment) {
                    return false;
                }

                $.post(ajaxurl, {action: 'attachment_revisions_remove_attachment', id: selected}, function (response) {
                    console.log(response);
                });
            }, 1000);

        });

        this.openFileUploader();
    };


    return new MediaUpload();

})(jQuery);

