if (window.innerWidth > 500) {
	$('body').addClass('tw')
}

// OPT BG
chrome.storage.sync.get(['optBgLc'], function(result) {
	if ($.type(result.optBgLc) == 'undefined') {
		
		chrome.storage.sync.set({optBgLc: $('#opt-bg-lc').val()}, function() {

		});
	}else{
		$('#opt-bg-lc').val(result.optBgLc);
	}
});

$('#opt-save').click(function(event) {
	chrome.storage.sync.set({optBgLc: $('#opt-bg-lc').val()}, function() {
		$('#opt-save-cont').addClass('shown');
		setTimeout(function(){
			$('#opt-save-cont').removeClass('shown');
		}, 1700)
	});
});
// end OPT BG


// OPT photo
chrome.storage.sync.get(['optProfilePhoto'], function(result) {
	if ($.type(result.optProfilePhoto) == 'undefined') {
		
		chrome.storage.sync.set({optProfilePhoto: $('.opt-profile-set.selected img').attr('src') }, function() {

		});
	}else{
		$('.opt-profile-set').removeClass('selected');
		$('img[src="'+result.optProfilePhoto+'"]').parents('button').addClass('selected');
	}
});

$('.opt-profile-set').click(function(event) {
	var $self = $(this);
	chrome.storage.sync.set({optProfilePhoto: $(this).find('img').attr('src') }, function() {
		$('.opt-profile-set').removeClass('selected');
		$self.addClass('selected');
	});
});
// end OPT photo
