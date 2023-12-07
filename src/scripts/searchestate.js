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

                        return { label: fullAddress, value: fullAddress, zpid: (item.hdpData && item.hdpData.homeInfo && item.hdpData.homeInfo.zpid) ? item.hdpData.homeInfo.zpid : null };

                    });

                    response(addresses);
                },
                minLength: 2,
                select: function(event, ui) {
                    const selectedZpid = ui.item.zpid; 
                    if (selectedZpid) {
                        localStorage.setItem('selectedZpid', selectedZpid); 
                        console.log('Selected zpid:', selectedZpid);
                    } else {
                        console.error('No zpid found for selected item.');
                    }
                }
            });
        } else {
            console.error('Failed to fetch data:', response.status);
        }
    } catch (error) {
        console.error('Failed to load data:', error);
    }
}

initAutocomplete();
