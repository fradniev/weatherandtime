const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const utf8 = require("utf8");
const apiKeyWeather = "0a66000ee16210d9cffcde19fa27a62a";
const apiKeyDate = "67baa1d6fec3468caed99152addfeb05";
const cityNames = [
	"./weather New York",
	"10005",
	"Tokyo",
	"São Paulo",
	"Pluto",
];

function requestWeather(cityName) {
	let request = new XMLHttpRequest();
	const apiLink = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${apiKeyWeather}`;
	request.open("GET", apiLink);
	request.onload = () => {
		try {
			manageRequestWeather(request, cityName);
		} catch(error) {
			console.log(error);
		}
	}
	request.send();
}

function manageRequestWeather(request, cityName) {
	let weatherData = JSON.parse(request.responseText);
	if(request.status >= 200 && request.status < 400) {
		let temperature = weatherData.main.temp;
		console.log(`The temperature of ${decodeURIComponent(cityName)} is ${temperature}`)
	} else {
		console.log(`${decodeURIComponent(cityName)} doesn't exist! Kindly check`)
	}
}

function requestDate(cityName) {
	let request = new XMLHttpRequest();
	const apiLink = `https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=${apiKeyDate}`;
	request.open("GET", apiLink);
	request.onload = () => {
		try {
			manageRequestDate(request, cityName);
		} catch(error) {
			console.log(`${decodeURIComponent(cityName)} doesn't exist! Kindly check`)
		}
	}
	request.send();
}

function manageRequestDate(request, cityName) {
	let dateData = JSON.parse(request.responseText);
	let timezone = dateData.results[0].annotations.timezone.offset_sec
	let date = new Date( new Date().getTime() + timezone*1000).toUTCString();
	console.log(`The date of ${decodeURIComponent(cityName)} is ${date}`)
}

function start() {
	for (var i = 0; i < cityNames.length; i++) {
		requestWeather(encodeURIComponent(cityNames[i]))
		requestDate(encodeURIComponent(cityNames[i]))
	}
}

start()