// This Show Local Weather App will discover the website user's location with https://ipinfo.io, then query the
// http://openweathermap.org API for current weather at that location, and displays the results.

// get DOM references. 
var displayCity = document.getElementById("city");
var displayCountry = document.getElementById("country");
var displayTemperature = document.getElementById("temperature");
var displayDegreeAndUnit = document.getElementById("degreeAndUnit");
var displayHumidity = document.getElementById("humidity");
var displayConditions = document.getElementById("conditions");
var displayWinds = document.getElementById("winds");
var displayPressure = document.getElementById("pressure");
var displaySunrise = document.getElementById("sunrise");
var displaySunset = document.getElementById("sunset");
var button = document.getElementById("units");
var iconSrc = document.getElementById("currentIcon");

// declare variables.
var backgroundPicture = "assets/clouds.jpg"; // default background picture
var currentUnits = "imperial"; // set default measurement system to imperial.
var pressureSymbol = "mb"; // set default pressure units.
var tempSymbol = "F"; // set default temperature units.
var windSymbol = "mph"; // set default wind speed units.
var userLocalTime = Math.round(+new Date() / 1000);
var tempTime = 0;
var cityName = "";
var regionName = "";
var countryName = "";
var locString = "";
var latitude = "";
var longitude = "";
var temperature = "";
var windSpeed = "";
var windDirection = "";
var humidity = "";
var pressure = "";
var sunrise = "";
var sunset = "";
var currentWeather = "";
var weatherIcon = "";
var iconURL = "";
var backgroundURL = "";
var convertLocalTime = 0;
var convertSunrise;
var convertSunset;

// convert degrees to cardinal directions.
function degreeToCardinal(degree) {
        if (degree > 337.5 && degree < 22.5) {
            return "N";
        } else if (degree > 22.5 && degree < 67.5) {
            return "NE";
        } else if (degree > 67.5 && degree < 112.5) {
            return "E";
        } else if (degree > 112.5 && degree < 157.5) {
            return "SE";
        } else if (degree > 157.5 && degree < 202.5) {
            return "S";
        } else if (degree > 202.5 && degree < 247.5) {
            return "SW";
        } else if (degree > 247.5 && degree < 292.5) {
            return "W";
        } else if (degree > 292.5 && degree < 337.5) {
            return "NW";
        }
}

// query openweather.org using latitude and longitude from getLocation function
function getWeather(latitude, longitude) {
    $.get("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=aa513b9fa0b09eb8f6106ba8d3a4f054&preventCache=" + new Date(), function (response) {
        
	// set variable from received data
        temperature = response.main.temp;
        humidity = response.main.humidity;
        pressure = response.main.pressure;
        windSpeed = response.wind.speed;
        windDirection = degreeToCardinal(response.wind.deg);
        currentWeather = response.weather[0].description;
        weatherIcon = currentWeather;
        // convert times
        convertLocalTime = unixTimeToLocal(userLocalTime);
        userLocalTime = convertLocalTime.toLocaleTimeString();
        convertSunrise = unixTimeToLocal(response.sys.sunrise);
        sunrise = convertSunrise.toLocaleTimeString();
        convertSunset = unixTimeToLocal(response.sys.sunset);
        sunset = convertSunset.toLocaleTimeString();
        temperature = Math.round(((temperature - 273) * 9/5) + 32);
        // update DOM
        displayTemperature.innerHTML = temperature;
        displayDegreeAndUnit.innerHTML = " &deg;" + tempSymbol;
        displayConditions.innerHTML = currentWeather.toUpperCase();
        displayHumidity.innerHTML = "Humidity: " + humidity + " %";
        displayWinds.innerHTML = "Wind: " + windDirection + " " + windSpeed + " " +windSymbol;
        displayPressure.innerHTML = "Barametric Pressure: " + pressure + " " + pressureSymbol;
        displaySunrise.innerHTML = "Sunrise: " + sunrise;
        displaySunset.innerHTML = "Sunset: " + sunset;

        // determine correct background and icon.
        switch (weatherIcon){
            case "clear sky":
                if (convertLocalTime > convertSunrise && convertLocalTime < convertSunset) {
                    iconURL = "assets/clear-sky-day.png";
                    backgroundPicture = "assets/clear-day.jpg";
                } else {
                    iconURL = "assets/clear-sky-night.png";
                    backgroundPicture = "assets/clear-night.jpg";
                }
                break;
                
            case "few clouds":
                if (convertLocalTime > convertSunrise && convertLocalTime < convertSunset) {
                    iconURL = "assets/few-clouds-day.png";
                    backgroundPicture = "assets/few-clouds-day.jpg";
                } else {
                    iconURL = "assets/few-clouds-night.png";
                    backgroundPicture = "assets/few-clouds-night.jpg";
                }
                break;
                
            case "scattered clouds":
                if (convertLocalTime > convertSunrise && convertLocalTime < convertSunset) {
                    iconURL = "assets/scattered-clouds-day.png";
                    backgroundPicture = "assets/scattered-clouds-day.jpg";
                } else {
                    iconURL = "assets/scattered-clouds-night.png";
                    backgroundPicture = "assets/few-clouds-night.jpg";
                }
                break;
                
            case "broken clouds":
                if (convertLocalTime > convertSunrise && convertLocalTime < convertSunset) {
                    iconURL = "assets/broken-clouds-day.png";
                    backgroundPicture = "assets/scattered-clouds-day.jpg";
                } else {
                    iconURL = "assets/broken-clouds-night.png";
                    backgroundPicture = "assets/few-clouds-night.jpg";
                }
                break;
                
            case "shower rain":

                    iconURL = "assets/shower-rain.png";
                    backgroundPicture = "assets/shower-rain.jpg";
                
                break;
                
            case "rain":
                if (convertLocalTime > convertSunrise && convertLocalTime < convertSunset) {
                    iconURL = "assets/rain-day.png";
                    backgroundPicture = "assets/rain-day.jpg";
                } else {
                    iconURL = "assets/rain-night.png";
                    backgroundPicture = "assets/rain-night.jpg";
                }
                break;
                
            case "thunderstorm":

                    iconURL = "assets/thunderstorm.png";
                    backgroundPicture = "assets/thunderstorm.jpg";
                
                break;
            
             case "snow":
                if (convertLocalTime > convertSunrise && convertLocalTime < convertSunset) {
                    iconURL = "assets/snow.png";
                    backgroundPicture = "assets/snow-day.jpg";
                } else {
                    iconURL = "assets/snow.png";
                    backgroundPicture = "assets/snow-night.jpg";
                }
                break;
            
            case "mist":
                if (convertLocalTime > convertSunrise && convertLocalTime < convertSunset) {
                    iconURL = "assets/mist-day.png";
                    backgroundPicture = "assets/mist-day.jpg";
                } else {
                    iconURL = "assets/mist-night.png";
                    backgroundPicture = "assets/mist-night.jpg";
                }
                break;
                
            default:
                iconURL = "assets/mist-day.png";
                backgroundPicture = "assets/mist-day.jpg";
        }
        
        // update background picture.
        document.getElementById("mainContainer").style.backgroundImage = "url("+backgroundPicture+")";
        iconSrc.src = iconURL;
    }, "jsonp");
}

// get user's location based on IP address.
function getLocation() {
    $.get("https://ipinfo.io", function (response) {
        cityName = response.city;
        regionName = response.region;
        countryName = response.country;
        locString = response.loc.split(",");
        latitude = Number(locString[0]);
        longitude = Number(locString[1]);
        // update DOM
        displayCity.innerHTML = cityName + ",";
        displayCountry.innerHTML = regionName + "  " + countryName;
            
        getWeather(latitude, longitude);
        

    }, "jsonp");
}
    
// function unixTimeToLocal() is passed unix time and returns the user's local time.
function unixTimeToLocal(unix) {
    var local = new Date(0);
    local.setUTCSeconds(unix);
    return local;
}

// function to toggle units.
function toggleUnits() {
    if (currentUnits === "metric") {
                
        //update variables to imperial.
        tempSymbol = 'F';
        windSymbol = 'miles/hour';
        currentUnits = 'imperial';
        pressureSymbol = 'mb';
        button.innerHTML = 'Use Metric Units';
        
        // convert temperature to 'fahrenheit'.
        temperature = Math.round((temperature * 9 / 5) + 32);       
        displayTemperature.innerHTML = temperature;
        displayDegreeAndUnit.innerHTML = " &deg;" + tempSymbol;
        
        // convert wind speed to 'miles/hr'.
        windSpeed = Math.round(windSpeed / 1.609344);               
        displayWinds.innerHTML = "Wind: " + windDirection + " " + windSpeed + " " + windSymbol;
        
        // convert pressure to 'mb'.
        pressure = pressure * 10;                                   
        displayPressure.innerHTML = "Barometric Pressure: " + pressure + " " + pressureSymbol;
    } else {
        
        // update variables to metric.
        tempSymbol = 'C';
        currentUnits = 'metric';
        windSymbol = 'km/hour';
        pressureSymbol = 'kPa';
        button.innerHTML = 'Use Imperial Units';
            
        // convert temperature to 'celsius'.
        temperature = Math.round((temperature - 32) * 5 / 9);       
        displayTemperature.innerHTML = temperature;
        displayDegreeAndUnit.innerHTML = " &deg;" + tempSymbol;
            
        // convert wind speed to 'Km/h'.
        windSpeed = Math.round(windSpeed * 1.609344);               
        displayWinds.innerHTML = "Wind: " + windDirection + " " + windSpeed + " " + windSymbol;
            
        // convert pressure to'KPa'.
        pressure = pressure / 10;                                   
        displayPressure.innerHTML = "Barometric Pressure: " + pressure + " " + pressureSymbol;
    }
}

// event listener for "units" button to toggle units.
document.getElementById("units").onclick = function() {
    toggleUnits();
};

// main program starting point.
getLocation();