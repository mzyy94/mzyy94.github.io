function validateNum(key, callback1, callback2, callback3) {
	var code = key.keyCode;
	switch (code) {
		case 8:
			return;
			break;
		case 37:
			callback1();
			return;
			break;
		case 39:
			callback2();
			return;
			break;
		case 9:
			return;
			break;
		case 48:
		case 49:
		case 50:
		case 51:
		case 52:
		case 53:
		case 54:
		case 55:
		case 56:
		case 57:
			if (!key.altKey && !key.shiftKey && !key.ctrlKey) {
				this.value = code - 48;
				setTimeout(function(){callback2();},1);
				return;
				break;
			}
		default:
			callback3();
	}
}

var input = document.getElementsByTagName("input");
var button = document.getElementsByTagName("button");
var form = document.getElementsByTagName("form");
var keypad = document.getElementsByClassName("keypad");

keypad[0].addEventListener("click", function(){
	document.activeElement.value = this.value;
	//document.activeElement.nextSibling().focus();
});

input[0].addEventListener("keydown", function(k){
	validateNum(k, function(){}, function(){input[1].focus();},function(){k.preventDefault()});
});
input[1].addEventListener("keydown", function(k){
	validateNum(k, function(){input[0].focus()}, function(){input[2].select();},function(){k.preventDefault()});
});
input[2].addEventListener("keydown", function(k){
	validateNum(k, function(){input[1].focus()}, function(){input[3].focus();},function(){k.preventDefault()});
});
input[3].addEventListener("keydown", function(k){
	validateNum(k, function(){input[2].focus()}, function(){button[0].focus();},function(){k.preventDefault()});
});

form[0].addEventListener("submit", function(){
	var value = input[0].value * 1000 + 
				input[1].value * 100 + 
				input[2].value * 10 + 
				input[3].value * 1; 

	if(parseInt(value) == 6553) {
		form.action = "128374/complete.html";
		return false;
	}
});

