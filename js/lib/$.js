"use strict";

if (!$) var $ = {};

(function() {

	$.forEach = function(elements, callback) {
		if (elements) {
			var length = elements.length;
			for (var i = 0 ; i < length ; i++) {
				var element = elements[i];
				callback(element, i);
			}
		}
	};

	$.containsClass = function(element, classNameToSearch) {
		if (element) {
			var className = element.getAttribute('class');
			if (className) {
				var classes = className.split(' ');
				var length = classes.length;
				for (var i = 0 ; i < length ; i++) {
					if (classes[i] == classNameToSearch) {
						return true;
					}
				}
			}
		}
		return false;
	};

	$.addClass = function(element, newClassName) {
		if (element) {
			var className = element.getAttribute('class');
			if (className) {
				var classes = className.split(' ');
				var length = classes.length;
				for (var i = 0 ; i < length ; i++) {
					if (classes[i] == newClassName) {
						return;
					}
				}
				className = className.trim() + ' ' + newClassName;
				element.setAttribute('class', className);
			} else {
				element.setAttribute('class', newClassName);	
			}
		}
	};

	$.delClass = function(element, oldClassName) {
		if (element) {
			var className = element.getAttribute('class');
			if (className) {
				var classes = className.split(' ');
				var length = classes.length;
				for (var i = 0 ; i < length ; i++) {
					if (classes[i] == oldClassName) {
						classes[i] = '';
					}
				}
				className = classes.join(' ').trim();
				element.setAttribute('class', className);
			}
		}
	};

	$.toggleClass = function(element, className) {
		if (element) {
			if ($.containsClass(element, className)) {
				$.delClass(element, className);
				return false;
			} else {
				$.addClass(element, className);
				return true;
			}
		}
	};

	$.parent = function(element, tag) {
		if (element) {
			var parent = element.parentNode;
			if (parent) {
				if (tag) {
					if (parent.nodeType == 1) {
						if (parent.tagName.toLowerCase() == tag) {
							return parent;
						} else {
							return $.parent(parent, tag);
						}
					} else {
						return $.parent(parent, tag);
					}
				} else {
					return parent;
				}
			} else {
				return null;
			}
		} else {
			return null;
		}
	};

	$.previous = function(element, tag) {
		if (element) {
			var previous = element.previousSibling;
			if (previous) {
				if (tag) {
					if (previous.nodeType == 1) {
						if (previous.tagName.toLowerCase() == tag) {
							return previous;
						} else {
							return $.previous(previous, tag);
						}
					} else {
						return $.previous(previous, tag);
					}
				} else {
					return previous;
				}
			} else {
				return null;
			}
		} else {
			return null;
		}
	};

})();
