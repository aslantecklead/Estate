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

async function loadDataFromServer() {
    try {
        const response = await fetch('http://localhost:3001/estatelist');
        if (!response.ok) {
            throw new Error('Failed to fetch data:', response.status);
        }
        const pins = await response.json();
        if (!pins || pins.length === 0) {
            throw new Error('No data received from the server');
        }
        pins.forEach((data) => {
            const coordinates = [data.latLong.latitude, data.latLong.longitude];
            const price = data.price;
            const priceText = `Price: ${price}`;
        
            const placemark = new ymaps.Placemark(coordinates, {
                iconContent: priceText, 
            });
            myMap.geoObjects.add(placemark);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

window.addEventListener('load', loadDataFromServer);