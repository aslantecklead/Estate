document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); 

  const formData = new FormData(this);
  const data = {
    email: formData.get('email'),
    password: formData.get('password')
  };

  fetch('http://localhost:4000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)  
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log("Ответ сервера:", data);
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('userId', data.id);
    localStorage.setItem('role', data.role); 
    console.log('Роль пользователя:', data.role);
    window.location.href = '/';
  })
  .catch(error => {
    console.error('Проблема с запросом:', error); 
  });  
});
