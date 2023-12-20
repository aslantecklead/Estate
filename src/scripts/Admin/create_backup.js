const backupButton = document.getElementById('backupButton');

backupButton.addEventListener('click', async () => {
  try {
    const response = await fetch('/createBackup', {
      method: 'POST',
    });

    if (response.ok) {
      console.log('Запрос на создание бэкапа успешно отправлен');
    } else {
      console.error('Ошибка при создании бэкапа');
    }
  } catch (error) {
    console.error('Ошибка:', error);
  }
});
