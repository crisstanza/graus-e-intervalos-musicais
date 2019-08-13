"use strict";

if (!io) var io = {};
if (!io.github) io.github = {};
if (!io.github.crisstanza) io.github.crisstanza = {};
if (!io.github.crisstanza.Autos) io.github.crisstanza.Autos = {};

(function() {

	io.github.crisstanza.Autos.initIds = function() {
		let elements = document.querySelectorAll('[id]:not([id=""])');
		if (elements) {
			let length = elements.length;
			for (let i = 0 ; i < length ; i++) {
				let element = elements[i];
				let id = element.getAttribute('id');
				let identifier = fixId(id);
				window[identifier] = element;
			}
		}
		return elements;
	};

	io.github.crisstanza.Autos.initNames = function() {
		let elements = document.querySelectorAll('[name]:not([name=""])');
		if (elements) {
			let length = elements.length;
			for (let i = 0 ; i < length ; i++) {
				let element = elements[i];
				let name = element.getAttribute('name');
				let identifier = fixId(name);
				if (!window[identifier]) {
					window[identifier] = [];
				}
				window[identifier].push(element);
			}
		}
		return elements;
	};

	function fixId(str) {
		let parts = str.split('-');
		let length = parts.length;
		for (let i = 0 ; i < length ; i++) {
			let part = parts[i];
			if (i > 0) {
				parts[i] = part.charAt(0).toUpperCase() + part.slice(1);
			}
		}
		let identifier = parts.join('');
		return identifier;
	}

	function firstUppercase(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	function init(event) {
		let autos = document.body.getAttribute('data-autos');
		if (autos) {
			let parts = autos.split(', ');
			let length = parts.length;
			for (let i = 0 ; i < length ; i++) {
				let part = parts[i];
				let identifier = firstUppercase(part);
				let js = 'io.github.crisstanza.Autos.init'+identifier+'();';
				eval(js);
			}
		}
	}

	window.addEventListener('load', init);

})();
