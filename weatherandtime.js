const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const utf8 = require("utf8");
const apiKey = "0a66000ee16210d9cffcde19fa27a62a";
const cityNames = [
	"./weather New York",
	"10005",
	"Tokyo",
	"São Paulo",
	"Pluto",
];

function sendRequest(cityName) {
	let request = new XMLHttpRequest();
	const apiLink = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${apiKey}`;
	request.open("GET", apiLink);
	request.onload = () => {
		try {
			manageRequest(request, cityName);
		} catch(error) {
			console.log(error);
		}
	}
	request.send();
}

function manageRequest(request, cityName) {
	let weatherData = JSON.parse(request.responseText);
	if(request.status >= 200 && request.status < 400) {
		let temperature = weatherData.main.temp;
		console.log(`The temperature of ${utf8.decode(cityName)} is ${temperature}`)
	} else {
		console.log(`${cityName} doesn't exist! Kindly check`)
	}
}

function start() {
	for (var i = 0; i < cityNames.length; i++) {
		sendRequest(utf8.encode(cityNames[i]))
	}
}

start()