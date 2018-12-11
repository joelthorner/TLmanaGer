chrome.storage.sync.get(['optLcPagridActive'], function(result) {

	if (typeof result.optLcPagridActive == 'undefined') result.optLcPagridActive = false;

	if (result.optLcPagridActive) {
		$('html').addClass('dev-pages-grid');

		$(document).on('click.tlg', '[onclick*="openPages"]', function(event) {
			if(!$('.pagesGroupContainer .positionLabel.init').length){
				setTimeout(function(){
					
					$('.pagesGroupContainer').parents('.window').find('.windowLayout > .block').remove();
					$('.pagesGroupContainer').parents('.window').find('.contentContainer > .block').remove();
					$('.pagesGroupContainer').parents('.window').not('.maximized').find('.maximizeButton').click();
					$('.pagesGroupContainer').parents('.window').find('.windowButtons').append(`
						<div class="toggleLCGridPages"></div>
					`);

					$(document).on('click', '.toggleLCGridPages', function(event) {
						event.preventDefault();
						$('html').toggleClass('dev-pages-grid');
					});

					var style = `
						<style>
							.toggleLCGridPages {
								width: 36px;
								height: 36px;
								background-position: 0px 0px;
								float: right;
								cursor: pointer;
								background-size: 13px;
								background-repeat: no-repeat;
								background-position: center;
								background-image: url("data:image/svg+xml;charset=utf8,%3Csvg height='800' fill='#FFF' viewBox='-19 -19 600 600' width='800' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M251.25 12.5c0-6.90625-5.59375-12.5-12.5-12.5H12.5C5.59375 0 0 5.59375 0 12.5v226.25c0 6.90625 5.59375 12.5 12.5 12.5h226.25c6.90625 0 12.5-5.59375 12.5-12.5zm-25 213.75H25V25h201.25zm0 0M562.5 12.5C562.5 5.59375 556.90625 0 550 0H323.75c-6.90625 0-12.5 5.59375-12.5 12.5v226.25c0 6.90625 5.59375 12.5 12.5 12.5H550c6.90625 0 12.5-5.59375 12.5-12.5zm-25 213.75H336.25V25H537.5zm0 0M251.25 323.75c0-6.90625-5.59375-12.5-12.5-12.5H12.5c-6.90625 0-12.5 5.59375-12.5 12.5V550c0 6.90625 5.59375 12.5 12.5 12.5h226.25c6.90625 0 12.5-5.59375 12.5-12.5zm-25 212.5H25v-200h201.25zm0 0M562.5 323.75c0-6.90625-5.59375-12.5-12.5-12.5H323.75c-6.90625 0-12.5 5.59375-12.5 12.5V550c0 6.90625 5.59375 12.5 12.5 12.5H550c6.90625 0 12.5-5.59375 12.5-12.5zm-25 212.5H336.25v-200H537.5zm0 0'/%3E%3C/svg%3E");
							}
							.toggleLCGridPages:hover {
								background-image: url("data:image/svg+xml;charset=utf8,%3Csvg height='800' fill='#bfcc00' viewBox='-19 -19 600 600' width='800' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M251.25 12.5c0-6.90625-5.59375-12.5-12.5-12.5H12.5C5.59375 0 0 5.59375 0 12.5v226.25c0 6.90625 5.59375 12.5 12.5 12.5h226.25c6.90625 0 12.5-5.59375 12.5-12.5zm-25 213.75H25V25h201.25zm0 0M562.5 12.5C562.5 5.59375 556.90625 0 550 0H323.75c-6.90625 0-12.5 5.59375-12.5 12.5v226.25c0 6.90625 5.59375 12.5 12.5 12.5H550c6.90625 0 12.5-5.59375 12.5-12.5zm-25 213.75H336.25V25H537.5zm0 0M251.25 323.75c0-6.90625-5.59375-12.5-12.5-12.5H12.5c-6.90625 0-12.5 5.59375-12.5 12.5V550c0 6.90625 5.59375 12.5 12.5 12.5h226.25c6.90625 0 12.5-5.59375 12.5-12.5zm-25 212.5H25v-200h201.25zm0 0M562.5 323.75c0-6.90625-5.59375-12.5-12.5-12.5H323.75c-6.90625 0-12.5 5.59375-12.5 12.5V550c0 6.90625 5.59375 12.5 12.5 12.5H550c6.90625 0 12.5-5.59375 12.5-12.5zm-25 212.5H336.25v-200H537.5zm0 0'/%3E%3C/svg%3E");
							}
							html.dev-pages-grid img.pageIcon {
								display: none;
							}
							html.dev-pages-grid div.pagesWindowTree div.pagesTreeContainer div.page > div:first-child {
								background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='#00AEF0' viewBox='0 0 512 512'%3E%3Cpath d='M447.933 103.629c-.034-3.076-1.224-6.09-3.485-8.352L352.683 3.511c-.004-.004-.007-.005-.011-.008C350.505 1.338 347.511 0 344.206 0H89.278C75.361 0 64.04 11.32 64.04 25.237v461.525c0 13.916 11.32 25.237 25.237 25.237h333.444c13.916 0 25.237-11.32 25.237-25.237V103.753c.002-.044-.021-.081-.025-.124zm-91.739-62.698l50.834 50.834h-49.572c-.695 0-1.262-.567-1.262-1.262V40.931zm67.789 445.832c0 .695-.566 1.261-1.261 1.261H89.278c-.695 0-1.261-.566-1.261-1.261V25.237c0-.695.566-1.261 1.261-1.261h242.94v66.527c0 13.916 11.322 25.239 25.239 25.239h66.527v371.021z'/%3E%3Cpath d='M362.088 164.014H149.912c-6.62 0-11.988 5.367-11.988 11.988 0 6.62 5.368 11.988 11.988 11.988h212.175c6.62 0 11.988-5.368 11.988-11.988.001-6.621-5.368-11.988-11.987-11.988zM362.088 236.353H149.912c-6.62 0-11.988 5.368-11.988 11.988 0 6.62 5.368 11.988 11.988 11.988h212.175c6.62 0 11.988-5.368 11.988-11.988.001-6.62-5.368-11.988-11.987-11.988zM362.088 308.691H149.912c-6.62 0-11.988 5.368-11.988 11.988 0 6.621 5.368 11.988 11.988 11.988h212.175c6.62 0 11.988-5.367 11.988-11.988.001-6.619-5.368-11.988-11.987-11.988zM256 381.031H149.912c-6.62 0-11.988 5.368-11.988 11.988 0 6.621 5.368 11.988 11.988 11.988H256c6.62 0 11.988-5.367 11.988-11.988 0-6.621-5.368-11.988-11.988-11.988z'/%3E%3C/svg%3E");
								background-repeat: no-repeat;
								background-position: 0 center;
								padding-left: 22px;
								background-size: 18px;
							}
							html.dev-pages-grid div.pagesWindowTree div.pagesTreeContainer div.pageTree div.page > div:first-child {
								background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='#2f82c3' viewBox='0 0 512 512'%3E%3Cpath d='M447.933 103.629c-.034-3.076-1.224-6.09-3.485-8.352L352.683 3.511c-.004-.004-.007-.005-.011-.008C350.505 1.338 347.511 0 344.206 0H89.278C75.361 0 64.04 11.32 64.04 25.237v461.525c0 13.916 11.32 25.237 25.237 25.237h333.444c13.916 0 25.237-11.32 25.237-25.237V103.753c.002-.044-.021-.081-.025-.124zm-91.739-62.698l50.834 50.834h-49.572c-.695 0-1.262-.567-1.262-1.262V40.931zm67.789 445.832c0 .695-.566 1.261-1.261 1.261H89.278c-.695 0-1.261-.566-1.261-1.261V25.237c0-.695.566-1.261 1.261-1.261h242.94v66.527c0 13.916 11.322 25.239 25.239 25.239h66.527v371.021z'/%3E%3Cpath d='M362.088 164.014H149.912c-6.62 0-11.988 5.367-11.988 11.988 0 6.62 5.368 11.988 11.988 11.988h212.175c6.62 0 11.988-5.368 11.988-11.988.001-6.621-5.368-11.988-11.987-11.988zM362.088 236.353H149.912c-6.62 0-11.988 5.368-11.988 11.988 0 6.62 5.368 11.988 11.988 11.988h212.175c6.62 0 11.988-5.368 11.988-11.988.001-6.62-5.368-11.988-11.987-11.988zM362.088 308.691H149.912c-6.62 0-11.988 5.368-11.988 11.988 0 6.621 5.368 11.988 11.988 11.988h212.175c6.62 0 11.988-5.367 11.988-11.988.001-6.619-5.368-11.988-11.987-11.988zM256 381.031H149.912c-6.62 0-11.988 5.368-11.988 11.988 0 6.621 5.368 11.988 11.988 11.988H256c6.62 0 11.988-5.367 11.988-11.988 0-6.621-5.368-11.988-11.988-11.988z'/%3E%3C/svg%3E");
							}
							html.dev-pages-grid div.pagesWindowTree div.pagesTreeContainer div.pageTree div.pageTree div.page > div:first-child {
								background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='#5f5796' viewBox='0 0 512 512'%3E%3Cpath d='M447.933 103.629c-.034-3.076-1.224-6.09-3.485-8.352L352.683 3.511c-.004-.004-.007-.005-.011-.008C350.505 1.338 347.511 0 344.206 0H89.278C75.361 0 64.04 11.32 64.04 25.237v461.525c0 13.916 11.32 25.237 25.237 25.237h333.444c13.916 0 25.237-11.32 25.237-25.237V103.753c.002-.044-.021-.081-.025-.124zm-91.739-62.698l50.834 50.834h-49.572c-.695 0-1.262-.567-1.262-1.262V40.931zm67.789 445.832c0 .695-.566 1.261-1.261 1.261H89.278c-.695 0-1.261-.566-1.261-1.261V25.237c0-.695.566-1.261 1.261-1.261h242.94v66.527c0 13.916 11.322 25.239 25.239 25.239h66.527v371.021z'/%3E%3Cpath d='M362.088 164.014H149.912c-6.62 0-11.988 5.367-11.988 11.988 0 6.62 5.368 11.988 11.988 11.988h212.175c6.62 0 11.988-5.368 11.988-11.988.001-6.621-5.368-11.988-11.987-11.988zM362.088 236.353H149.912c-6.62 0-11.988 5.368-11.988 11.988 0 6.62 5.368 11.988 11.988 11.988h212.175c6.62 0 11.988-5.368 11.988-11.988.001-6.62-5.368-11.988-11.987-11.988zM362.088 308.691H149.912c-6.62 0-11.988 5.368-11.988 11.988 0 6.621 5.368 11.988 11.988 11.988h212.175c6.62 0 11.988-5.367 11.988-11.988.001-6.619-5.368-11.988-11.987-11.988zM256 381.031H149.912c-6.62 0-11.988 5.368-11.988 11.988 0 6.621 5.368 11.988 11.988 11.988H256c6.62 0 11.988-5.367 11.988-11.988 0-6.621-5.368-11.988-11.988-11.988z'/%3E%3C/svg%3E");
							}
							html.dev-pages-grid div.pagesWindowTree div.pagesTreeContainer div.pageTree div.pageTree div.pageTree div.page > div:first-child {
								background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='#8f2b69' viewBox='0 0 512 512'%3E%3Cpath d='M447.933 103.629c-.034-3.076-1.224-6.09-3.485-8.352L352.683 3.511c-.004-.004-.007-.005-.011-.008C350.505 1.338 347.511 0 344.206 0H89.278C75.361 0 64.04 11.32 64.04 25.237v461.525c0 13.916 11.32 25.237 25.237 25.237h333.444c13.916 0 25.237-11.32 25.237-25.237V103.753c.002-.044-.021-.081-.025-.124zm-91.739-62.698l50.834 50.834h-49.572c-.695 0-1.262-.567-1.262-1.262V40.931zm67.789 445.832c0 .695-.566 1.261-1.261 1.261H89.278c-.695 0-1.261-.566-1.261-1.261V25.237c0-.695.566-1.261 1.261-1.261h242.94v66.527c0 13.916 11.322 25.239 25.239 25.239h66.527v371.021z'/%3E%3Cpath d='M362.088 164.014H149.912c-6.62 0-11.988 5.367-11.988 11.988 0 6.62 5.368 11.988 11.988 11.988h212.175c6.62 0 11.988-5.368 11.988-11.988.001-6.621-5.368-11.988-11.987-11.988zM362.088 236.353H149.912c-6.62 0-11.988 5.368-11.988 11.988 0 6.62 5.368 11.988 11.988 11.988h212.175c6.62 0 11.988-5.368 11.988-11.988.001-6.62-5.368-11.988-11.987-11.988zM362.088 308.691H149.912c-6.62 0-11.988 5.368-11.988 11.988 0 6.621 5.368 11.988 11.988 11.988h212.175c6.62 0 11.988-5.367 11.988-11.988.001-6.619-5.368-11.988-11.987-11.988zM256 381.031H149.912c-6.62 0-11.988 5.368-11.988 11.988 0 6.621 5.368 11.988 11.988 11.988H256c6.62 0 11.988-5.367 11.988-11.988 0-6.621-5.368-11.988-11.988-11.988z'/%3E%3C/svg%3E");
							}
							html.dev-pages-grid div.pagesWindowTree div.pagesTreeContainer div.pageTree div.pageTree div.pageTree div.pageTree div.page > div:first-child {
								background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='#bf003d' viewBox='0 0 512 512'%3E%3Cpath d='M447.933 103.629c-.034-3.076-1.224-6.09-3.485-8.352L352.683 3.511c-.004-.004-.007-.005-.011-.008C350.505 1.338 347.511 0 344.206 0H89.278C75.361 0 64.04 11.32 64.04 25.237v461.525c0 13.916 11.32 25.237 25.237 25.237h333.444c13.916 0 25.237-11.32 25.237-25.237V103.753c.002-.044-.021-.081-.025-.124zm-91.739-62.698l50.834 50.834h-49.572c-.695 0-1.262-.567-1.262-1.262V40.931zm67.789 445.832c0 .695-.566 1.261-1.261 1.261H89.278c-.695 0-1.261-.566-1.261-1.261V25.237c0-.695.566-1.261 1.261-1.261h242.94v66.527c0 13.916 11.322 25.239 25.239 25.239h66.527v371.021z'/%3E%3Cpath d='M362.088 164.014H149.912c-6.62 0-11.988 5.367-11.988 11.988 0 6.62 5.368 11.988 11.988 11.988h212.175c6.62 0 11.988-5.368 11.988-11.988.001-6.621-5.368-11.988-11.987-11.988zM362.088 236.353H149.912c-6.62 0-11.988 5.368-11.988 11.988 0 6.62 5.368 11.988 11.988 11.988h212.175c6.62 0 11.988-5.368 11.988-11.988.001-6.62-5.368-11.988-11.987-11.988zM362.088 308.691H149.912c-6.62 0-11.988 5.368-11.988 11.988 0 6.621 5.368 11.988 11.988 11.988h212.175c6.62 0 11.988-5.367 11.988-11.988.001-6.619-5.368-11.988-11.987-11.988zM256 381.031H149.912c-6.62 0-11.988 5.368-11.988 11.988 0 6.621 5.368 11.988 11.988 11.988H256c6.62 0 11.988-5.367 11.988-11.988 0-6.621-5.368-11.988-11.988-11.988z'/%3E%3C/svg%3E");
							}
							html.dev-pages-grid div.pagesWindowTree div.pagesTreeContainer div.page.unactivated > div:first-child {
								background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 66.281 66.281'%3E%3Cpath d='M33.14 66.281c18.273 0 33.141-14.868 33.141-33.143C66.281 14.866 51.414 0 33.14 0S0 14.866 0 33.139c0 18.274 14.867 33.142 33.14 33.142zm0-4c-7.421 0-14.199-2.793-19.35-7.377L54.903 13.79c4.584 5.15 7.377 11.928 7.377 19.349.001 16.069-13.071 29.142-29.14 29.142zm0-58.28c7.21 0 13.812 2.638 18.905 6.991L10.992 52.046C6.638 46.952 4 40.35 4 33.139 4 17.072 17.072 4.001 33.14 4.001z'/%3E%3C/svg%3E") !important;
								background-size: 16px !important;
								background-position: 1px center !important;
							}
							html.dev-pages-grid div.pagesWindowTree div.pagesTreeContainer{
								display: -webkit-box;
								display: -ms-flexbox;
								display: flex;
								-ms-flex-wrap: wrap;
								flex-wrap: wrap;
							}
							html.dev-pages-grid .windowLayout[style*="width: 1200px"] div.pagesWindowTree div.pagesTreeContainer div.pagesGroupContainer {
							}
							html.dev-pages-grid div.pagesWindowTree div.pagesTreeContainer div.pagesGroupContainer {
								overflow: hidden;
								margin-bottom: 15px;
								border: 1px solid #b2b2b2;
								float: left;
								width: 20%;
								box-sizing: border-box;
								margin-left: -1px;
								height: 400px;
								padding-top: 37px;
								position: relative;
							}
							html.dev-pages-grid div.pagesWindowTree div.pagesTreeContainer div.pagesGroup > div.positionLabel {
								position: absolute;
								top: 0;
								right: 0;
								bottom: 0;
								left: 75%;
								overflow: hidden;
								padding-right: 15px;
								text-align: right;
								white-space: nowrap;
							}
							html.dev-pages-grid div.pagesWindowTree div.pagesTreeContainer div.pagesGroup{
								position: absolute;
								top: 0;
								left: 0;
								right: 0;
							}
							html.dev-pages-grid div.pagesWindowTree div.pagesTreeContainer div.pagesGroupTree {
								height: calc(100% - 57px);
								position: absolute;
								overflow: auto;
								left: 0;
								right: 0;
							}
						</style>
					`;
					$('body').append(style);

				}, 975);
			}
		});
	}

});