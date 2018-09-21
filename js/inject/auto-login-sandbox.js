chrome.storage.sync.get(['optDevAutoSnbxLogin'], function(result) {

	if (typeof result.optDevAutoSnbxLogin == 'undefined') result.optDevAutoSnbxLogin = true;

	if (result.optDevAutoSnbxLogin) {
		var userNameField = document.querySelector('[name="osUsername"]');

		var siALS = setInterval(function() {
			if (userNameField) {
				if (userNameField.value.length) {
					clearInterval(siALS);
					document.getElementById('loginButton').click();
				}
			}
		}, 100);
	}

});