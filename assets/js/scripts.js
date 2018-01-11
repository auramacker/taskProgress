$(document).ready(function() {
	setTimeout(function() {
		$('.tp-preloader').fadeOut(300);
	}, 300);

	$('input[name="username"]').on('keyup', function () {
      $('#second-slide h3 span').text($('input[name="username"]').val());
    });

	$('.tp-slides li:nth-child(1)').addClass('is-active');

	// $('.tp-slide').each(function() {
	// 	var hh = $(this).find('.tp-slide__header').height(),
	// 		fh = $(this).find('.tp-slide__footer').height(),
	// 		m = $(this).find('.tp-slide__main');

	// 	if(hh) {
	// 		hh = hh;
	// 	}else{
	// 		hh = 0;
	// 	}

	// if(fh) {
	// 		fh = fh;
	// 	}else{
	// 		fh = 0;
	// 	}

	// 	m.css({
	// 		'height' : 'calc(100% - '+hh + fh+'px)'
	// 	});
	// });

	$('a[data-go-to]').on('click', function() {
		$('.tp-slides li').removeClass('is-active');
		$('.tp-slides li').eq($(this).attr('data-go-to') - 1).addClass('is-active');
	});


});