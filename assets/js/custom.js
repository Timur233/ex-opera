/* -------------------------------------------------------

[ Custom settings ]

01. ScrollIt
02. Navbar scrolling background
03. Close navbar-collapse when a  clicked
04. Sections background image from data background
05. Animations
06. YouTubePopUp
07. Testimonials owlCarousel
08. Rooms 1 owlCarousel
09. Rooms Page owlCarousel
10. Pricing owlCarousel
11. News owlCarousel
12. Team owlCarousel
13. Clients owlCarousel
14. Restaurant Menu owlCarousel
15. Restaurant Menu Tabs
16. Accordion Box (for Faqs)
17. MagnificPopup Gallery
18. Smooth Scrolling
19. Scroll back to top
20. Select2
21. Datapicker
22. Slider
23. Preloader
24. Contact Form

------------------------------------------------------- */
$(() => {
    const wind = $(window);

    // ScrollIt
    $.scrollIt({
        upKey:        38, // key code to navigate to the next section
        downKey:      40, // key code to navigate to the previous section
        easing:       'swing', // the easing function for animation
        scrollTime:   600, // how long (in ms) the animation takes
        activeClass:  'active', // class given to the active nav element
        onPageChange: null, // function(pageIndex) that is called when page is changed
        topOffset:    -70, // offste (in px) for fixed top navigation
    });

    // Navbar scrolling background
    wind.on('scroll', () => {
        const bodyScroll = wind.scrollTop();
        const navbar = $('.navbar');
        const logo = $('.navbar .logo> img');

        if (bodyScroll > 100) {
            navbar.addClass('nav-scroll');
            logo.attr('src', 'https://cms.abpx.kz/storage/uploads/2022/07/21/62d8dbb20f694Page-1.svg');
        } else {
            navbar.removeClass('nav-scroll');
            logo.attr('src', 'https://cms.abpx.kz/storage/uploads/2022/07/21/62d8e024e6359white.svg');
        }
    });

    // Close navbar-collapse when a  clicked
    $('.navbar-nav .dropdown-item a').on('click', () => {
        $('.navbar-collapse').removeClass('show');
    });

    // Sections background image from data background
    const pageSection = $('.bg-img, section');

    pageSection.each(function (indx) {
        if ($(this).attr('data-background')) {
            $(this).css('background-image', `url(${$(this).data('background')})`);
        }
    });

    // Animations
    const contentWayPoint = function () {
        let i = 0;

        $('.animate-box').waypoint(function (direction) {
            if (direction === 'down' && !$(this.element).hasClass('animated')) {
                i++;
                $(this.element).addClass('item-animate');
                setTimeout(() => {
                    $('body .animate-box.item-animate').each(function (k) {
                        const el = $(this);

                        setTimeout(() => {
                            const effect = el.data('animate-effect');

                            if (effect === 'fadeIn') {
                                el.addClass('fadeIn animated');
                            } else if (effect === 'fadeInLeft') {
                                el.addClass('fadeInLeft animated');
                            } else if (effect === 'fadeInRight') {
                                el.addClass('fadeInRight animated');
                            } else {
                                el.addClass('fadeInUp animated');
                            }

                            el.removeClass('item-animate');
                        }, k * 200, 'easeInOutExpo');
                    });
                }, 100);
            }
        }, {
            offset: '85%',
        });
    };

    $(() => {
        contentWayPoint();
    });

    // YouTubePopUp
    $('a.vid').YouTubePopUp();

    // Testimonials owlCarousel *
    $('.testimonials .owl-carousel').owlCarousel({
        loop:            true,
        margin:          30,
        mouseDrag:       true,
        autoplay:        false,
        dots:            true,
        nav:             false,
        navText:         ["<span class='lnr ti-angle-left'></span>", "<span class='lnr ti-angle-right'></span>"],
        responsiveClass: true,
        responsive:      {
            0: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 1,
            },
        },
    });

    // Rooms 1 owlCarousel *
    $('.rooms1 .owl-carousel').owlCarousel({
        loop:               true,
        margin:             30,
        mouseDrag:          true,
        autoplay:           false,
        dots:               true,
        autoplayHoverPause: true,
        nav:                false,
        navText:            ["<span class='lnr ti-angle-left'></span>", "<span class='lnr ti-angle-right'></span>"],
        responsiveClass:    true,
        responsive:         {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 3,
            },
        },
    });

    // Rooms 2 owlCarousel *
    $('.rooms2 .owl-carousel').owlCarousel({
        loop:               true,
        margin:             30,
        mouseDrag:          true,
        autoplay:           false,
        dots:               true,
        autoplayHoverPause: true,
        nav:                false,
        navText:            ["<span class='lnr ti-angle-left'></span>", "<span class='lnr ti-angle-right'></span>"],
        responsiveClass:    true,
        responsive:         {
            0: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 1,
            },
        },
    });

    // Rooms 3 owlCarousel *
    $('.rooms3 .owl-carousel').owlCarousel({
        loop:               true,
        margin:             30,
        mouseDrag:          true,
        autoplay:           false,
        dots:               true,
        autoplayHoverPause: true,
        nav:                false,
        navText:            ["<span class='lnr ti-angle-left'></span>", "<span class='lnr ti-angle-right'></span>"],
        responsiveClass:    true,
        responsive:         {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 3,
            },
        },
    });

    // Rooms Page owlCarousel *
    $('.rooms-page .owl-carousel').owlCarousel({
        loop:            true,
        margin:          30,
        mouseDrag:       true,
        autoplay:        true,
        dots:            false,
        nav:             false,
        navText:         ["<span class='lnr ti-angle-left'></span>", "<span class='lnr ti-angle-right'></span>"],
        responsiveClass: true,
        responsive:      {
            0: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 1,
            },
        },
    });

    // Pricing owlCarousel *
    $('.pricing .owl-carousel').owlCarousel({
        loop:               true,
        margin:             30,
        mouseDrag:          true,
        autoplay:           false,
        dots:               true,
        autoplayHoverPause: true,
        nav:                false,
        navText:            ["<span class='lnr ti-angle-left'></span>", "<span class='lnr ti-angle-right'></span>"],
        responsiveClass:    true,
        responsive:         {
            0: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 2,
            },
        },
    });

    // News owlCarousel *
    $('.news .owl-carousel').owlCarousel({
        loop:            false,
        margin:          30,
        mouseDrag:       true,
        autoplay:        false,
        dots:            false,
        nav:             true,
        navText:         ["<span class='lnr ti-angle-left'></span>", "<span class='lnr ti-angle-right'></span>"],
        responsiveClass: true,
        responsive:      {
            0: {
                items: 1,
                dots:  true,
                nav:   false,
            },
            600: {
                items: 2,
                dots:  true,
                nav:   false,
            },
            1000: {
                items: 3,
            },
        },
    });

    // Team owlCarousel *
    $('.team .owl-carousel').owlCarousel({
        loop:            true,
        margin:          30,
        dots:            true,
        mouseDrag:       true,
        autoplay:        false,
        nav:             false,
        navText:         ["<span class='lnr ti-angle-left'></span>", "<span class='lnr ti-angle-right'></span>"],
        responsiveClass: true,
        responsive:      {
            0: {
                items: 1,
                dots:  true,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 3,
            },
        },
    });

    // Clients owlCarousel *
    $('.clients .owl-carousel').owlCarousel({
        loop:            true,
        margin:          30,
        mouseDrag:       true,
        autoplay:        true,
        dots:            false,
        nav:             false,
        navText:         ["<span class='lnr ti-angle-left'></span>", "<span class='lnr ti-angle-right'></span>"],
        responsiveClass: true,
        responsive:      {
            0: {
                margin: 10,
                items:  3,
            },
            600: {
                items: 3,
            },
            1000: {
                items: 3,
            },
        },
    });

    // Restaurant Menu owlCarousel
    $('.restaurant-menu .owl-carousel').owlCarousel({
        loop:            true,
        margin:          0,
        autoplay:        false,
        dots:            false,
        nav:             true,
        navText:         ["<span class='lnr ti-angle-left'></span>", "<span class='lnr ti-angle-right'></span>"],
        responsiveClass: true,
        responsive:      {
            0: {
                items: 2,
                nav:   false,
            },
            600: {
                items: 3,
                nav:   false,
            },
            1000: {
                items: 4,
            },
        },
    });

    // Restaurant Menu Tabs
    $('.restaurant-menu .tabs-icon').on('click', '.item', function () {
        $('.item').removeClass('active');
        const myID = $(this).attr('id');

        $('.restaurant-menu .cont').hide();
        $(`#${myID}-content`).fadeIn();
    });
    $('.restaurant-menu .tabs-icon').on('click', '.owl-item', function () {
        $(this).addClass('actived').siblings().removeClass('actived');
    });

    // Accordion Box (for Faqs)
    if ($('.accordion-box').length) {
        $('.accordion-box').on('click', '.acc-btn', function () {
            const outerBox = $(this).parents('.accordion-box');
            const target = $(this).parents('.accordion');

            if ($(this).next('.acc-content').is(':visible')) {
                // return false;
                $(this).removeClass('active');
                $(this).next('.acc-content').slideUp(300);
                $(outerBox).children('.accordion').removeClass('active-block');
            } else {
                $(outerBox).find('.accordion .acc-btn').removeClass('active');
                $(this).addClass('active');
                $(outerBox).children('.accordion').removeClass('active-block');
                $(outerBox).find('.accordion').children('.acc-content').slideUp(300);
                target.addClass('active-block');
                $(this).next('.acc-content').slideDown(300);
            }
        });
    }

    // MagnificPopup Gallery
    $('.gallery').magnificPopup({
        delegate: '.popimg',
        type:     'image',
        gallery:  {
            enabled: true,
        },
    });
    $('.img-zoom').magnificPopup({
        type:                'image',
        closeOnContentClick: !0,
        mainClass:           'mfp-fade',
        gallery:             {
            enabled:            !0,
            navigateByImgClick: !0,
            preload:            [0, 1],
        },
    });
    $('.magnific-youtube, .magnific-vimeo, .magnific-custom').magnificPopup({
        disableOn:       700,
        type:            'iframe',
        mainClass:       'mfp-fade',
        removalDelay:    300,
        preloader:       false,
        fixedContentPos: false,
    });

    // Smooth Scrolling
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
        .not('[href="#"]').not('[href="#0"]').click(function (event) {
        // On-page links
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            // Figure out element to scroll to
                let target = $(this.hash);

                target = target.length ? target : $(`[name=${this.hash.slice(1)}]`);

                // Does a scroll target exist?
                if (target.length) {
                // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top,
                    }, 1000, () => {
                    // Callback after animation
                    // Must change focus!
                        const $target = $(target);

                        $target.focus();

                        if ($target.is(':focus')) { // Checking if the target was focused
                            return false;
                        }

                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    });
                }
            }
        });

    //  Scroll back to top
    const progressPath = document.querySelector('.progress-wrap path');
    const pathLength = progressPath.getTotalLength();

    progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
    progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
    const updateProgress = function () {
        const scroll = $(window).scrollTop();
        const height = $(document).height() - $(window).height();
        const progress = pathLength - (scroll * pathLength / height);

        progressPath.style.strokeDashoffset = progress;
    };

    updateProgress();
    $(window).scroll(updateProgress);
    const offset = 150;
    const duration = 550;

    jQuery(window).on('scroll', function () {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.progress-wrap').addClass('active-progress');
        } else {
            jQuery('.progress-wrap').removeClass('active-progress');
        }
    });
    jQuery('.progress-wrap').on('click', (event) => {
        event.preventDefault();
        jQuery('html, body').animate({
            scrollTop: 0,
        }, duration);

        return false;
    });

    // Select2
    $('.select2').select2({
        minimumResultsForSearch: Infinity,
    });

    // Datapicker
    $('.datepicker').datepicker({
        orientation: 'top',
    });
});

// Slider
$(document).ready(() => {
    const owl = $('.header .owl-carousel');

    // Slider owlCarousel - (Inner Page Slider)
    $('.slider .owl-carousel').owlCarousel({
        items:           1,
        loop:            true,
        dots:            true,
        margin:          0,
        autoplay:        true,
        autoplayTimeout: 5000,
        nav:             false,
        navText:         ['<i class="ti-angle-left" aria-hidden="true"></i>', '<i class="ti-angle-right" aria-hidden="true"></i>'],
        responsiveClass: true,
        responsive:      {
            0: {
                dots: true,
            },
            600: {
                dots: true,
            },
            1000: {
                dots: true,
            },
        },
    });

    // Slider owlCarousel (Homepage Slider)
    $('.slider-fade .owl-carousel').owlCarousel({
        items:           1,
        loop:            true,
        dots:            true,
        margin:          0,
        autoplay:        true,
        autoplayTimeout: 5000,
        animateOut:      'fadeOut',
        nav:             true,
        navText:         ['<i class="ti-angle-left" aria-hidden="true"></i>', '<i class="ti-angle-right" aria-hidden="true"></i>'],
        responsiveClass: true,
        responsive:      {
            0: {
                dots: false,
            },
            600: {
                dots: false,
            },
            1000: {
                dots: true,
            },
        },
    });
    owl.on('changed.owl.carousel', (event) => {
        const item = event.item.index - 2; // Position of the current item

        $('span').removeClass('animated fadeInUp');
        $('h4').removeClass('animated fadeInUp');
        $('h3').removeClass('animated fadeInUp');
        $('h1').removeClass('animated fadeInUp');
        $('p').removeClass('animated fadeInUp');
        $('.butn-light').removeClass('animated fadeInUp');
        $('.butn-dark').removeClass('animated fadeInUp');
        $('.owl-item').not('.cloned').eq(item).find('span')
            .addClass('animated fadeInUp');
        $('.owl-item').not('.cloned').eq(item).find('h4')
            .addClass('animated fadeInUp');
        $('.owl-item').not('.cloned').eq(item).find('h3')
            .addClass('animated fadeInUp');
        $('.owl-item').not('.cloned').eq(item).find('h1')
            .addClass('animated fadeInUp');
        $('.owl-item').not('.cloned').eq(item).find('p')
            .addClass('animated fadeInUp');
        $('.owl-item').not('.cloned').eq(item).find('.butn-light')
            .addClass('animated fadeInUp');
        $('.owl-item').not('.cloned').eq(item).find('.butn-dark')
            .addClass('animated fadeInUp');
    });
});

// Preloader
$('#preloader').fadeOut(700);
$('.preloader-bg').delay(700).fadeOut(700);
const wind = $(window);

// Contact Form
const form = $('.contact__form');
const message = $('.contact__msg');
let form_data;

// success function
function done_func(response) {
    message.fadeIn().removeClass('alert-danger').addClass('alert-success');
    message.text(response);
    setTimeout(() => {
        message.fadeOut();
    }, 2000);
    form.find('input:not([type="submit"]), textarea').val('');
}
// fail function
function fail_func(data) {
    message.fadeIn().removeClass('alert-success').addClass('alert-success');
    message.text(data.responseText);
    setTimeout(() => {
        message.fadeOut();
    }, 2000);
}
form.submit(function (e) {
    e.preventDefault();
    form_data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url:  form.attr('action'),
        data: form_data,
    }).done(done_func).fail(fail_func);
});

const advantages = document.querySelectorAll('.rooms1 .item');

Array.from(advantages).forEach((item) => {
    item.addEventListener('mouseover', () => {
        const content = item.querySelector('.content');

        content.style.height = `${content.scrollHeight}px`;
    });

    item.addEventListener('mouseout', () => {
        const content = item.querySelector('.content');

        content.style.height = '0px';
    });
});
