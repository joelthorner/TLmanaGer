if ($('#g-container').length) {
	$('#g-container, #g-container-2, #g-middle')
		.remove();
}else{

	$('body')
		.prepend(`
			<div id="g-container" class="container"></div>
			<div id="g-container-2" class="container"></div>
			<div id="g-middle" class="container"></div>
			<style>
				#g-container, #g-container-2, #g-middle{position: relative;z-index: 100099;}
				#g-container:before, #g-container-2:before{content: "";position: absolute;height: 10000px;width: 1px;background-color: red;top: 0;left: 0;z-index: 100099;}#g-container-2:before{left: 15px;}
				#g-container:after, #g-container-2:after{content: "";position: absolute;height: 10000px;width: 1px;background-color: red;top: 0;right: 0;z-index: 100099;}#g-container-2:after{right: 15px;}
				#g-middle:before{z-index: 100099;content: "";display: block;position: absolute;left: 50%;top: 0;height: 10000px;width: 1px;transform:  translateX(-50%);background-color: blue;}
			</style>
		`);
}
