document.addEventListener('DOMContentLoaded', function() {
  const currentUserElement = document.getElementById('currentUser');

  // Получаем ID пользователя из localStorage родительской страницы
  const userId = localStorage.getItem('userId');
	console.log(userId);
  if (currentUserElement && userId) {
    currentUserElement.innerText = `User ID: ${userId}`;
  }
});