chrome.storage.sync.get(['optLcPagridActive'], function(result) {

	if (typeof result.optLcPagridActive == 'undefined') result.optLcPagridActive = false;

	if (result.optLcPagridActive) {
		$('html').addClass('dev-pages-grid');

		$(document).on('click.tlg', '[onclick*="openPages"]', function(event) {
			if(!$('.pagesGroupContainer .positionLabel.init').length){
				setTimeout(function(){
					
					$('.pagesGroupContainer').parents('.window').find('.maximizeButton').click();

					var style = `
						<style>
							html.dev-pages-grid div.pagesWindowTree div.pagesTreeContainer{
								display: flex;
								flex-wrap: wrap;
							}
							html.dev-pages-grid div.pagesWindowTree div.pagesTreeContainer div.pagesGroupContainer {
								overflow: hidden;
								margin-bottom: 15px;
								border: 1px solid #b2b2b2;
								width: 20%;
								float: left;
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