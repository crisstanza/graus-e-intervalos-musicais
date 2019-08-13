"use strict";

if (!Utils) var Utils = {};

(function() {

	Utils.Autos.initIds = function(_parent) {
		var parent = _parent ? _parent : document;
		let elements = parent.querySelectorAll('[id]:not([id=""])');
		$.forEach(
			elements, function(element, index) {
				let id = element.getAttribute('id');
				let identifier = fixId(id);
				window[identifier] = element;
			}
		);
		return elements;
	};

	Utils.Autos.initNames = function(_parent) {
		var parent = _parent ? _parent : document;
		let elements = parent.querySelectorAll('[name]:not([name=""])');
		$.forEach(
			elements, function(element, index) {
				let name = element.getAttribute('name');
				let identifier = fixId(name);
				window[identifier] = element;
			}
		);
		return elements;
	};

	function fixId(id) {
		let parts = id.split('-');
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

})();
