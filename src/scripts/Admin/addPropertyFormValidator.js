// Функция для валидации формы
function validateForm() {
	var propertyDescription = document.getElementById('propertyDescription').value;
	var price = document.getElementById('price').value;
	var agentName = document.getElementById('agentName').value;
	var estateAddress = document.getElementById('estateAddress').value;
	var beds = document.getElementById('beds').value;
	var baths = document.getElementById('baths').value;
	var estatePrice = document.getElementById('estatePrice').value;
	var brokerName = document.getElementById('brokerName').value;
	var imageUrl = document.getElementById('imageUrl').value;
	var latitude = document.getElementById('latitude').value;
	var longitude = document.getElementById('longitude').value;
	var area = document.getElementById('area').value;
	var dealDate = document.getElementById('dealDate').value;
	var dealPrice = document.getElementById('dealPrice').value;
	var clientName = document.getElementById('clientName').value;
	var clientEmail = document.getElementById('clientEmail').value;
	var clientPhoneNumber = document.getElementById('clientPhoneNumber').value;

	// Проверка каждого поля на валидность
	if (propertyDescription.length < 5 || propertyDescription.length > 100) {
			alert('Property Description should be between 5 and 100 characters.');
			return false;
	}

	if (isNaN(price) || price <= 0) {
			alert('Price should be a valid number greater than 0.');
			return false;
	}

	if (agentName.trim().length === 0) {
			alert('Please enter Agent Name.');
			return false;
	}

	if (estateAddress.trim().length === 0) {
			alert('Please enter Estate Address.');
			return false;
	}

	if (beds < 0 || baths < 0) {
			alert('Bedrooms and Bathrooms should be a positive number.');
			return false;
	}

	if (isNaN(estatePrice) || estatePrice <= 0) {
			alert('Estate Price should be a valid number greater than 0.');
			return false;
	}

	if (brokerName.trim().length === 0) {
			alert('Please enter Broker Name.');
			return false;
	}

	if (imageUrl.trim().length === 0) {
			alert('Please enter Image URL.');
			return false;
	}

	if (latitude.trim().length === 0 || longitude.trim().length === 0) {
			alert('Please enter Latitude and Longitude.');
			return false;
	}

	if (isNaN(area) || area <= 0) {
			alert('Area should be a valid number greater than 0.');
			return false;
	}

	if (dealDate.trim().length === 0) {
			alert('Please enter Deal Date.');
			return false;
	}

	if (isNaN(dealPrice) || dealPrice <= 0) {
			alert('Deal Price should be a valid number greater than 0.');
			return false;
	}

	if (clientName.trim().length === 0) {
			alert('Please enter Client Name.');
			return false;
	}

	if (!clientEmail.match(/\S+@\S+\.\S+/)) {
			alert('Please enter a valid Client Email.');
			return false;
	}

	if (!clientPhoneNumber.match(/^\d{3}-\d{3}-\d{4}$/)) {
			alert('Please enter a valid Client Phone Number in the format 123-456-7890.');
			return false;
	}

	return true;
}

var form = document.getElementById('insertDataForm');
form.addEventListener('submit', function(event) {
	event.preventDefault(); 
	if (validateForm()) {
			form.submit();
	}
});
