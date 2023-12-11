document.addEventListener('DOMContentLoaded', () => {
  const saveWordBtn = document.getElementById('save_pdf');
  saveWordBtn.addEventListener('click', async () => {
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

      createWordFile(estateData);
    } catch (error) {
      console.error('Failed to create Word file:', error);
    }
  });

  function createWordFile(data) {
    let content = `Real Estate Data:
    Price: ${data.price}
    Bedrooms: ${data.beds}
    Bathrooms: ${data.baths}
    Address: ${data.hdpData.homeInfo.streetAddress}
    City, State: ${data.hdpData.homeInfo.city}, ${data.hdpData.homeInfo.state}
    Area: ${data.hdpData.homeInfo.livingArea} sq. ft.
    Status: ${data.hdpData.homeInfo.homeStatus}
    
    Zip Code: ${data.hdpData.homeInfo.zipcode}

        Taxes: 
    Tax Assessed Value: $${data.hdpData.homeInfo.taxAssessedValue}
    Rent Estimate: $${data.hdpData.homeInfo.rentZestimate} / per mouth

    Days on Urban Hunter: ${data.hdpData.homeInfo.daysOnZillow}
    `; 

    const blob = new Blob([content], { type: 'application/msword' });

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `URBAN_HUNTER_estate№${data.zpid}.doc`;
    downloadLink.click();
    URL.revokeObjectURL(downloadLink.href);

    console.log('Word file created successfully');
  }  
});
