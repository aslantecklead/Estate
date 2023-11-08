const cardContainer = document.getElementById("cardContainer");

async function loadDataFromServer() {
    try {
        const response = await fetch('http://localhost:3000/');
        if (response.ok) {
            const data = await response.json();
            const cardData = data.data;

            if (cardData) {
                const cardTemplateSource = document.getElementById("card-template").innerHTML;
                const cardTemplate = Handlebars.compile(cardTemplateSource);

                cardData.forEach((data) => {
                    const cardHtml = cardTemplate(data);
                    cardContainer.innerHTML += cardHtml;
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
