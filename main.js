var goal = new Date('2013-12-10');
setInterval(function(){
	var today = new Date();
	document.getElementsByTagName('div').item(0).innerHTML = "Under Construction " + (goal - today);
},10);
