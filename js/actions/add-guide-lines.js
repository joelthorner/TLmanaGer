console.log('TLmanaGer Action: "add-guide-lines";');

$(function() {
	Cookies.set('add-guide-lines-active', '1');

	$('body')
		.prepend(`
			<div id="g-container" class="container"></div>
			<div id="g-container-2" class="container"></div>
			<div id="g-middle" class="container"></div>
		`);
	$('head')
		.append(`
			<style id="g-style">
				#g-container, #g-container-2, #g-middle {
					position: fixed;
					z-index: 9999999;
					left: 0;
					right: 0;
				}
				#g-container:after, #g-container-2:after,
				#g-container:before, #g-container-2:before,
				#g-middle:before{
					content: "";
					position: absolute;
					height: 100000px;
					width: 1px;
					background-color: red;
					top: -5000px;
					z-index: 9999999;
				}
				#g-container:before, #g-container-2:before{
					left: 0;
				}
				#g-container-2:before{
					left: 15px;
				}
				#g-container:after, #g-container-2:after{
					right: 0;
				}
				#g-container-2:after{
					right: 15px;
				}
				#g-middle:before{
					left: 50%;
					transform: translateX(-50%);
					background-color: blue;
				}
			</style>
		`);
});