function init() {
	var californiaBounds = [
		[32.512499, -124.482003],
		[36.7783, -114.130859]
];

var centerLA = [34.052235, -118.243683];

var myMap = new ymaps.Map('map', {
		center: centerLA,
		zoom: 11,
		controls: ['typeSelector', 'zoomControl']
}, {
		restrictMapArea: californiaBounds,
		scrollZoomSpeed: 2.2
});

var typeSelector = new ymaps.control.TypeSelector({
		options: {
				layout: 'horizontal',
				size: 'small'
		}
});

myMap.controls.add(typeSelector);

}
