const cardContainer = document.getElementById("cardContainer");

async function loadDataFromServer() {
    try {
        const response = await fetch('http://localhost:3001/estates');
        if (response.ok) {
            const cardData = await response.json();

            if (cardData) {
                cardContainer.innerHTML = '';
                cardData.forEach((data) => {
                    const cardDiv = document.createElement('div');
                    cardDiv.className = 'col-md-4 card-container';

                    const image = data.photos.find((photo) => isValidImage(photo)) || data.image;

                    cardDiv.innerHTML = `
                    <div class="card mx-auto">
                        <div class="card-image">
                            <img src="${image}" class="card-img" alt="Property Image">
                        </div>
                        <div class="card-body d-flex justify-content-between align-items-center">
                            <div class="cardData">
                                <h5 class="price">$${formatPriceWithCommas(data.price)}</h5>
                                <div class="details">
                                    <div class="text-container">
                                        <p class="name">${data.address.street}, ${data.address.city}, ${data.address.state} ${data.address.zipcode}</p>
                                    </div>
                                    <p class="slash"> | </p>
                                    <p class="broker_name">${data.brokerName}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                    cardContainer.appendChild(cardDiv);
                });
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

function formatPriceWithCommas(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function isValidImage(url) {
    
    return true; 
}

window.addEventListener('load', loadDataFromServer);
