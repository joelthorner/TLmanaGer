if($("#development-tool").length == 0){
	if ($('.-lucee-dump').length) {
	  $('head').remove();
	  var goToDump = setInterval(function() {
	    window.scrollTo(0, $('.-lucee-dump').first().offset().top);
	  }, 20);
	  setTimeout(() => {
	    clearInterval(goToDump)
	  }, 1500);
	}
}
