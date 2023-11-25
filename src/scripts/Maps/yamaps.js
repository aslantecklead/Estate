ymaps.ready(init);

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

    let estateData = []; // Хранение данных о недвижимости

    async function loadDataFromServer() {
        try {
            const response = await fetch('http://localhost:3001/estatelist');
            if (!response.ok) {
                throw new Error('Failed to fetch data:', response.status);
            }
            estateData = await response.json(); // Сохраняем данные о недвижимости в массив

            if (!estateData || estateData.length === 0) {
                throw new Error('No data received from the server');
            }
            
            estateData.forEach((data, index) => {
                const coordinates = [data.latLong.latitude, data.latLong.longitude];
                const price = data.price;
                const address = data.address;
                const brokerName = data.brokerName;
                const image = data.imgSrc;
                const priceLabel = data.priceLabel;
                const minArea = data.area;
                const beds = data.beds;
                const baths = data.baths;

                const placemark = new ymaps.Placemark(coordinates, {
                    balloonContentHeader: `<a href="#" class="marker-link">${price}</a>`,
                    balloonContentBody: `<div class="marker-balloon">
                        <img src="${image}" class='mapEstateImage'><br/>
                        <a href="#" class="property-address">Address: ${address}</a><br>
                        <span class="property-details">${beds} Beds, ${baths} Baths</span><br>
                        <span class="property-details">Area: ${minArea} sq.ft.</span>
                        <button class="more-info-btn" data-index="${index}">More Info</button>
                    </div>`,
                    balloonContentFooter: `<span class="broker-info">Broker: ${brokerName}</span>`,
                    hintContent: `${priceLabel} | beds: ${beds} | baths: ${baths}</span>`
                }, {
                    iconLayout: 'default#image',
                    iconImageHref: '/images/greenpin.png',
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

            document.addEventListener('click', function(event) {
                const target = event.target;
                if (target.classList.contains('more-info-btn')) {
                    const index = parseInt(target.dataset.index);
                    if (!isNaN(index) && estateData[index]) {
                        const modal = document.getElementById('modal');
                        const modalContent = document.getElementById('modal-content');
                        modalContent.innerHTML = JSON.stringify(estateData[index]); 
            
                        modal.style.display = 'block'; 
                    }
                }
            });
            const closeBtn = document.getElementsByClassName('close')[0];
            closeBtn.onclick = function() {
                const modal = document.getElementById('modal');
                modal.style.display = 'none';
            };
            
        } catch (error) {
            console.error('Error:', error);
        }
    }

    loadDataFromServer();
}
