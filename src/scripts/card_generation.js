const cardContainer = document.getElementById("cardContainer");

async function loadDataFromServer() {
    try {
        const response = await fetch('http://localhost:3001/estates');
        if (response.ok) {
            const cardData = await response.json();

            if (cardData) {
                cardContainer.innerHTML = '';

                const imagePromises = cardData.map(async (data) => {
                    const image = await getImageFromData(data);
                    return { data, image };
                });

                // Ожидаем загрузку всех изображений
                const cardDataWithImages = await Promise.all(imagePromises);

                cardDataWithImages.forEach((dataWithImage) => {
                    const { data, image } = dataWithImage;
                    const cardDiv = document.createElement('div');
                    cardDiv.className = 'col-md-4 card-container';

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

async function isValidImage(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        console.error('Error checking image availability:', error);
        return false; 
    }
}

async function getImageFromData(data) {
    const allPhotos = [data.image, ...data.photos]; 

    for (const photo of allPhotos) {
        const isValid = await isValidImage(photo);
        if (isValid) {
            return photo; 
        }
    }

    return '';
}

window.addEventListener('load', loadDataFromServer);
