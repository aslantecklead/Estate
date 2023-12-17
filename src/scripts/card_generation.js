const cardContainer = document.getElementById("cardContainer");
const paginationContainer = document.querySelector(".pagination_section");
const itemsPerPage = 10; 
let currentPage = 1;
let cardData = []; // Глобальная переменная для хранения данных

async function loadDataFromServer() {
  try {
    const response = await fetch('http://localhost:3001/estatelist');
    if (response.ok) {
      cardData = await response.json();

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
    const area = data.area;
    const zpid = data.zpid; 

    cardDiv.innerHTML = `
      <div class="card mx-auto">
        <div class="card-image">
          <img src="${imageUrl}" class="card-img" alt="Property Image">
        </div>
        <div class="card-body d-flex justify-content-between align-items-center">
          <div class="cardData">
            <h5 class="price">${price} for ${area} sq. ft.</h5>
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

    cardDiv.addEventListener('click', () => {
      if (zpid) {
        localStorage.setItem('selectedZpid', zpid);
        
        window.location.href = '/pages/EstatePage.html'; 
      }
    });
  });
}

// ... (ваш остальной код)


function sortDataByCriteria(data, criteria = 'price') {
  const compareFunction = (a, b) => {
    const priceA = parseFloat(a.price.replace('$', ''));
    const priceB = parseFloat(b.price.replace('$', ''));

    if (criteria === 'price') {
      return priceA - priceB;
    } else if (criteria === 'area') {
      return a.area - b.area;
    }
  };

  const sortedData = [...data];
  sortedData.sort(compareFunction);

  return sortedData;
}


function sortData(criteria) {
  const sortedData = sortDataByCriteria(cardData, criteria);
  displayCards(sortedData);
}

window.addEventListener('load', loadDataFromServer);

document.getElementById('sortByPrice').addEventListener('click', function () {
  sortData('price');
});

document.getElementById('sortByArea').addEventListener('click', function () {
  sortData('area');
});
