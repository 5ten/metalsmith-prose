(function($){
	$(document).ready(function(){
	/* initialize */

        $('body').addClass('shown');

        /* random  beteen 1 and 3 */
        var rand = Math.floor(Math.random() * 3);

        /* homepage slider */
        $('#slick').slick({
            autoplay: true,
            arrows: false,
            lazyLoad: 'progressive',
            speed: 1000,
            fade: true,
            cssEase: 'linear',
            initialSlide: rand,
            mobileFirst: true,
            pauseOnFocus: false,
            pauseOnHover: false
        });

        /* hilight active page */
        $('.nav-item a').each(function(){
            console.log($(this).attr('class'));
            if ($('body').hasClass($(this).attr('class'))) {
                $(this).addClass('active');
            }
        });

        $('.hamburger').on('click', function(e){
            $(this).toggleClass('is-active');
            $('.navigation').toggleClass('open');
            e.preventDefault;
            if ($(this).hasClass('is-active')) {
                $('.navigation ul li a').on('click', function(){
                    $('.navigation').removeClass('open');
                    $('.hamburger').removeClass('is-active');
                });
            }
        });    

        var $contactForm = $('#contact-form');
        $contactForm.submit(function(e) {
            e.preventDefault();
            $.ajax({
                url: '//formspree.io/info@fiveline.co',
                method: 'POST',
                data: $(this).serialize(),
                dataType: 'json',
                beforeSend: function() {
                    $contactForm.append('<div class="alert alert--loading">Sending message…</div>');
                },
                success: function(data) {
                    $contactForm.find('.alert--loading').hide();
                    $contactForm.append('<div class="alert alert--success">Message sent!</div>');
                },
                error: function(err) {
                    $contactForm.find('.alert--loading').hide();
                    $contactForm.append('<div class="alert alert--error">Oops, there was an error.</div>');
                }
            });
        });

	/* end initialize */
	});
})(jQuery);


