// Thumbnail navigation bar for FancyBox engagement gallery
$(document).on('afterShow', function (e, instance) {
    // Ensure the thumbnail bar is only created once per lightbox session
    if ($('.thumb-bar').length === 0 && window.engItems) {
        var $bar = $('<div class="thumb-bar"></div>');
        $.each(window.engItems, function (idx, item) {
            var $thumb = $('<img>', {
                src: item.href,
                class: 'thumb',
                'data-index': idx
            }).on('click', function () {
                $.fancybox(window.engItems, { index: idx });
            });
            $bar.append($thumb);
        });
        // Insert the bar after the FancyBox wrapper
        $('.fancybox-wrap').append($bar);
    }
    // Highlight the active thumbnail
    if (instance && instance.current) {
        var activeIdx = instance.current.index;
        $('.thumb-bar img').removeClass('active').eq(activeIdx).addClass('active');
    }
});

$(document).on('afterClose', function () {
    $('.thumb-bar').remove();
});