var ROOTS_INDEX = {
	'c': [0, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
	'd': [2, 1, 0, 11, 10, 9, 8, 7, 6, 5, 4, 3],
	'e': [4, 3, 2, 1, 0, 11, 10, 9, 8, 7, 6, 5],
	'f': [5, 4, 3, 2, 1, 0, 11, 10, 9, 8, 7, 6],
	'g': [7, 6, 5, 4, 3, 2, 1, 0, 11, 10, 9, 8],
	'a': [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 11, 10],
	'b': [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
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

var INTERVALS = {
	'2m': 1,
	'2M': 2,
	'3m': 3,
	'3M': 4,
	'4': 5,
	'4a': 6,
	'5': 7,
	'5a': 8,
	'6M': 9,
	'7m': 10,
	'7M': 11
};

function updateNotas(event) {
	let allRoots = tdRoot.querySelectorAll('[type=radio][name=roots]');
	$.forEach(allRoots, function(root, index) {
		$.delClass($.parent(root, 'label'), 'root');
	});
	let currentRoot = tdRoot.querySelector('[type=radio][name=roots]:checked');
	$.addClass($.parent(currentRoot, 'label'), 'root');

	let allGreekModes = tdGreekMode.querySelectorAll('[type=radio][name=greek-modes]');
	$.forEach(allGreekModes, function(greekMode, index) {
		$.delClass($.parent(greekMode, 'label'), 'note');
	});
	let currentGreekMode = tdGreekMode.querySelector('[type=radio][name=greek-modes]:checked');
	$.addClass($.parent(currentGreekMode, 'label'), 'note');

	let allIntervals = tdIntervals.querySelectorAll('[type=checkbox][name=intervals]');
	$.forEach(allIntervals, function(interval, index) {
		$.delClass($.parent(interval, 'label'), 'note');
	});
	let currentIntervals = tdIntervals.querySelectorAll('[type=checkbox][name=intervals]:checked');
	$.forEach(currentIntervals, function(interval, index) {
		$.addClass($.parent(interval, 'label'), 'note');
	});

	let trs = tbNotas.querySelectorAll('tr');
	$.forEach(trs, function(tr, indexTr) {
		let tds = tr.querySelectorAll('td');
		$.forEach(tds, function(td, indexTd) {
			$.delClass(td, 'note');
			$.delClass(td, 'root');
			$.addClass(td, 'll');
		});
	});
	let intervalGreekMode = currentGreekMode ? GREEK_MODES_INTERVALS[currentGreekMode.value] : [];
	let currentRootValue = currentRoot.value;
	$.forEach(trs, function(tr, indexTr) {
		let tds = tr.querySelectorAll('td');
		let rootsIndex = ROOTS_INDEX[currentRootValue][indexTr];
		if (intervalGreekMode.length == 0) {
			let td = tds[rootsIndex];
			$.delClass(td, 'll');
			$.addClass(td, 'note');
			$.addClass(tds[rootsIndex], 'root');
		} else {
			for (let i = 0 ; i < intervalGreekMode.length ; i++) {
				let td = tds[rootsIndex];
				$.delClass(td, 'll');
				$.addClass(td, 'note');
				if (rootsIndex == ROOTS_INDEX[currentRootValue][indexTr]) {
					$.addClass(td, 'root');
				}
				rootsIndex += intervalGreekMode[i];
				rootsIndex %= 12;
			}
		}
	});
	$.forEach(trs, function(tr, indexTr) {
		let tds = tr.querySelectorAll('td');
		$.forEach(currentIntervals, function(checkedInterval, index) {
			let rootIndex = ROOTS_INDEX[currentRootValue][indexTr];
			let currentInterval = INTERVALS[checkedInterval.value];
			let intervalIndex = rootIndex + currentInterval;
			intervalIndex %= 12;
			let td = tds[intervalIndex];
			$.delClass(td, 'll');
			$.addClass(td, 'note');
		});
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
		Autos.initChecks(new ChecksControl());
		initLayoutNotas(event);
		updateNotas(event);
	}

	window.addEventListener('load', window_Load);

})();
