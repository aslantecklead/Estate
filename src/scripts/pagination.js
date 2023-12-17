function createPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  paginationContainer.innerHTML = '';
  
  const maxButtons = 10; 
  let startPage = 1;
  let endPage = Math.min(totalPages, maxButtons);
  
  if (totalPages > maxButtons) {
    const half = Math.floor(maxButtons / 2);
    if (currentPage > half) {
      startPage = currentPage - half;
      endPage = currentPage + half;
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = totalPages - maxButtons + 1;
      }
    }
  }
  
  const prevButton = document.createElement('a');
  prevButton.href = '#';
  prevButton.textContent = '<< Previous';
  prevButton.classList.add('pagination-button');
  prevButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      loadDataFromServer();
    }
  });
  paginationContainer.appendChild(prevButton);
  
  for (let i = startPage; i <= endPage; i++) {
    const button = document.createElement('a');
    button.href = '#';
    button.textContent = i;
    button.classList.add('pagination-button');
  
    if (i === currentPage) {
      button.classList.add('active');
    }
  
    button.addEventListener('click', (event) => {
      event.preventDefault();
      currentPage = i;
      loadDataFromServer();
    });
  
    paginationContainer.appendChild(button);
  }

  const nextButton = document.createElement('a');
  nextButton.href = '#';
  nextButton.textContent = 'Next >>';
  nextButton.classList.add('pagination-button');
  nextButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      loadDataFromServer();
    }
  });
  paginationContainer.appendChild(nextButton);
}