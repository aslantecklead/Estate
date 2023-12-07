document.addEventListener('DOMContentLoaded', async () => {
  try {
    const selectedZpid = localStorage.getItem('selectedZpid');
    if (!selectedZpid) {
      console.error('No selectedZpid found');
      return;
    }
    
    const response = await fetch(`http://localhost:3001/estate/${selectedZpid}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const estateData = await response.json();
    if (!estateData) {
      console.error('No data received from the server');
      return;
    }

    console.log('Received data:', estateData);
    displayEstateData(estateData);
  } catch (error) {
    console.error('Failed to load data:', error);
  }
});

function displayEstateData(data) {
  const propertyImage = document.querySelector('.property-image');
  const dataPrice = document.querySelector('.data-price');
  const dataAddress = document.querySelector('.data-address');
  const dataBroker = document.querySelector('.data-broker');
  const dataArea = document.querySelector('.data-area');
  const dataTaxAssessedValue = document.querySelector('.data-tax');
  const dataLotAreaValue = document.querySelector('.data-lot');
  const dataTimeOnUrbanHunter = document.querySelector('.data-time');

  const dataStatus = document.querySelector('.data-status');
  const dataBeds = document.querySelector('.data-beds');
  const dataBaths = document.querySelector('.data-baths');

  propertyImage.src = data.imgSrc;
  
  dataPrice.textContent = `${data.price}`;
  dataAddress.textContent = data.hdpData.homeInfo.streetAddress;
  dataBroker.textContent = data.hdpData.homeInfo.city + ', ' + data.hdpData.homeInfo.state;
  dataArea.textContent = `${data.hdpData.homeInfo.livingArea} sqr. ft.`;
  dataTaxAssessedValue.textContent = data.hdpData.homeInfo.taxAssessedValue ? `$${data.hdpData.homeInfo.taxAssessedValue}` : 'Data unavailable';
  dataLotAreaValue.textContent = data.hdpData.homeInfo.lotAreaValue ? `${data.hdpData.homeInfo.lotAreaValue} sq. ft.` : 'Data unavailable';
  dataStatus.textContent = `${data.hdpData.homeInfo.homeStatus}`;
  dataBeds.textContent = `${data.hdpData.homeInfo.bedrooms}`;
  dataBaths.textContent = `${data.hdpData.homeInfo.bathrooms}`;

}

