$(function(){

	function fitWindow() {
		$('#floatingCirclesG').css('margin-top', ($(window).height() - 128) / 2 + 'px');
		$('#display').offset({top: ($(window).height() - $('#display').height())/2, left: ($(window).width() - $('#display').width())/2});
		$('iframe').offset({top: ($(window).height() - $('iframe').height())/2});
	}
	fitWindow();

	function shiftBoxes(opt){
		var disp = $('#display');
		if (opt === 'left') {
			var target = disp.children().eq(0);
			target.remove();
			disp.append(target);
		} else if (opt === 'right') {
			var target = disp.children().eq(4);
			target.remove();
			disp.prepend(target);
		}

		$('.box').removeClass().addClass('box');

		disp.children().eq(0).addClass(opt);
		disp.children().eq(1).addClass('next');
		disp.children().eq(2).addClass('active');
		disp.children().eq(3).addClass('prev');
	}

	$(document).on('click', '.next', function(){shiftBoxes('right')});
	$(document).on('click', '.prev', function(){shiftBoxes('left')});

	$(document).on('click', '#display .active a[href="#3Dview"]', function(){
		modelView($(this).parent().parent()[0].id);
		$('.box:first').removeClass().addClass('box');
		$('#display').hide();
		$('#bgmovie').hide();
		$('#back').show();
		$('#loading').show();
	});

	$('#back').click(function(){
		//location.href="#";
		cancelAnimationFrame($('canvas').attr('class'));
		$('canvas').html('');
		//$('canvas').empty();
		$('canvas').remove();
		$('#display').show();
		$('#bgmovie').show();
		$('#back').hide();
		$('#loading').hide();
	});

	$(window).resize(fitWindow);
});
