$(function(){

function validateNum(key, callback1, callback2, callback3){
	var code = key.keyCode;
	switch(code){
		case 8: // backspace
		case 9: // tab
			return;
		case 37: // left
			callback1();
			return;
		case 39: // right
			callback2();
			return;
		case 48: // 0
		case 49: // 1
		case 50: // 2
		case 51: // 3
		case 52: // 4
		case 53: // 5
		case 54: // 6
		case 55: // 7
		case 56: // 8
		case 57: // 9
			if(!key.altKey && !key.shiftKey && !key.ctrlKey){
				var val = code - 48;
				$('input.active').addClass('hasValue');
				setTimeout(function(){
					callback2();
					$('.keypad[value="' + val + '"]').addClass('active');
				},1);
				setTimeout(function(){
					$('.keypad[value="' + val + '"]').removeClass('active');
				},100);
				return;
			}
		default:
			callback3();
	}
}

function clearInput(){
	$('input.active').removeClass('active');
	$('input').addClass('invalid').addClass('hasValue');
	setTimeout(function(){
		$('input').val('').removeClass('hasValue');
		$('input').first().focus();
		$('.invalid').removeClass('invalid');		
	},1000);
}

$('.keypad').on("click", function(){
	var currentActive = $('.active');
	var index = parseInt(currentActive[0].id.slice(3));
	currentActive.val($(this).val());
	currentActive.next().focus();
	currentActive.change();
	if(index == 4){
		$('form').submit();
	}
});
	
$('input').change(function(){
	if($(this).val() != ''){
		$(this).addClass('hasValue');
	} else {
		$(this).removeClass('hasValue');
	}
});

$('input').on("keydown", function(k){
	var index = parseInt(this.id.slice(3));
	var c1 = index > 1 ? function(){$('input')[index-2].focus()} : null;
	var c2 = index < 4 ? function(){$('input')[index].focus()} : function(){setTimeout(function(){$('form').submit();},1)};
	validateNum(k, c1, c2,function(){k.preventDefault();});
});

$('input').focus(function(){
	$('.active').removeClass('active');
	$(this).addClass('active');
});

$('form').submit(function(){
	var value = '';
	$('input[type="tel"]').each(function(item){
		value += $(this).val();
	});

	if(parseInt(value) == 1235){
		$('output').text(''); // comming soon.
		console.log('complete');
		$('input').addClass('active');
		alert('Tweet: @mzyy94 I want a cookie ;( ' + (1 - new Date()));
		$('input').val('').removeClass('active').removeClass('hasValue');
		$('input').first().focus();
		return false;
	} else {
		clearInput();
		return false;
	}
});

});
