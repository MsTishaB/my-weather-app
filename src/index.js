//Current Time Code

function currentTimeInfo(date) {
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

let date = document.querySelector("#date");

let currentDate = new Date();
date.innerHTML = currentTimeInfo(currentDate);

function showCityTemperature(response) {
	document.querySelector("#current-temp").innerHTML = `${Math.round(
		response.data.main.temp
	)}°C`;
	document.querySelector("#current-city").innerHTML = response.data.name;
	document.querySelector("#wind").innerHTML = `${Math.round(
		response.data.wind.speed
	)} mph`;
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

//Conversion between Celcius & Fahrenheit

//function changeToCelsius() {
//let celsiusTemp = document.querySelector("#current-temp");
//	celsiusTemp.innerHTML = "1°C";
//}

//function changetoFahrenheit() {
//	let fahrenheitTemp = document.querySelector("#current-temp");
//	fahrenheitTemp.innerHTML = "34°F";
//}

//let celsiusRadioButton = document.querySelector("#flexRadioDefault1");
//celsiusRadioButton.addEventListener("click", changeToCelsius);

//let fahrenheitRadioButton = document.querySelector("#flexRadioDefault2");
//fahrenheitRadioButton.addEventListener("click", changetoFahrenheit);

search("New York");