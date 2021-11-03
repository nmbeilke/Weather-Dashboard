// Variable Declarations //
var inputEl = document.querySelector("input[name=city")
var submitBtn = document.querySelector("#searchbtn")
var previousCitiesContainer = document.querySelector("#previous-cities")
var mainEl = document.querySelector("#main-card")
var forecast = document.querySelector("#forecast")
var formEl = document.querySelector("form")
cityButtons = []


// Function for everything //
function searchAndGenerateWeather(city) {

mainEl.innerHTML = ""
forecast.innerHTML = ""

var openWeathApiKey = "d91f911bcf2c0f925fb6535547a5ddc9"
var geoLocateCityURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + 
city + ",US&limit=5&appid=" +openWeathApiKey


fetch(geoLocateCityURL)
    .then(function(response) {
    return response.json()
    })
    .then(function(data) {
        var cityInfo = data[0]
        var getWeatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + 
        cityInfo.lat + "&lon=" +cityInfo.lon +
        "&exclude=minutely,hourly&units=imperial&appid=" + 
        openWeathApiKey

        fetch(getWeatherURL)
        .then(function(response) {
            return response.json()
        })
        .then(function(weatherData){
            console.log(weatherData)

            var cityNameEl = document.
            createElement("h2")
            cityNameEl.textContent = city.toUpperCase() + " "+
            moment.unix(weatherData.current.sunrise).format("MM/DD/YYYY")
            var weatherIcon = document.createElement("img")
            weatherIcon.setAttribute(
                "src",
                "https://openweathermap.org/img/w/" +
                weatherData.current.weather[0].icon +
                ".png"
            )
            
            cityNameEl.append(weatherIcon)
            mainEl.append(cityNameEl)

            var cityWeatherList = document.
            createElement("ul")

            var temp = document.createElement
            ("li")
            temp.textContent = "Temp: " + 
            weatherData.current.temp + " F"
            cityWeatherList.append(temp)

            var wind = document.createElement
            ("li")
            wind.textContent =
            "Wind speed: " + weatherData.current.wind_speed + " mph"
            cityWeatherList.append(wind)

            var humidity = document.createElement
            ("li")
            var humidity = document.createElement("li")
            humidity.textContent =
              "Humidty: " + weatherData.current.humidity + "%"
            cityWeatherList.append(humidity)

            var uvi = document.createElement
            ("li")
            uvi.textContent = "UV index: " + 
            weatherData.current.uvi
            cityWeatherList.append(uvi)

            mainEl.append(cityWeatherList)


// Extended Forecast Section //
            var forecastTitle = document.
            createElement("h2")
            forecastTitle.textContent = "5 day forecast"
            forecast.append(forecastTitle)

            for (var i = 0; i < 5; i++) {
                var dayXWeather = weatherData.daily[i]
                var dayXWeatherCard = document.createElement("ul")
                
                var date = moment.unix(dayXWeather.sunrise).format("MM/DD/YYYY")
            
                dayXWeatherCard.append(date)
                var weatherIcon = document.createElement("img")
                weatherIcon.setAttribute(
                    "src",
                    "https://openweathermap.org/img/w/" +
                    dayXWeather.weather[0].icon +
                    ".png"
                )
                dayXWeatherCard.append(weatherIcon)
                
                var temp = document.createElement("li");
                temp.textContent = "Temp: " + dayXWeather.temp.day + " F";
                dayXWeatherCard.append(temp);
    
                var wind = document.createElement("li");
                wind.textContent = "Wind speed: " + dayXWeather.wind_speed + " mph";
                dayXWeatherCard.append(wind);
    
                var humidity = document.createElement("li");
                humidity.textContent = "Humidty: " + dayXWeather.humidity + "%";
                dayXWeatherCard.append(humidity);
    
                forecast.append(dayXWeatherCard);
              }
            })
        })
    }
//Event Listeners and Previous Cities Buttons//
formEl.addEventListener("click", function (e) {
    e.preventDefault()
    var searchValue = inputEl.value.trim()

    if(!searchValue) {
        return
    }

    cityButtons.push(searchValue)
    searchAndGenerateWeather(searchValue)
    makeButtons()
})

function initalLoad() {
    var previousCitiesButtons = localStorage.getItem("previousCities")
    if (previousCitiesButtons) {
        cityButtons = JSON.parse(previousCitiesButtons)
        makeButtons()
    }
}

function makeButtons() {
    for (var i = 0; i < cityButtons.length; i++) {
        const city = cityButtons[i]
        var newBtn = document.createElement("button")

        newBtn.textContent = city
        newBtn.setAttribute("data-value", city)
        newBtn.setAttribute("class", "btn btn-outline-secondary btn-sm")

        newBtn.addEventListener("click", function () {
            var SearchCity = this.getAttribute("data-value")
            searchAndGenerateWeather(SearchCity)
        })
        previousCitiesContainer.append(newBtn)
    }

    console.log(cityButtons)
    localStorage.setItem("previousCities", JSON.stringify(cityButtons))
}

initalLoad()
