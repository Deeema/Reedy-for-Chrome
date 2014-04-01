

(function() {
	
	function init(callback) {
		if (!settings) {
			settings = {};
			app.sendMessageToExtension({type: 'settingsGet'}, function(sett) {
				settings = sett;
				callback();
			});
		}
		else {
			callback();
		}
	}
	
	function onKeyDown(e) {
		switch (e.keyCode) {
				case 83: // S
					if (e.altKey) {
						app.stopEvent(e);
						app.start();
					}
					break;
			}
	}
	
	
	
	var app = window.fastReader = {},
		toString = Object.prototype.toString,
		settings, reader;
	
	
	app.stopEvent = function(e) {
		e.preventDefault();
		e.stopImmediatePropagation();
	}
	
	app.proxy = function(context, fnName) {
		return function() {
			return context[fnName]();
		};
	}
	
	app.zeroPad = function(num, len) {
		return (num = num+'').length < len
			? (new Array(len).join('0') + num).slice(-len)
			: num;
	}
	
	app.flatten = function(array) {
		var res = [];
		
		(function flat(arr) {
			if (toString.call(arr) === '[object Array]')
				arr.forEach(flat);
			else
				res.push(arr);
		})(array);
		
		return res;
	}
	
	
	app.sendMessageToExtension = function(data, callback) {
		chrome.extension.sendMessage(data, callback);
	}
	
	app.isPopupOpen = function(callback) {
		app.sendMessageToExtension({type: "isPopupOpen"}, callback);
	}
	
	app.t = function() {
		return chrome.i18n.getMessage.apply(chrome.i18n, arguments);
	}
	
	
	app.on = function(elem, event, fn) {
		elem.addEventListener(event, fn);
	}
	
	app.off = function(elem, event, fn) {
		elem.removeEventListener(event, fn);
	}
	
	
	app.get = function(key) {
		return settings[key];
	}
	
	app.set = function(key, value) {
		settings[key] = value;
		app.sendMessageToExtension({type: 'settingsSet', key: key, value: value});
	}
	
	
	app.start = function() {
		reader && reader.destroy();
		var text = window.getSelection().toString().trim();
		text.length && init(function() {
			reader = new app.Reader(
				new app.Parser(text)
			);
		});
	}
	
	app.onReaderDestroy = function() {
		settings = reader = null;
	}
	
	
	chrome.extension.onMessage.addListener(function(msg, sender, callback) {
		switch (msg.type) {
			case 'popupSettings':
				if (settings && reader) {
					settings[msg.key] = msg.value;
					reader.onPopupSettings(msg.key, msg.value);
				}
				callback();
				break;
			case 'getSelection':
				callback(window.getSelection().toString().trim());
				break;
			case 'startReading':
				app.start();
				callback();
				break;
		}
	});
	
	
	app.on(window, "keydown", onKeyDown);
	
	
})();
