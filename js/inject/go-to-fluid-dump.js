if (!$("#development-tool").length) {
  if ($('.-lucee-dump').length) {
		$('head, body script').remove();
    
    var goToDump = setInterval(function() {
      window.scrollTo(0, $('.-lucee-dump').first().offset().top);
    	
    	if (window.scrollY == $('.-lucee-dump').first().offset().top) {
    		clearInterval(goToDump)
    	}
		}, 20);
		
    setTimeout(() => {
      clearInterval(goToDump)
    }, 1500);
  }
}
