async function initAutocomplete() {
    try {
        const response = await fetch('http://localhost:3001/estatelist');
        if (response.ok) {
            const estateData = await response.json();

            $("#streetInput, #cityInput").autocomplete({
                source: function (request, response) {
                    const term = request.term.toLowerCase();
                    const filtered = estateData.filter(function (item) {
                        const addressMatch = item.address && item.address.toLowerCase().includes(term);
                        const cityMatch =
                            item.hdpData &&
                            item.hdpData.homeInfo &&
                            item.hdpData.homeInfo.city &&
                            item.hdpData.homeInfo.city.toLowerCase().includes(term);
                        
                        return addressMatch || cityMatch;
                    });

                    const addresses = filtered.map(function (item) {
                        let fullAddress = item.address + ', ' + (item.hdpData && item.hdpData.homeInfo.city ? item.hdpData.homeInfo.city : '');

                        if (
                            item.address &&
                            item.hdpData &&
                            item.hdpData.homeInfo &&
                            item.address.toLowerCase().includes(item.hdpData.homeInfo.city.toLowerCase())
                        ) {
                            fullAddress = item.address.replace(new RegExp(item.hdpData.homeInfo.city, 'i'), '') + ', ' + item.hdpData.homeInfo.city;
                        }

                        return fullAddress;
                    });

                    response(addresses);
                },
                minLength: 2,
            });
        } else {
            console.error('Failed to fetch data:', response.status);
        }
    } catch (error) {
        console.error('Failed to load data:', error);
    }
}

