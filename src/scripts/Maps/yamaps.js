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

// async function fetchData() {
//     const data = await fetch('http://localhost:3001/estateList')
//         .then((response) => response.json())
//     console.log(data);   
// }

async function fetchData() {
    try {
        const response = await fetch('http://localhost:3001/estateList');
        const data = await response.json();

        if (!data.cat1) {
            console.log('Отсутствует свойство cat1 в данных');
            return;
        }

        const searchResults = data.cat1.searchResults;

        if (!searchResults) {
            console.log('Свойство searchResults отсутствует или пусто');
            return;
        }

        const mapResults = data.cat1.searchResults.mapResults;

        for (let key in mapResults) {
            if (Object.prototype.hasOwnProperty.call(mapResults, key)) {
                console.log(key, mapResults[key]);
            }
        }

    } catch (error) {
        console.error('Произошла ошибка:', error);
    }
}


window.addEventListener('load', fetchData);