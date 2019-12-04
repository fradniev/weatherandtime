const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const apiKeyWeather = "0a66000ee16210d9cffcde19fa27a62a";
const apiKeyDate = "67baa1d6fec3468caed99152addfeb05";
const cityNames = [
	"./weather New York",
	"10005",
	"Tokyo",
	"São Paulo",
	"Pluto",
];

function sendRequest(cityName) {
	const apiLinks = [
		`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${apiKeyWeather}`,
		`https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=${apiKeyDate}`,
	];
	manageRequest(apiLinks, cityName);
	
}

function manageRequest(apiLinks, cityName){
	let results = []
	const promises = apiLinks.map( (apiLink, index) => {
		return new Promise((resolve,reject) => {
			let request = new XMLHttpRequest();
			request.open("GET", apiLink);
			request.onload = () => {
				try {
					let requestJson = JSON.parse(request.responseText);
					if (index<1) {
						resolve(collectDataWeather(requestJson, cityName));
					} else {
						resolve(collectDataDate(requestJson, cityName));
					}
				} catch(error) {
					console.log(`${decodeURIComponent(cityName)} doesn't exist! Please check the city name.`)
				}
			}
			request.send();
		});
	});
	cityName = decodeURIComponent(cityName);
	Promise.all(promises).then(weatherAndTemperature => {
		console.log(`The temperature of ${cityName} is ${weatherAndTemperature[0]} C and the date is ${weatherAndTemperature[1]}`);
	});
}

function collectDataWeather(data, cityName) {
	let temperature = data.main.temp;
	return temperature;
}

function collectDataDate(data, cityName) {
	let timezone = data.results[0].annotations.timezone.offset_sec;
	let dateString = new Date( new Date().getTime() + timezone*1000).toUTCString();
	return dateString;
}

function start() {
	cityNames.map( cityName => {sendRequest(encodeURIComponent(cityName))});
}

start();