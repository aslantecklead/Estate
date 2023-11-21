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
                const address = data.address;
                const brokerName = data.brokerName;

                const placemark = new ymaps.Placemark(coordinates, {
                    iconContent: price,
                    balloonContentHeader: `Price: ${price} USD`,
                    balloonContentBody: `Address: ${address}<br>Broker: ${brokerName}`
                }, {
                    iconLayout: 'default#image',
                    iconImageHref: '/public/images/greenpin.png', 
                    iconImageSize: [17.5, 17.5], 
                    iconImageOffset: [-10, -10]
                });

                placemark.events.add('click', function (e) {
                    myMap.balloon.open(coordinates, {
                        contentHeader: placemark.properties.get('balloonContentHeader'),
                        contentBody: placemark.properties.get('balloonContentBody')
                    });
                });

                myMap.geoObjects.add(placemark);
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    loadDataFromServer();
}
