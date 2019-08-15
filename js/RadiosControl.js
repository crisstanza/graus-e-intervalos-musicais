var RadiosControl = function() {
};

RadiosControl.prototype.roots_OnClick = function(event) {
	let radio = event.target;
	console.log(radio.value)
};

RadiosControl.prototype.greekModes_OnClick = function(event) {
	let radio = event.target;
	console.log(radio.value)
};
