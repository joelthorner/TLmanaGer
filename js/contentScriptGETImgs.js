$('img').each(function(){
	$(this).attr('src', $(this).attr('src') + '?refres='+ new Date().getUTCMilliseconds());
});