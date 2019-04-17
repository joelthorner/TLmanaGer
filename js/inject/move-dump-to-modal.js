if($(".-lucee-dump").length){
	$("head").remove();
	var gotodump = setInterval(function() {
		window.scrollTo(0,$(".-lucee-dump").eq(0).offset().top);
	}, 200);
	setTimeout(function() {clearInterval(gotodump)}, 1500);
}

