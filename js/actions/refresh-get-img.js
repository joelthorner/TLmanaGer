console.log(chrome.i18n.getMessage("refreshGetImg_consoleLog"));

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
	if (!obj.img.includes('base64') && !obj.img.includes('svg+xml')) {
		if (obj.img.includes('?')) refreshGetSymb = '&';
		else refreshGetSymb = '?';

		$(obj.node).css('background-image', "url('" + obj.img + refreshGetSymb + refreshValue + "')");
	}
});

// <img>
$('img[src], img[srcset], source[srcset]').each(function(){

	var attrParam = false;

	if ($(this).attr('src')) attrParam = 'src';
	if ($(this).attr('srcset')) attrParam = 'srcset';

	if(attrParam){
		if ($(this).attr(attrParam).includes('?')) refreshGetSymb = '&';
		else refreshGetSymb = '?';

		$(this)
			.attr(attrParam, $(this).attr(attrParam) + refreshGetSymb + refreshValue);
	}
});
