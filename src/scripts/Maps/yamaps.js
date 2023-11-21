ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map('map', {
        center: [34.0522, -118.2437],
        zoom: 11.5,
        controls: []
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
                const image = data.imgSrc;
                const temp = data.priceLabel;
                const minArea = data.area;

                const placemark = new ymaps.Placemark(coordinates, {
                    balloonContentHeader: `<a href="#" style="text-decoration: none;">${price}</a>`,
                    balloonContentBody: `<img src="${image}" class='mapEstateImage'> <br/>` +
                        `<a href="#" style="text-decoration: none;">Address: ${address}</a><br>` +
                        `<span>${data.beds} Beds, ${data.baths} Baths</span><br>` +
                        `<span>Area: ${minArea} sq.ft.</span>`,
                    balloonContentFooter: `<span>Broker: ${brokerName}</span>`,
                    hintContent: `${temp}`
                }, {
                    iconLayout: 'default#image',
                    iconImageHref: '/public/images/greenpin.png',
                    iconImageSize: [17.5, 17.5],
                    iconImageOffset: [-10, -10]
                });

                placemark.events.add('click', function (e) {
                    myMap.balloon.open(coordinates, {
                        contentHeader: placemark.properties.get('balloonContentHeader'),
                        contentBody: placemark.properties.get('balloonContentBody'),
                        contentFooter: placemark.properties.get('balloonContentFooter')
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
