async function initAutocomplete() {
    try {
        const response = await fetch('http://localhost:3001/estatelist');
        if (response.ok) {
            const estateList = await response.json();

            $("#streetInput, #cityInput").autocomplete({
                source: function (request, response) {
                    const term = request.term.toLowerCase();
										const filtered = estateList.filter(function (item) {
											return (
													(item.address && item.address.toLowerCase().includes(term)) ||
													(item.city && item.city.toLowerCase().includes(term))
														);
											});
										const addresses = filtered.map(function (item) {
                        return item.address + ', ' + item.city;
                    });
                    response(addresses);
                },
                minLength: 2 
            });	
        } else {
            console.error('Failed to fetch data:', response.status);
        }
    } catch (error) {
        console.error('Failed to load data:', error);
    }
}

$(document).ready(function () {
    initAutocomplete();
});
