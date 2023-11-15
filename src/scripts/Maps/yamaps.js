ymaps.ready(init);

let myMap;

function init() {
    var centerPoint = [34.0522, -118.2437];
    var laBounds = [
        [34.0, -118.3], 
        [34.1, -118.2]  
    ];

    myMap = new ymaps.Map("map", {
        center: centerPoint,
        zoom: 11.5, 
        restrictMapArea: laBounds
    });

    myMap.setType('yandex#map');
}
