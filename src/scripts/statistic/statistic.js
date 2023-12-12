async function displayStatistics(option) {
	try {
			const response = await fetch(`http://localhost:3001/estatelist`);
			const data = await response.json();

			if (option === 'averagePrice') {
					const groupedByArea = {};
					data.forEach((obj) => {
							if (obj.hdpData && obj.hdpData.homeInfo && obj.hdpData.homeInfo.city && obj.hdpData.homeInfo.state && obj.price) {
									const area = `${obj.hdpData.homeInfo.city}, ${obj.hdpData.homeInfo.state}`;
									const price = parseFloat(obj.price.replace(/[^0-9.-]+/g, ''));
									if (!groupedByArea[area]) {
											groupedByArea[area] = [];
									}
									groupedByArea[area].push(price);
							}
					});

					const averagePricesByArea = Object.keys(groupedByArea).map((area) => ({
							area,
							averagePrice: groupedByArea[area].reduce((acc, price) => acc + price, 0) / groupedByArea[area].length,
					})).sort((a, b) => b.averagePrice - a.averagePrice);

					const ctx = document.getElementById('priceHistogram').getContext('2d');
					const labels = averagePricesByArea.map((item) => item.area);
					const dataValues = averagePricesByArea.map((item) => item.averagePrice);

					new Chart(ctx, {
							type: 'line',
							data: {
									labels,
									datasets: [{
											label: 'Average Price by Area',
											data: dataValues,
											backgroundColor: 'rgba(54, 162, 235, 0.6)',
											borderColor: 'rgba(54, 162, 235, 1)',
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
									animation: {
											duration: 2000,
											easing: 'easeInOutQuad'
									},
									plugins: {
											title: {
													display: true,
													text: 'Average Price by Area'
											},
											tooltip: {
													mode: 'index',
													intersect: false,
													animationDuration: 500
											},
											zoom: {
													zoom: {
															wheel: {
																	enabled: true
															},
															pinch: {
																	enabled: true
															},
															mode: 'xy'
													}
											}
									}
							}
					});
			}
	} catch (error) {
			console.error('Error fetching data:', error);
	}
}

document.getElementById('averagePrice').addEventListener('click', () => displayStatistics('averagePrice'));
document.getElementById('priceDistribution').addEventListener('click', () => displayStatistics('priceDistribution'));
document.getElementById('topProperties').addEventListener('click', () => displayStatistics('topProperties'));

document.addEventListener('DOMContentLoaded', () => {
  displayStatistics('averagePrice');
  displayStatistics('priceDistribution');
  displayStatistics('topProperties');
});
