var ROOTS_INDEX = {
	'c': 0,
	'd': 2,
	'e': 4,
	'f': 5,
	'g': 7,
	'a': 9,
	'b': 12
};

var GREEK_MODES_INTERVALS = {
	'jonico': [2, 2, 1, 2, 2, 2, 1],
	'dorico': [2, 1, 2, 2, 2, 1, 2],
	'frigio': [1, 2, 2, 2, 1, 2, 2],
	'lidio': [2, 2, 2, 1, 2, 2, 1],
	'mixolidio': [2, 2, 1, 2, 2, 1, 2],
	'eolico': [2, 1, 2, 2, 1, 2, 2],
	'locrio': [1, 2, 2, 1, 2, 2, 2]
};

function updateNotas(event) {
	let currentRoot = tdRoot.querySelector('[type=radio][name=roots]:checked');
	let currentGreekMode = tdGreekMode.querySelector('[type=radio][name=greek-modes]:checked');
	let trs = tbNotas.querySelectorAll('tr');
	$.forEach(trs, function(tr, indexTr) {
		let tds = tr.querySelectorAll('td');
		$.forEach(tds, function(td, indexTd) {
			$.addClass(td, 'bold');
		});
	});
	// console.log(currentRoot, currentGreekMode);
}

(function() {

	let Autos = io.github.crisstanza.Autos;

	function initLayoutNotas(event) {
		let tds = tbNotas.querySelectorAll('td');
		$.forEach(tds, function(td, index) {
			if (td.innerHTML.includes('#')) {
				$.addClass(td, 'acidente');
			} else {
				$.addClass(td, 'natural');
			}
		});
	}

	function window_Load(event) {
		Autos.initRadios(new RadiosControl());
		initLayoutNotas(event);
		updateNotas(event);
	}

	window.addEventListener('load', window_Load);

})();
