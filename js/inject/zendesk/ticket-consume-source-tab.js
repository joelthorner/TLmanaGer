/**
 * TicketConsume.
 * 
 * @since      29.08.19
 */

let data = '{';

let si = setInterval(() => {
	const doc = $(document).contents()[1];
	let trs = doc.querySelectorAll('#tablePlatinium tbody tr, #tableGold tbody tr, #tableSilver tbody tr');
	
	if (trs.length) {
		clearInterval(si);
		for (let index = 0; index < trs.length; index++) {
			let organization = $(trs[index]).find('td:first-child').text().toLowerCase().trim(),
				tickets = parseInt($(trs[index]).find('td:last-child').text()),
				sla = $(trs[index]).closest('table').attr('id').replace('table', '').toLowerCase();
			
				data += `
					"${organization}": {
						"tickets": ${tickets},
						"sla": "${sla}"
					}${index < trs.length - 1 ? ',' : ''}`;
		}
		data += '}';
		chrome.runtime.sendMessage({ name: 'dataTicketConsumeTab', data: data.replace(/(\r\n|\n|\r|\s)/gm, '') });
	}
}, 1000);

// After 10 seconds clear
let sto = setTimeout(() => {
	clearInterval(si);
}, 10000);