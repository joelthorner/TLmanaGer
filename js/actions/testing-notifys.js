$(document).ready(function() {
	$('body').append(`
		<script>
			Fluid.notify('Lorem ispum dolor sit amet', {
				type: 'danger',
				sticky: true
			});
			Fluid.notify('Lorem ispum dolor sit amet', {
				type: 'success',
				sticky: true
			});
		</script>
	`)
});