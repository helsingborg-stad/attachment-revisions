var AttatchmentRevisions = {};

jQuery(document).ready(function ($) {

    var mediaselector = null;

    // Replace
    $('[data-action="media-replacer-replace"]').on('click', function () {

        if (!mediaselector) {
            mediaselector = wp.media({
                title: 'Select replacement file',
                button: {
                    text: 'Replace'
                },
                multiple: false
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

        // Click the upload button
        mediaselectorElement.find('.media-router > a:first-child').trigger('click');

    });

    // Revision
    $('#media-replace-revisions [data-restore]').on('click', function () {
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

