var cities = [
	"Acton", "Adelanto", "Agoura Hills", "Aguanga", "Alta Loma", "Altadena", "Anaheim", "Apple Valley", "Arcadia", "Azusa", "Baldwin Park", "Banning", "Beaumont", "Bellflower", "Bermuda Dunes", "Beverly Hills", "Big Bear City", "Big Bear Lake", "Blue Jay", "Bonsall", "Brea", "Buena Park", "Burbank", "Calabasas", "Camarillo", "Canoga Park", "Canyon Country", "Carlsbad", "Carson", "Castaic", "Cathedral City", "Cedar Glen", "Cerritos", "Chatsworth", "Chino", "Claremont", "Colton", "Corona", "Corona Del Mar", "Costa Mesa", "Covina", "Crestline", "Desert Hot Springs", "Downey", "Encino", "Escondido", "Fallbrook", "Fawnskin", "Fillmore", "Fontana", "Fountain Valley", "Fullerton", "Garden Grove", "Glendale", "Glendora", "Granada Hills", "Hacienda Heights", "Harbor City", "Hawthorne", "Helendale", "Hemet", "Hesperia", "Hidden Hills", "Highland", "Huntington Beach", "Idyllwild", "Inglewood", "Joshua Tree", "LADERA RANCH", "La Crescenta", "La Habra", "La Habra Heights", "La Palma", "La Puente", "Laguna Beach", "Laguna Hills", "Laguna Woods", "Lake Arrowhead", "Lake Elsinore", "Lake Forest", "Lake Los Angeles", "Lakewood", "Lancaster", "Lomita", "Lompoc", "Long Beach", "Los Angeles", "Malibu", "Marina Del Rey", "Menifee", "Mission Viejo", "Monrovia", "Montclair", "Monterey Park", "Moreno Valley", "Mount Baldy", "Murrieta", "Newhall", "Newport Beach", "North Hills", "Northridge", "Oceanside", "Ojai", "Ontario", "Orange", "Oxnard", "Pacific Palisades", "Palm Springs", "Palmdale", "Palomar Mountain", "Pasadena", "Perris", "Phelan", "Pico Rivera", "Placentia", "Pomona", "Port Hueneme", "Porter Ranch", "Quail Valley", "Rancho Cucamonga", "Rancho Mirage", "Rancho Palos Verdes", "Rancho Santa Margarita", "Redlands", "Rialto", "Rimforest", "Rimrock", "Riverside", "Rosemead", "Rowland Heights", "San Bernardino", "San Clemente", "San Dimas", "San Jacinto", "San Juan Capistrano", "San Marcos", "San Pedro", "Santa Ana", "Santa Barbara", "Santa Clarita", "Santa Monica", "Saugus", "Sherman Oaks", "Simi Valley", "Solvang", "Sun City", "Sylmar", "Temecula", "Thousand Oaks", "Topanga", "Torrance", "Trabuco Canyon", "Twentynine Palms", "Twin Peaks", "Valencia", "Valley Center", "Valley Village", "Van Nuys", "Venice", "Ventura", "Victorville", "Vista", "Warner Springs", "West Covina", "West Hills", "West Hollywood", "Westlake Village", "Westminster", "Whittier", "Woodland Hills", "Yorba Linda", "Yucaipa", "Yucca Valley"
];

var citySelect = document.getElementById('city');

cities.forEach(function(city) {
	var option = document.createElement('option');
	option.text = city;
	citySelect.add(option);
});
