/**
 * TicketConsume.
 * 
 * @since      29.08.19
 */

function TicketConsumeTab_getDataTrs(trs) {
	var data = '';
	for (let index = 0; index < trs.length; index++) {
		if ($(trs[index]).find('td').length) {
			let organization = $(trs[index]).find('td:first-child').text().toLowerCase().trim(),
				tickets = parseInt($(trs[index]).find('td:last-child').text()),
				sla = $(trs[index]).closest('table').attr('id').replace('table', '').toLowerCase();

			data += `
				"${organization}": {
					"tickets": ${tickets},
					"sla": "${sla}"
				}${index < trs.length - 1 ? ',' : ''}`;
		}
	}
	return data;
}

var data = '{';

let si = setInterval(() => {
	const doc = $(document)[0];
	let trs = doc.querySelectorAll('#tablePlatinium tbody tr:not(.no-records-found), #tableGold tbody tr:not(.no-records-found), #tableSilver tbody tr:not(.no-records-found)');
	console.log(trs);
	
	
	if (trs.length) {
		clearInterval(si);
		data += TicketConsumeTab_getDataTrs(trs);
		data += '}';
		chrome.runtime.sendMessage({ name: 'dataTicketConsumeTab', data: data.replace(/(\r\n|\n|\r|\s)/gm, '') });
	}
}, 1000);

// After 10 seconds clear
let sto = setTimeout(() => {
	clearInterval(si);
}, 10000);