const cardContainer = document.getElementById("cardContainer");

async function loadDataFromServer() {
    try {
        const response = await fetch('http://localhost:3001/properties');
        if (response.ok) {
            const data = await response.json();
            const cardData = data.data;

            if (cardData) {
                cardContainer.innerHTML = ''; 

                cardData.forEach((data) => {
                    const cardDiv = document.createElement('div');
                    cardDiv.className = 'col-md-4 card-container';
                    cardDiv.innerHTML = `
                        <div class="card mx-auto">
                            <div class="card-image">
                                <img src="${data.imageSrc}" class="card-img" alt="Property Image">
                            </div>
                            <div class="card-body d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 class="price">${data.price}</h5>
                                    <div class="details">
                                        <p class="name">${data.address}</p>
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

window.addEventListener('load', loadDataFromServer);