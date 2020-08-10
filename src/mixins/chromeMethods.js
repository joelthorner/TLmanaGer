import { archivements } from "../data";

export default {
	methods: {
		createArchivementNotify(archvievement) {
			// console.log(archvievement);
			const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
			const uniqid = randLetter + Date.now();

			chrome.notifications.create(uniqid, {
				type: 'basic',
				title: `You earned the "${archvievement.name}" Badge!`,
				iconUrl: archvievement.img,
				message: archvievement.desc,
				priority: 1,
				buttons: [
					{ title: 'Close' },
					{ title: 'View archvievements' }
				]
			});

			chrome.notifications.onButtonClicked.addListener(function (notificationId, buttonIndex) {
				if (notificationId == uniqid && buttonIndex == 1) {
					chrome.tabs.create({ url: chrome.extension.getURL('/options/options.html') + '#/achievements' });
				}
			});
		}
	},
};
