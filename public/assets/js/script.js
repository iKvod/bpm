function assets_js_script(){
	$('.popups .overlay').click(function(){
		$('.popups').fadeOut('fast');
	});


	$('.slides .slide h4').click(function(){
		if($(this).parent().hasClass('opened')){
			$(this).siblings('.items').slideUp();
			$(this).parent().removeClass('opened');

		}
		else {
			$(this).siblings('.items').slideDown();
			$(this).parent().addClass('opened');
		}
	});

	$('.slides .items .item').click(function(){
		$('.slides .items .item').removeClass('selected');
		if($(this).hasClass('selected')){
			$(this).removeClass('selected');
		}
		else{
			$(this).addClass('selected');
		}
	});

	$('.circle').after().click(function(){
		var modal = $(this).children('.modal');
		if ($(modal).css('display') == 'none'){
			$(modal).show();
		}
		else{
			$(modal).hide();
		}
	});

	$('.gantt .lines .item').click(function(){
		var modal = $(this).children('.modal');
		if ($(modal).css('display') == 'none'){
			$(modal).show();
		}
		else{
			$(modal).hide();
		}
	});

	/*
	 $('.modal .close').click(function(){
	 $(this).parents('.modal').hide();
	 });
	 */

}