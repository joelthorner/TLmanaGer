console.log('TLmanaGer Action: "refresh-get-img";');

var refreshValue = 'refresh=' + new Date().getUTCMilliseconds();
var refreshGetSymb;

// backgrounds
function getBgImgs (doc) {
	const srcChecker = /url\(\s*?['"]?\s*?(\S+?)\s*?["']?\s*?\)/i
	return Array.from(
	 Array.from(doc.querySelectorAll('*'))
		.reduce((collection, node) => {
			let prop = window.getComputedStyle(node, null)
				.getPropertyValue('background-image')
			// match `url(...)`
			let match = srcChecker.exec(prop)
			if (match) {
				collection.add({ img: match[1], node: node })
			}
			return collection
		}, new Set())
	)
}
$.each(getBgImgs(document), function(index, obj) {
	if (obj.img.includes('?')) refreshGetSymb = '&';
	else refreshGetSymb = '?';

	$(obj.node).css('background-image', "url('" + obj.img + refreshGetSymb + refreshValue + "')");
});

// <img>
$('img[src], img[srcset], source[srcset]').each(function(){

	if($(this).attr('src')){
		if ($(this).attr('src').includes('?')) refreshGetSymb = '&';
		else refreshGetSymb = '?';

		$(this)
			.attr('src', $(this).attr('src') + refreshGetSymb + refreshValue);
	}

	if($(this).attr('srcset')){
		if ($(this).attr('srcset').includes('?')) refreshGetSymb = '&';
		else refreshGetSymb = '?';

		$(this)
			.attr('srcset', $(this).attr('srcset') + refreshGetSymb + refreshValue);
	}
});
