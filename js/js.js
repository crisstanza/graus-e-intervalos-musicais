(function() {

	function initNotas() {
		let tds = tbNotas.querySelectorAll('td');
		$.forEach(tds, function(td, index) {
			if (td.innerHTML.includes('#')) {
				$.addClass(td, 'acidente');
			} else {
				$.addClass(td, 'natural');
			}
		});
	}

	function window_Load() {
		io.github.crisstanza.Autos.initRadios(new RadiosControl());
		initNotas();
	}

	window.addEventListener('load', window_Load);

})();
