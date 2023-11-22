const cardContainer = document.getElementById("cardContainer");
const paginationContainer = document.querySelector(".pagination_section");
const itemsPerPage = 9; 
let currentPage = 1; 

async function loadDataFromServer() {
  try {
    const response = await fetch('http://localhost:3001/estatelist');
    if (response.ok) {
      const cardData = await response.json();

      if (cardData) {
        displayCards(cardData);
        createPagination(cardData.length);
      } else {
        console.error('No data received from the server');
      }
    } else {
      console.error('Failed to fetch data:', response.status);
    }
  } catch (error) {
    console.error('Failed to load data:', error);
  }
}

function displayCards(data) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCards = data.slice(startIndex, endIndex);

  cardContainer.innerHTML = '';
  currentCards.forEach((data) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'col-md-4 card-container';

    const imageUrl = data.imgSrc;
    const price = data.price;
    const address = data.address;
    const brokerName = data.brokerName;

    cardDiv.innerHTML = `
      <div class="card mx-auto">
        <div class="card-image">
          <img src="${imageUrl}" class="card-img" alt="Property Image">
        </div>
        <div class="card-body d-flex justify-content-between align-items-center">
          <div class="cardData">
            <h5 class="price">${price}</h5>
            <div class="details">
              <div class="text-container">
                <p class="name">${address}</p>
              </div>
              <p class="slash"> | </p>
              <p class="broker_name">${brokerName}</p>
            </div>
          </div>
        </div>
      </div>
    `;
    cardContainer.appendChild(cardDiv);
  });
}

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

window.addEventListener('load', loadDataFromServer);
