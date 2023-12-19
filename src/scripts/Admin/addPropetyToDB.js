document.addEventListener('DOMContentLoaded', () => {
  const sendData = async (event) => {
    event.preventDefault();

    const propertyDescription = document.getElementById('propertyDescription').value;
    const price = document.getElementById('price').value;
    const agentName = document.getElementById('agentName').value;
    const estateAddress = document.getElementById('estateAddress').value;
    const beds = document.getElementById('beds').value;
    const baths = document.getElementById('baths').value;
    const estatePrice = document.getElementById('estatePrice').value;
    const brokerName = document.getElementById('brokerName').value;
    const imageUrl = document.getElementById('imageUrl').value;
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;
    const area = document.getElementById('area').value;
    const dealPrice = document.getElementById('dealPrice').value;
    const dealDate = document.getElementById('dealDate').value;
    const clientName = document.getElementById('clientName').value;
    const clientEmail = document.getElementById('clientEmail').value;
    const clientPhoneNumber = document.getElementById('clientPhoneNumber').value;

    const formData = {
      propertyDescription,
      price,
      agentName,
      estateAddress,
      beds,
      baths,
      estatePrice,
      brokerName,
      imageUrl,
      latitude,
      longitude,
      area,
      dealPrice,
      dealDate,
      clientName,
      clientEmail,
      clientPhoneNumber
    };

    try {
      const response = await fetch('/add_property_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Ошибка при добавлении данных');
      }

      const result = await response.json();
      console.log('Данные успешно добавлены:', result);
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };

  const insertDataForm = document.getElementById('insertDataForm');
  insertDataForm.addEventListener('submit', sendData);
});
