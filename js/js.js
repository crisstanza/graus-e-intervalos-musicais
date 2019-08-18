var ROOTS_INDEX = {
	'c': [0, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
	'd': [2, 1, 0, 11, 10, 9, 8, 7, 6, 5, 4, 3],
	'e': [4, 3, 2, 1, 0, 11, 10, 9, 8, 7, 6, 5],
	'f': [5, 4, 3, 2, 1, 0, 11, 10, 9, 8, 7, 6],
	'g': [7, 6, 5, 4, 3, 2, 1, 0, 11, 10, 9, 8],
	'a': [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 11, 10],
	'b': [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
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
			$.delClass(td, 'bold');
			$.delClass(td, 'root');
		});
	});
	let interval = GREEK_MODES_INTERVALS[currentGreekMode.value];
	let currentRootValue = currentRoot.value;
	$.forEach(trs, function(tr, indexTr) {
		let tds = tr.querySelectorAll('td');
		let rootsIndex = ROOTS_INDEX[currentRootValue][indexTr];
		for (let i = 0 ; i < interval.length ; i++) {
			$.addClass(tds[rootsIndex], 'bold');
			if (rootsIndex == ROOTS_INDEX[currentRootValue][indexTr]) {
				$.addClass(tds[rootsIndex], 'root');
			}
			rootsIndex += interval[i];
			rootsIndex %= 12;
		}
	});
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
