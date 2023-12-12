async function fetchData() {
	try {
			const response = await fetch('http://localhost:3001/estatelist');
			const data = await response.json();
			return data;
	} catch (error) {
			console.error('Error fetching data:', error);
			return []; 
	}
}

async function processDataAndGenerateChart() {
	const data = await fetchData();

	const priceRangesData = {
			'0-199': 0,
			'199-399': 0,
			'399-599': 0,
			'599-799': 0,
			'799-999': 0
	};

	data.forEach((obj) => {
			if (obj.price) {
					const price = parseFloat(obj.price.replace(/[^0-9.-]+/g, ''));
					if (price >= 0 && price < 200000) {
							priceRangesData['0-199']++;
					} else if (price >= 200000 && price < 400000) {
							priceRangesData['199-399']++;
					} else if (price >= 400000 && price < 600000) {
							priceRangesData['399-599']++;
					} else if (price >= 600000 && price < 800000) {
							priceRangesData['599-799']++;
					} else if (price >= 800000 && price < 1000000) {
							priceRangesData['799-999']++;
					}
			}
	});

	const priceRanges = Object.keys(priceRangesData);
	const counts = Object.values(priceRangesData);

	const chartType = 'bar';

	const ctx = document.getElementById('priceHistogram').getContext('2d');
	
	console.log(priceRangesData);

	new Chart(ctx, {
			type: chartType,
			data: {
					labels: priceRanges,
					datasets: [{
							label: 'Price Distribution',
							data: counts,
							backgroundColor: 'rgb(183, 197, 203)',
							borderColor: 'rgb(114, 122, 126)',
							borderWidth: 2,
							fill: false
					}]
			},
			options: {
					scales: {
							y: {
									beginAtZero: true
							}
					},
					plugins: {
							title: {
									display: true,
									text: 'Price Distribution'
							},
							tooltip: {
									mode: 'index',
									intersect: false
							}
					}
			}
	});
}

document.addEventListener('DOMContentLoaded', () => {
	processDataAndGenerateChart();
});
