async function fetchUsersAndPopulateTable() {
	try {
		const response = await fetch('/users'); 
		const data = await response.json();

		const tableBody = document.querySelector('table tbody');
		tableBody.innerHTML = '';

		data.forEach(user => {
			const newRow = document.createElement('tr');

			const deleteButtonCell = document.createElement('td');
			const deleteButton = document.createElement('button');
			deleteButton.textContent = 'Delete';

			deleteButton.addEventListener('click', async () => {
				const userId = user.id_client; 
		
				try {
						const deleteResponse = await fetch(`http://localhost:3001/users/${userId}`, {
								method: 'DELETE'
						});
		
						if (deleteResponse.ok) {
								await fetchUsersAndPopulateTable();
						} else {
								throw new Error('Не удалось удалить запись');
						}
				} catch (error) {
						console.error('Ошибка при удалении:', error);
				}
		});
		
		

			deleteButtonCell.appendChild(deleteButton);
			newRow.appendChild(deleteButtonCell);

			Object.entries(user).forEach(([key, value]) => {
				const newCell = document.createElement('td');
				if (key === 'imageUrl') {
					const newImage = document.createElement('img');
					newImage.src = value;
					newImage.alt = 'User Image';
					newImage.width = 250;
					newCell.appendChild(newImage);
				} else {
					newCell.textContent = value;
				}
				newRow.appendChild(newCell);
			});

			newRow.addEventListener('click', () => {
				localStorage.setItem('selectedUserId', user.id);
				console.log('ID пользователя:', user.id);
			});

			tableBody.appendChild(newRow);
		});
	} catch (error) {
		console.error('Ошибка при получении данных:', error);
	}
}

window.onload = fetchUsersAndPopulateTable;
