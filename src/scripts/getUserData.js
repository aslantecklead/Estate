async function getUserData() {
	try {
		const accessToken = getAccessToken(); // Получаем токен доступа
		const userResponse = await fetch('http://localhost:4000/current-user', {
			headers: {	
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (userResponse.ok) {
			const userData = await userResponse.json();
			console.log('Данные о пользователе:', userData);
		} else {
			console.error('Failed to fetch user data:', userResponse.status);
			// Если токен недействителен, можно попытаться обновить его, используя refresh token
			const refreshToken = localStorage.getItem('refreshToken');
			if (refreshToken) {
				await getNewAccessToken(refreshToken);
				getUserData(); // Повторный вызов после обновления токена
			}			
		}
	} catch (error) {
		console.error('Failed to load data:', error);
	}
}

function getAccessToken() {
	return localStorage.getItem('accessToken');
}
getUserData();