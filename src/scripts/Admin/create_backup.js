document.getElementById('exportButton').addEventListener('click', async () => {
    try {
      const response = await fetch('/propertyData'); // Запрос на получение данных
      if (!response.ok) {
        throw new Error('Ошибка при получении данных');
      }
  
      const data = await response.json(); // Получение данных в формате JSON
  
      const csvHeaders = Object.keys(data[0]).join(',') + '\n'; // Создание заголовков CSV
  
      const csvRows = data.map(obj =>
        Object.values(obj)
          .map(value => (typeof value === 'string' ? `"${value}"` : value))
          .join(',')
      ).join('\n'); // Преобразование объектов в строки CSV
  
      const csvContent = csvHeaders + csvRows;
  
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, 'propertyData.csv');
      } else {
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', 'propertyData.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  });