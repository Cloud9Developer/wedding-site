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

    /***************** Initiate Flexslider ******************/
    $('.flexslider').flexslider({
        animation: "slide"
    });

    /***************** Initiate Fancybox ******************/

    $('.single_image').fancybox({
        padding: 4
    });

    $('.fancybox').fancybox({
        padding: 4,
        width: 1000,
        height: 800,
        arrows    : true,  // Displays navigation arrows at the screen edges
        loop      : true,  // Allows endless cycling through the gallery items
        nextClick : false  // Optional: stops a main image click from skipping forward
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
            // "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcloud9developer.github.io%2Fwedding-site"
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
    $('.player').YTPlayer();


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
                console.log(data);
                if (data.result === "error") {
                    $('#alert-wrapper').html(alert_markup('danger', data.message));
                } else {
                    $('#alert-wrapper').html('');
                    $('#rsvp-modal').modal('show');
                }
            })
            .fail(function (data) {
                console.log(data);
                $('#alert-wrapper').html(alert_markup('danger', '<strong>Sorry!</strong> There is some issue with the server. '));
            });
    });

});

/********************** Extras **********************/

// alert_markup
function alert_markup(alert_type, msg) {
    return '<div class="alert alert-' + alert_type + '" role="alert">' + msg + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span>&times;</span></button></div>';
}

// /********************** Slideshow *********************/
// const images = ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg']; 
// const directory = 'img/eng_pics/'; // Your local folder path
// let currentIndex = 0;

// const wrapper = document.getElementById('slides-wrapper');

// // Dynamically generate the image tags
// images.forEach((img, index) => {
//     const imgTag = document.createElement('img');
//     imgTag.src = `${directory}${img}`;
//     imgTag.classList.add('slide');
//     if (index === 0) imgTag.classList.add('active');
//     wrapper.appendChild(imgTag);
// });

// function changeSlide(direction) {
//     const slides = document.querySelectorAll('.slide');
//     slides[currentIndex].classList.remove('active');
    
//     currentIndex = (currentIndex + direction + slides.length) % slides.length;
    
//     slides[currentIndex].classList.add('active');
// }

// // Optional: Auto-play every 4 seconds
// setInterval(() => changeSlide(1), 4000);