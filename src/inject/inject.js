chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		// console.log("Hello. This message was sent from scripts/inject.js");
		if (document.getElementById("SML_osUtils")) {
			document.getElementById("SML_osUtils").click();
			 
			function findAncestor (el, cls) {
				while ((el = el.parentElement) && !el.classList.contains(cls));
				return el;
			}

			setTimeout(function(){
				var _window = findAncestor(document.querySelector('properties[data*="opensaasUtils"]'), 'window')
				if (_window) {
					_window.classList.add('opensaasWindow');

					var n=document.createElement("style"),t=document.createTextNode('body{height: calc(100% - 40px);}#windowContainer{top:40px;}.opensaasWindow .windowButtons,.opensaasWindow .windowTitle>span{display:none}.opensaasWindow.window{position:fixed;top:0!important;left:0!important;right:0!important;height:40px!important;border:0}.opensaasWindow.window div.titleBar{background-color:#333}.opensaasWindow.window input.green{position:fixed;top:3px;left:42px;height:34px;border-radius:0;padding-left:0;padding-right:0;width:140px;transition:all 150ms ease;background-color:#222;padding-top:7px}.opensaasWindow.window input.green:hover{background-color:#444}.opensaasWindow.window input.green.__updateCacheProducts__{left:185px}.opensaasWindow.window input.green.__updateCacheCategories__{left:328px}.opensaasWindow.window input.green.__reloadApps__{left:471px}.opensaasWindow.window input.green.__reloadEvents__{left:614px}.opensaasWindow.window input.green.__downloadProjectCode__{left:auto;right:3px;width:34px;padding-top:3px}.opensaasWindow div.windowContent{height:0}.messageBox [value=No]{margin-left:0}.messageBox input[value="Sí"],.messageBox input[value=OK]{width:180px;height:50px;display:block;margin:0 auto 10px;clear:both;float:none;margin-left:auto!important}body{background-image: url(https://images.unsplash.com/photo-1430375642086-147fcd5fea57?auto=format&fit=crop&w=2119&q=80);background-size: cover}.messageBox{top:0!important;left:0!important}');
					n.appendChild(t);
					_window.append(n);
					document.getElementById("windowContainer").after(
						document.querySelector(".opensaasWindow")
					);
					document.querySelector(".opensaasWindow.window input.green.__downloadProjectCode__").value="↓";
				}
			}, 1000);
		}


		// ,setTimeout(function(){for(var e=document.querySelector('properties[data*="opensaasUtils"]'),
		// 	o=[];e=e.parentElement.closest(".window");)
		// o.push(e);o[0].addClass("opensaasWindow");

		// ----------------------------------------------------------

	}
	}, 10);
});