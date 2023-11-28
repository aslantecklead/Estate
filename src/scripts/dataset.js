async function fetchData() {
	try {
			const response = await fetch('http://localhost:3001/estateList');
			const data = await response.json();

			if (!data.cat1) {
					console.log('Отсутствует свойство cat1 в данных');
					return null;
			}

			const searchResults = data.cat1.searchResults;

			if (!searchResults) {
					console.log('Свойство searchResults отсутствует или пусто');
					return null;
			}

			const mapResults = data.cat1.searchResults.mapResults;

			// for (let key in mapResults) {
			// 		if (Object.prototype.hasOwnProperty.call(mapResults, key)) {
			// 				console.log(key, mapResults[key]);
			// 		}
			// }

			return mapResults; // Return the mapResults

	} catch (error) {
			console.error('Произошла ошибка:', error);
			return null;
	}
}	

async function sendDataToServer(data) {
  try {
    const response = await fetch('http://localhost:3001/estates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ newData: data })
    });

    const responseData = await response.json();
    console.log('Ответ от сервера:', responseData);
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
}

window.addEventListener('load', async () => {
  const dataset = await fetchData();
  if (dataset) {
    // Work with the dataset
    console.log(dataset);
    sendDataToServer(dataset); // Отправляем данные на сервер
  } else {
    // Handle when dataset is null or an error occurs
    console.log('Unable to fetch dataset');
  }
});


export { fetchData, sendDataToServer }
