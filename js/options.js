if (window.innerWidth > 500) {
	$('body').addClass('tw')
}

function save(){
	$('#opt-save-cont').addClass('shown');
	setTimeout(function(){
		$('#opt-save-cont').removeClass('shown');
	}, 1700)
}

$('#opt-save').click(function(event) {
	// BG
	chrome.storage.sync.set({optBgLc: $('#opt-bg-lc').val()}, function() {
		save();
	});

	// username
	chrome.storage.sync.set({userName: $('#opt-userName').val()}, function() {
		save();
		aplyUsernameOpt($('#opt-userName').val())
	});
});

$('.opt-profile-set').click(function(event) {
	var $self = $(this);
	chrome.storage.sync.set({optProfilePhoto: $(this).find('img').attr('src') }, function() {
		$('.opt-profile-set').removeClass('selected');
		$self.addClass('selected');
	});
});
