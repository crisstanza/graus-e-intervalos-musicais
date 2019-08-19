"use strict";

if (!io) var io = {};
if (!io.github) io.github = {};
if (!io.github.crisstanza) io.github.crisstanza = {};
if (!io.github.crisstanza.UnRadio) io.github.crisstanza.UnRadio = {};

(function() {
	
	let KEY_SPACE = 32;

	io.github.crisstanza.UnRadio.start = function(event) {
		let source = document;
		let radios = source.querySelectorAll('[data-unradio=true] input[type=radio]');
		if (radios) {
			let length = radios.length;
			for (let i = 0; i < length; i++) {
				let radio = radios[i];
				radio.addEventListener('keydown', allowUncheckSpace);
				radio.addEventListener('click', allowUncheck);
			}
		}
	};

	function allowUncheckSpace(event) {
		if (event.keyCode == KEY_SPACE) {
			let radio = event.target;
			radio.setAttribute('data-click', !radio.checked);
			radio.checked = !radio.checked;
			event.preventDefault();
		}
	}

	function allowUncheck(event) {
		let radio = event.target;
		let click = radio.getAttribute('data-click');
		if (click == 'true') {
			radio.checked = false;
			radio.setAttribute('data-click', false);
		} else {
			radio.setAttribute('data-click', true);
			unclickOthers(radio);
		}
	}

	function unclickOthers(radio) {
		let source = radio.form ? radio.form : document;
		let others = source.querySelectorAll('input[name='+radio.name+']');
		if (others) {
			let length = others.length;
			for (let i = 0; i < length; i++) {
				let other = others[i];
				if (radio != other) {
					other.setAttribute('data-click', false);
				}
			}
		}
	}

	function init(event) {
		io.github.crisstanza.UnRadio.start(event);
	}

	window.addEventListener('load', init);

})();
