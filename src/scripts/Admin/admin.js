async function fetchDataAndPopulateTable() {
	try {
		const response = await fetch('/propertyData');
		const data = await response.json();

		const tableBody = document.querySelector('table tbody');
		tableBody.innerHTML = '';

		data.forEach(row => {
			const newRow = document.createElement('tr');
			Object.entries(row).forEach(([key, value]) => {
				const newCell = document.createElement('td');
				if (key === 'imageUrl') {
					const newImage = document.createElement('img');
					newImage.src = value;
					newImage.alt = 'Property Image';
					newImage.width = 100; // Установите размер изображения по вашему усмотрению
					newCell.appendChild(newImage);
				} else {
					newCell.textContent = value;
				}
				newRow.appendChild(newCell);
			});
			tableBody.appendChild(newRow);
		});
	} catch (error) {
		console.error('Ошибка при получении данных:', error);
	}
}

window.onload = fetchDataAndPopulateTable;
