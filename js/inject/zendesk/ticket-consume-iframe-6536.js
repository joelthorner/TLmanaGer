// inject JS for Zendesk App menu iframe,
// with match url *://6536.apps.zdusercontent.com/*
// in manifest defined

if (!window.ticketConsume_isTop) { // true  or  undefined
	let data = '{';

	let si = setInterval(() => {
		const doc = $(document).contents()[1];
		let nTiquets = doc.querySelectorAll('[key="tickets_this_month"] > p');
		
		if (nTiquets.length) {
			clearInterval(si);

			let sla = doc.querySelectorAll('[key="sla"] > p');
			let client = doc.querySelectorAll('.organization a');

			for (let index = 0; index < nTiquets.length; index++) {
				data += '"nTiquets":' + nTiquets[index].innerHTML + ',';
			}
			for (let index = 0; index < sla.length; index++) {
				data += '"sla":"' + sla[index].innerHTML.toLowerCase().trim() + '",';
			}
			for (let index = 0; index < client.length; index++) {
				data += '"client":"' + client[index].innerHTML.toLowerCase().trim() + '",';
			}
			data += '"check": "' + moment().format() + '"'
			data += '}';
			chrome.runtime.sendMessage({ sendBack: true, data: data });
		}
	}, 1000);
}
