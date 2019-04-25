function onFindedPublishPopup($window) {
	var $versions = $window.find('.iconGrid .column.name .osPublishCode');
	var newVersion = 'v1.0.0';

	if ($versions.length) {
		var data = JSON.parse($versions.first().attr('data'));
		var id_string = data.id.match(/^\D+/g);
		var id_number = data.id.match(/\.?(\d\.?){3,}$/g);
		
		id_string = id_string ? id_string[0] : 'v';
		id_number = id_number ? id_number[0] : '1.0.0';

		var id_number_arr = id_number.split('.');
		if (id_number_arr.length) {
			var lastNum = parseInt(id_number_arr[id_number_arr.length - 1]) + 1;
			newVersion = id_string;
			for (let index = 0; index < id_number_arr.length - 1; index++) {
				newVersion += id_number_arr[index] + '.';
			}
			newVersion += lastNum;
		}
	}
	return newVersion;
}

$(document).on('click', '.gitPublish.gitRepoPublish.__publishBtn__', function(event) {
	var $btn = $(this);
	var $window = $btn.closest('.window');

	var i = setInterval(() => {
		var $popupForm = $('#__popupPublishForm__');
		if ($popupForm.length) {
			clearInterval(i);
			var version = onFindedPublishPopup($window);
			$popupForm.find('#__popupName__').val(version);
		}
	}, 10);
	
	setTimeout(() => { clearInterval(i); }, 3000);
});