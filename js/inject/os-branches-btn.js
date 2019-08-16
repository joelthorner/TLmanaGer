chrome.storage.sync.get({ optLcOsBranchesBtn: defaults.optLcOsBranchesBtn }, function(result) {

	var target = document.getElementById('sandboxFields');
	if (result.optLcOsBranchesBtn && target) {

		$('html').addClass('os-branches-btn');
		
		var config = { 
			attributes: false, 
			childList: true, 
			characterData: false,
			subtree : false,
			attributeOldValue : false,
			characterDataOldValue : false
		};

		var observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				
				if(mutation.addedNodes.length != 0){
					$.each(mutation.addedNodes, function(index, node) {
						if ($(node).is('.opensaasLoginFields')) {
							observer.disconnect();
							$(node).find('select').magic_select({
								regexTextButton: /\(.*\)/g,
								regexFindedInData: true,
								regexWrapText: true
							});
						}
						return;
					});
				}
			});	 
		});

		observer.observe(target, config);

		$(document).on('dblclick', '.select-html-fluid .btn-option', function(event) {
			$('#loginButton').click();
		});
	}
});