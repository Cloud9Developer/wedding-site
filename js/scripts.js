$(document).ready(function () {

    /***************** Waypoints ******************/

    $('.wp1').waypoint(function () {
        $('.wp1').addClass('animate__animated animate__fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp2').waypoint(function () {
        $('.wp2').addClass('animate__animated animate__fadeInRight');
    }, {
        offset: '75%'
    });
    $('.wp3').waypoint(function () {
        $('.wp3').addClass('animate__animated animate__fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp4').waypoint(function () {
        $('.wp4').addClass('animate__animated animate__fadeInRight');
    }, {
        offset: '75%'
    });
    $('.wp5').waypoint(function () {
        $('.wp5').addClass('animate__animated animate__fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp6').waypoint(function () {
        $('.wp6').addClass('animate__animated animate__fadeInRight');
    }, {
        offset: '75%'
    });
    $('.wp7').waypoint(function () {
        $('.wp7').addClass('animate__animated animate__fadeInUp');
    }, {
        offset: '75%'
    });
    $('.wp8').waypoint(function () {
        $('.wp8').addClass('animate__animated animate__fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp9').waypoint(function () {
        $('.wp9').addClass('animate__animated animate__fadeInRight');
    }, {
        offset: '75%'
    });

    /***************** Engagement photo slider (dynamic) ******************/
    // Use an AJAX call to load the image list from img/eng_pics.json.
    // If that fails (e.g., when running from file://) we fall back to a hard‑coded list.
    const fallbackEngPics = [
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.vectorstock.com%2Fi%2F1000x1000%2F74%2F02%2Fbroken-code-vector-45997402.jpg&f=1&nofb=1&ipt=3fc1ae0fe34fb745d45b30d845c79170d5b4c8fc7e84adcca2d9c510b2d68fca&ipo=images"
    ];

    function buildEngSlider(data) {
        console.log('Building engagement slider with', data.length, 'images.');
        var $slides = $('.eng-slider .slides');
        $slides.empty();
        $.each(data, function (index, src) {
            var $li = $('<li>');
            var $a = $('<a>', {
                class: 'fancybox',
                rel: 'eng-group',
                href: src
            });
            var $img = $('<img>', {
                src: src,
                alt: 'Slide ' + (index + 1)
            });
            $a.append($img);
            $li.append($a);
            $slides.append($li);
        });

        var engSlideCount = $slides.children('li').length;
        var engSlideSpeed = Math.max(4000, Math.round(12000 / engSlideCount)); // total cycle ~12s regardless of count
        $('.eng-slider').flexslider({
            animation      : 'slide',
            slideshowSpeed : engSlideSpeed,
            animationSpeed : 600,
            pauseOnHover   : false,
            pauseInvisible : false,
            controlNav     : false,
            directionNav   : false,
            animateHeight  : true,
            touch          : false,
            keyboard       : false
        });

        // Build items from original slides only (Flexslider clones the list, so limit to engSlideCount)
        var engItems = $slides.find('li a').slice(0, engSlideCount).map(function () {
            return { href: $(this).attr('href') };
        }).get();
        // Expose the item list globally so the thumbnail bar can reference it
        window.engItems = engItems;

                $('.eng-slider').on('click', '.slides li a', function (e) {
            e.preventDefault();
            // Find which original href was clicked and use that as the index
            var clickedHref = $(this).attr('href');
            var index = 0;
            $.each(engItems, function (i, item) {
                if (item.href === clickedHref) { index = i; return false; }
            });

            // Native configuration block for Fancybox 2.1.5
            $.fancybox(engItems, {
                index: index, 
                type: 'image',
                padding: 4,
                arrows: true,
                loop: true,
                nextClick: false,
                
                // 1. Build and inject the thumbnail bar right before the lightbox renders
                beforeShow: function() {
                    // Pause Flexslider loop while lightboxed
                    $('.eng-slider').flexslider('pause');

                    // Build the thumbnail bar if it doesn't exist yet
                    if ($('.thumb-bar').length === 0 && window.engItems) {
                        var $bar = $('<div class="thumb-bar"></div>');
                        
                        $.each(window.engItems, function (idx, item) {
                            var $thumb = $('<img>', {
                                src: item.href,
                                class: 'thumb'
                            });
                            
                            // FIXED: Use $.fancybox.jumpto() so we switch slides inside the SAME instance
                            $thumb.on('click', function () {
                                $.fancybox.jumpto(idx);
                            });
                            
                            $bar.append($thumb);
                        });
                        
                        // Append directly to the Fancybox wrapper structure
                        $('.fancybox-wrap').append($bar);
                    }
                },

                // 2. Track the highlight dynamically whenever a slide changes
                afterShow: function() {
                    // In v2.1.5, "this.index" gives us the current visible item index
                    var currentIndex = this.index;
                    
                    // Clear all and highlight the exact active thumbnail matching the slider state
                    $('.thumb-bar img').removeClass('active'); 
                    $('.thumb-bar img').eq(currentIndex).addClass('active');

                    // OPTIONAL ADVANCED: Smoothly auto-scroll the thumbnail bar 
                    // if thumbnails start overflowing horizontally
                    var $activeThumb = $('.thumb-bar img').eq(currentIndex);
                    if ($activeThumb.length) {
                        var $bar = $('.thumb-bar');
                        var scrollPos = $activeThumb.position().left + $bar.scrollLeft() - ($bar.width() / 2) + ($activeThumb.width() / 2);
                        $bar.animate({ scrollLeft: scrollPos }, 200);
                    }
                },

                // 3. Clean up memory and states upon exiting the lightbox view
                afterClose: function() {
                    // Resume Flexslider loop when closed
                    $('.eng-slider').flexslider('play');
                    // Remove elements injected dynamically to keep DOM clean
                    $('.thumb-bar').remove();
                }
            });
        });
    }

    // JSON fetching mechanism stays exactly the same
    $.getJSON('img/eng_pics.json')
        .done(function (data) {
            console.log('Fetched engagement JSON, count:', data.length, 'data:', data);
            buildEngSlider(data);
        })
        .fail(function () {
            console.warn('Failed to load eng_pics.json, using fallback list.');
            buildEngSlider(fallbackEngPics);
        });


    /***************** Tooltips ******************/
    $('[data-toggle="tooltip"]').tooltip();

    /***************** Nav Transformicon ******************/

    /* When user clicks the Icon */
    $('.nav-toggle').click(function (event) {
        $(this).toggleClass('active');
        $('.header-nav').toggleClass('open');
        event.preventDefault();
    });
    /* When user clicks a link */
    $('.header-nav li a').click(function () {
        $('.nav-toggle').toggleClass('active');
        $('.header-nav').toggleClass('open');

    });

    /***************** Header BG Scroll ******************/

    $(function () {
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();

            if (scroll >= 20) {
                $('section.navigation').addClass('fixed');
                $('header').css({
                    "padding": "5px 0"
                });
                $('header .member-actions').css({
                    "top": "5px",
                });
                $('header .navicon').css({
                    "top": "5px",
                });
            } else {
                $('section.navigation').removeClass('fixed');
                $('header').css({
                    "padding": "5px 0"
                });
                $('header .member-actions').css({
                    "top": "5px",
                });
                $('header .navicon').css({
                    "top": "5px",
                });
            }
        });
    });
    /***************** Smooth Scrolling ******************/

    $('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html').animate({
                    scrollTop: target.offset().top - 90
                }, 2000);
                return false;
            }
        }
    });

    /********************** Social Share buttons ***********************/

    // Use a standard anonymous function for the event listener
    document.getElementById('share-button-ig').addEventListener('click', async function() {
        if(!await shareButtonClick()) {
            window.open("https://instagram.com/explore/tags/SheChoseHebert/", "_blank");

        }
    });

    document.getElementById('share-button-fb').addEventListener('click', async function() {
        if(!await shareButtonClick()) {
            // "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcloud9developer.github.io%2Fwedding-site"
            // window.open("https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcloud9developer.github.io%2Fwedding-site", "_blank");
            window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(window.location.href), "_blank");

        }
    });

    async function shareButtonClick() {
        var shareData = {
            title: '#SheChoseHebert',
            text: '#SheChoseHebert',
            url: encodeURIComponent(window.location.href)
        };

        try {
            if (navigator.canShare && navigator.canShare(shareData)) {
                await navigator.share(shareData);
                console.log('Shared successfully');
            } else {
                // alert('Sharing is not supported on this device/browser. LOL');
                return false;
            }
        } catch (err) {
            console.error('Error sharing:', err);
        }
        return true;
    }

    /********************** Embed youtube video *********************/
    // $('.player').YTPlayer();
    $('.player').YTPlayer({
        // Override options directly via jQuery initialization
        videoURL: 'https://youtu.be/8rNWGh-Hofs',
        containment: '#video-bg',
        autoPlay: true,
        mute: true,
        showControls: false,
        controls: 0,
        showYTLogo: false,
        startAt: 4,
        // startAt: 375,
        stopAt: 380,
        opacity: 1
    });


    /********************** Toggle Map Content **********************/
    $('#btn-show-map').click(function () {
        $('#map-content').toggleClass('toggle-map-content');
        $('#btn-show-content').toggleClass('toggle-map-content');
    });
    $('#btn-show-content').click(function () {
        $('#map-content').toggleClass('toggle-map-content');
        $('#btn-show-content').toggleClass('toggle-map-content');
    });

    /********************** Add to Calendar **********************/
    var myCalendar = createCalendar({
        options: {
            class: '',
            // You can pass an ID. If you don't, one will be generated for you
            id: ''
        },
        data: {
            // Event title
            title: "Christopher and Mary's Wedding",

            // Event start date
            start: new Date('Nov 27, 2027 10:00'),

            // Event duration (IN MINUTES)
            // duration: 120,

            // You can also choose to set an end time
            // If an end time is set, this will take precedence over duration
            end: new Date('Nov 27, 2027 22:00'),

            // Event Address
            address: '1700 Lee Dr, Baton Rouge, LA 70808, USA',

            // Event Description
            description: "We can't wait to see you on our big day!"
        }
    });

    $('#add-to-cal').html(myCalendar);


    /********************** RSVP **********************/
    $('#rsvp-form').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serialize();

        $('#alert-wrapper').html(alert_markup('info', '<strong>Just a sec!</strong> We are saving your details.'));
        $.post('https://script.google.com/macros/s/AKfycbzBWuJaHhZfxeRIE-3axnI_KdYSY1dgbE-kczJ6mo2OrhEclyMUw0lSNG552cYxI6nVag/exec', data)
            .done(function (data) {
                // console.log(data);
                if (data.result === "error") {
                    $('#alert-wrapper').html(alert_markup('danger', data.message));
                } else {
                    $('#alert-wrapper').html('');
                    $('#rsvp-modal').modal('show');
                }
            })
            .fail(function (data) {
                // console.log(data);
                $('#alert-wrapper').html(alert_markup('danger', '<strong>Sorry!</strong> There is some issue with the server. '));
            });
    });

});

/********************** Extras **********************/

// alert_markup
function alert_markup(alert_type, msg) {
    return '<div class="alert alert-' + alert_type + '" role="alert">' + msg + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span>&times;</span></button></div>';
}
