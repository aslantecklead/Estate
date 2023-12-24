document.addEventListener('DOMContentLoaded', function() {
  const currentUserElement = document.getElementById('currentUser');
  const userId = localStorage.getItem('userId');
  const userRole = localStorage.getItem('role');

  if (currentUserElement && userId && userRole) {
    const userIdInt = parseInt(userId, 10);

    fetch(`http://localhost:3001/client/${userIdInt}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(userData => {
        console.log('Данные пользователя:', userData);
        const userName = userData.name;
        currentUserElement.innerText = `Welcome, ${userName}!`;

        if (userRole !== '1') {
          const adminPanelLink = document.querySelector('h1 a[href="/pages/admin/admin_panel.html"]');

          if (adminPanelLink) {
            adminPanelLink.style.display = 'none'; 
          }
        }
      })
      .catch(error => {
        console.error('Проблема с получением данных пользователя:', error);
      });
  } else {
    const adminPanelLink = document.querySelector('h1 a[href="/pages/admin/admin_panel.html"]');
    if (adminPanelLink) {
      adminPanelLink.style.display = 'none';
    }
  }
});
