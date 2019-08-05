log(chrome.i18n.getMessage("getFtpSettings_consoleLog"));

$(document).ready(function() {
	
	$('body').append(`
		<script>
			openFTPSetup();
			var $field = $('[name="ftpPassword"]');

			var si = setInterval(function() {
				var $field = document.querySelector('[name="ftpPassword"]');

				if ($field) {
					clearInterval(si);
					$field.setAttribute('type', 'text');
				}		
			}, 100);
		</script>
	`);

});