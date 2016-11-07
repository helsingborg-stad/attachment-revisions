var AttatchmentRevisions = {};

jQuery(document).ready(function ($) {

    var mediaselector = null;

    // Replace
    $(document).on('click', '[data-action="media-replacer-replace"]', function () {

        if ($(this).parents('.media-modal').length) {
            location.href = $(this).data('edit-link');
            return;
        }

        var mimeType = $(this).data('mime');
        var mimeParts = mimeType.split('/');

        if (!mediaselector) {
            mediaselector = wp.media({
                title: 'Select replacement file',
                button: {
                    text: 'Replace'
                },
                multiple: false,
                library: {
                    type: mimeParts[0],
                    subtype: mimeParts[1]
                }
            });

            // On mediaselector select
            mediaselector.on('select', function () {
                var selected = mediaselector.state().get('selection').first().toJSON().id;

                if (typeof selected != 'undefined') {
                    $('[name="media-replacer-replace-with"]').val(selected).closest('form').submit();
                } else {
                    alert('You did not select a file. Media will not be replaced.');
                }
            });
        }

        // Open the media selector
        var mediaselectorElement = $(mediaselector.open().el);
        $('.media-router a:first-of-type').trigger('click');

        $(document).on('click', '.media-router > a', function () {
            $('.attachment-preview:not(.type-' + mimeParts[0] + '), .attachment-preview:not(.subtype-' + mimeParts[1] + ')')
                    .parent('li').remove();
        });
    });

    $(document).on('click', '[data-action="media-replacer-revisions"]', function () {
        if ($(this).parents('.media-modal').length) {
            location.href = $(this).data('edit-link');
            return false;
        }
    });

    // Revision
    $(document).on('click', '#media-replace-revisions [data-restore]', function () {
        console.log("REVISIONS");

        if ($(this).hasClass('selected')) {
            $('[name="media-replace-restore"]').val('');
            $(this).removeClass('selected');
            return;
        }

        $('#media-replace-revisions li.selected').removeClass('selected');

        var path = $(this).data('restore');
        $('[name="media-replace-restore"]').val(path);
        $(this).addClass('selected');
        return;
    });

});

