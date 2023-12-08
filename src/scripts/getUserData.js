async function getUserData() {
	try {
		const accessToken = getAccessToken();
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
			const refreshToken = localStorage.getItem('refreshToken');
			if (refreshToken) {
				await getNewAccessToken(refreshToken);
				getUserData();
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