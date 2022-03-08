//Current Time Code

function currentTimeInfo(timestamp) {
	let date = new Date(timestamp);
	let currentHour = date.getHours();
	let currentMinute = date.getMinutes();
	if (currentMinute < 10) {
		currentMinute = `0${currentMinute}`;
	}
	let currentDay = date.getDay();
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	let day = days[currentDay];
	return `${day} ${currentHour}:${currentMinute}`;
}

function showCityTemperature(response) {
	celsiusTemp = Math.round(response.data.main.temp);
	let time = response.data.dt * 1000;
	let timezone = response.data.timezone * 1000;
	let localTime = currentTimeInfo(time + timezone);
	windSpeed = Math.round((response.data.wind.speed * 3600) / 1000);
	let conditions = response.data.weather[0].description;
	let icon = response.data.weather[0].icon;
	let humidity = response.data.main.humidity;
	celsiusFeelsTemp = Math.round(response.data.main.feels_like);
	document.querySelector("#current-temp").innerHTML = `${celsiusTemp}°C`;
	document.querySelector("#current-city").innerHTML = response.data.name;
	document.querySelector("#wind-speed").innerHTML = `Winds ${windSpeed}kmph`;
	document.querySelector("#description").innerHTML = `${conditions}`;
	document
		.querySelector("#icon")
		.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
	document.querySelector("#date").innerHTML = `Local Time: ${localTime}`;
	document.querySelector("#humidity").innerHTML = `Humidity ${humidity}%`;
	document.querySelector(
		"#feels-like"
	).innerHTML = `Feels Like ${celsiusFeelsTemp}°C`;
	console.log(response.data);
}

function search(city) {
	let apiKey = "6b7e90e39996fee5720a5b5f0d132e9e";
	let apiURLCityName = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
	axios.get(apiURLCityName).then(showCityTemperature);
}

function getSearchCityData(event) {
	event.preventDefault();
	let inputCity = document.querySelector("#search-input");
	search(inputCity.value);
}

let searchCity = document.querySelector("#city-search");
searchCity.addEventListener("submit", getSearchCityData);

//Finds current location weather updates via ticking checkbox

function findGeoLocationData(position) {
	let apiKey = "6b7e90e39996fee5720a5b5f0d132e9e";
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;
	let apiURLCoordinates = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
	console.log(apiURLCoordinates);
	axios.get(apiURLCoordinates).then(showCityTemperature);
}

function findGeoLocation(event) {
	event.preventDefault();
	if (this.checked) {
		navigator.geolocation.getCurrentPosition(findGeoLocationData);
	}
}

let currentLocationCheckBox = document.querySelector(
	"input[id=flexCheckDefault]"
);
currentLocationCheckBox.addEventListener("change", findGeoLocation);

//Conversion between Celsius & Fahrenheit

function changeToCelsius() {
	let showcelsiusTemp = document.querySelector("#current-temp");
	let showCelsiusFeelsTemp = document.querySelector("#feels-like");
	let showWindSpeedMetric = document.querySelector("#wind-speed");
	showcelsiusTemp.innerHTML = `${celsiusTemp}°C`;
	showCelsiusFeelsTemp.innerHTML = `Feels like ${celsiusFeelsTemp}°C`;
	showWindSpeedMetric.innerHTML = `Winds ${windSpeed}kmph`;
	console.log(showWindSpeedMetric);
}

function changetoFahrenheit() {
	let fahrenheitTemp = document.querySelector("#current-temp");
	let fahrenheitFeelsTemp = document.querySelector("#feels-like");
	let windSpeedImperial = document.querySelector("#wind-speed");
	fahrenheitTemp.innerHTML = `${Math.round((celsiusTemp * 9) / 5 + 32)}°F`;
	fahrenheitFeelsTemp.innerHTML = `Feels like ${Math.round(
		(celsiusFeelsTemp * 9) / 5 + 32
	)}°F`;
	windSpeedImperial.innerHTML = `Winds ${Math.round(windSpeed * 0.621371)}mph`;
	console.log(windSpeedImperial);
}

let celsiusRadioButton = document.querySelector("#flexRadioDefault1");
celsiusRadioButton.addEventListener("click", changeToCelsius);

let celsiusTemp = null;
let celsiusFeelsTemp = null;
let windSpeed = null;

let fahrenheitRadioButton = document.querySelector("#flexRadioDefault2");
fahrenheitRadioButton.addEventListener("click", changetoFahrenheit);

search("New York");
