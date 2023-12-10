document.addEventListener('DOMContentLoaded', () => {
	const form = document.querySelector('form');

	form.addEventListener('submit', async (event) => {
			event.preventDefault();

			const formData = new FormData(form);
			const userData = {};
			formData.forEach((value, key) => {
					userData[key] = value;
			});

			try {
					const response = await fetch('http://localhost:4000/register', {
							method: 'POST',
							headers: {
									'Content-Type': 'application/json'
							},
							body: JSON.stringify(userData)
					});

					if (!response.ok) {
							throw new Error('Registration failed');
					}

					const data = await response.json();

					window.location.href = '/'; 
			} catch (error) {
					console.error('Registration error:', error);
			}
	});
});
