function currentTimeInfo(timestamp) {
	let date = new Date(timestamp);
	let currentHour = date.getHours();
	let currentMinute = date.getMinutes();
	if (currentMinute < 10) {
		currentMinute = `0${currentMinute}`;
	}
	let currentDay = date.getDay();
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let day = days[currentDay];
	return `${day} ${currentHour}:${currentMinute}`;
}

function formatDate(timestamp) {
	let date = new Date(timestamp);

	let currentDay = date.getDay();
	let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
	let day = days[currentDay];
	return `${day}`;
}

function displayForecastImperial(response) {
	let forecast = response.data.daily;
	let showForecast = document.querySelector("#forecast");
	let forecastHTML = `<div class="row">`;

	forecast.forEach(function (day, index) {
		let date = formatDate(day.dt * 1000);
		celsiusHighTemp = Math.round(day.temp.max);
		celsiusLowTemp = Math.round(day.temp.min);
		if (index < 6) {
			forecastHTML =
				forecastHTML +
				`				<div class="col-2 forecast-day" >
          				<h5 class="day-of-week">${date}</h5>
            			<img src = "http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"/>
              			<div class="high-temp" id="high-temp"> ${celsiusHighTemp}°F  </div>
              			<div class="low-temp">  ${celsiusLowTemp}°F    </div>
            		</div>`;
		}
	});

	forecastHTML = forecastHTML + `</div>`;

	showForecast.innerHTML = forecastHTML;
}

function displayForecast(response) {
	let forecast = response.data.daily;
	let showForecast = document.querySelector("#forecast");
	let forecastHTML = `<div class="row">`;

	forecast.forEach(function (day, index) {
		let date = formatDate(day.dt * 1000);
		celsiusHighTemp = Math.round(day.temp.max);
		celsiusLowTemp = Math.round(day.temp.min);
		if (index < 6) {
			forecastHTML =
				forecastHTML +
				`				<div class="col-2 forecast-day" >
          				<h5 class="day-of-week">${date}</h5>
            			<img src = "http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"/>
              			<div class="high-temp" id="high-temp"> ${celsiusHighTemp}°C  </div>
              			<div class="low-temp">  ${celsiusLowTemp}°C    </div>
            		</div>`;
		}
	});

	forecastHTML = forecastHTML + `</div>`;

	showForecast.innerHTML = forecastHTML;
}

function changeToMetric() {
	let showcelsiusTemp = document.querySelector("#current-temp");
	let showCelsiusFeelsTemp = document.querySelector("#feels-like");
	let showWindSpeedMetric = document.querySelector("#wind-speed");
	showcelsiusTemp.innerHTML = `${celsiusTemp}°C`;
	showCelsiusFeelsTemp.innerHTML = `Feels like ${celsiusFeelsTemp}°C`;
	showWindSpeedMetric.innerHTML = `Winds ${windSpeed}kmph`;
	let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latCoordinates}&lon=${lonCoordinates}&appid=${apiKey}&units=metric`;
	axios.get(api).then(displayForecast);
}

function changetoImperial() {
	let fahrenheitTemp = document.querySelector("#current-temp");
	let fahrenheitFeelsTemp = document.querySelector("#feels-like");
	let windSpeedImperial = document.querySelector("#wind-speed");
	fahrenheitTemp.innerHTML = `${Math.round((celsiusTemp * 9) / 5 + 32)}°F`;

	fahrenheitFeelsTemp.innerHTML = `Feels like ${Math.round(
		(celsiusFeelsTemp * 9) / 5 + 32
	)}°F`;
	windSpeedImperial.innerHTML = `Winds ${Math.round(windSpeed * 0.621371)}mph`;
	getForecastImperial([latCoordinates, lonCoordinates]);
}

function getForecast(coordinates) {
	latCoordinates = coordinates.lat;
	lonCoordinates = coordinates.lon;
	let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latCoordinates}&lon=${lonCoordinates}&appid=${apiKey}&units=metric`;
	axios.get(api).then(displayForecast);
}

function getForecastImperial(coordinates) {
	let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latCoordinates}&lon=${lonCoordinates}&appid=${apiKey}&units=Imperial`;
	axios.get(api).then(displayForecastImperial);
}

function showCityWeatherInfo(response) {
	celsiusTemp = Math.round(response.data.main.temp);
	let time = response.data.dt * 1000;

	let lastUpdated = currentTimeInfo(time);
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
	document.querySelector("#date").innerHTML = `Last Updated: ${lastUpdated}`;
	document.querySelector("#humidity").innerHTML = `Humidity ${humidity}%`;
	document.querySelector(
		"#feels-like"
	).innerHTML = `Feels Like ${celsiusFeelsTemp}°C`;

	getForecast(response.data.coord);

	document.getElementById("flexRadioDefault1").checked = true;
}

function search(city) {
	let apiURLCityName = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
	axios.get(apiURLCityName).then(showCityWeatherInfo);
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
	axios.get(apiURLCoordinates).then(showCityWeatherInfo);
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

let celsiusRadioButton = document.querySelector("#flexRadioDefault1");
celsiusRadioButton.addEventListener("change", changeToMetric);

let celsiusTemp = null;
let celsiusFeelsTemp = null;
let windSpeed = null;
let celsiusHighTemp = null;
let celsiusLowTemp = null;
let latCoordinates = null;
let lonCoordinates = null;

let apiKey = "6b7e90e39996fee5720a5b5f0d132e9e";

let fahrenheitRadioButton = document.querySelector("#flexRadioDefault2");
fahrenheitRadioButton.addEventListener("change", changetoImperial);

search("New York");
