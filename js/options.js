if (window.innerWidth > 500) {
	$('body').addClass('tw')
}

$('#opt-save').click(function(event) {
	chrome.storage.sync.set({optBgLc: $('#opt-bg-lc').val()}, function() {
		$('#opt-save-cont').addClass('shown');
		setTimeout(function(){
			$('#opt-save-cont').removeClass('shown');
		}, 1700)
	});
});

$('.opt-profile-set').click(function(event) {
	var $self = $(this);
	chrome.storage.sync.set({optProfilePhoto: $(this).find('img').attr('src') }, function() {
		$('.opt-profile-set').removeClass('selected');
		$self.addClass('selected');
	});
});
