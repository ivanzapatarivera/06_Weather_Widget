$(document).ready(function() {

var submit = $('.submitSearch');
var deposit = $('.searchDeposit');
var searchCity = $('#searchCity');
var labelCityClass = $('.labelCity');
var searchState = $('#searchState');
var labelStateClass = $('.labelState');
var clearSearch = $('.clearSearch');


// Establishes Event Listener Function
submit.on('click', function(){
var city = searchCity.val();
var country = searchState.val();
    apiAJAXCall(city, country);
    appendCity();
    location.reload();
})

// Clears Local Storage and Searches
clearSearch.on('click', function(){
    localStorage.clear(); 
    deposit.value = "";
    location.reload();
})


// Create City, ST object with array
var cityObj = {
    cityArray: [],
    stateArray: [],
};

// Appends City value into top bar
var searchCityST;
function appendCity() {

    searchCityST = searchCity.val() + ", " + searchState.val();

        event.preventDefault();
        deposit.append('<div class="d-inline ml-4 resultCity">' + searchCityST + '</div>');

    var result = searchCityST;
        result = result + "-";


        cityObj.cityArray.push(searchCity.val());
        cityObj.stateArray.push(searchState.val());

        // Adds searched city into local storage and call AJAX with these values
        addLocalStorage();
        apiAJAXCall();
}

// Creates key and value with array within object (multiple city entries)
function addLocalStorage() {
    event.preventDefault();

    var keyA = labelCityClass.parent().attr("id");
    var keyB = labelStateClass.parent().attr("id");

    var key = keyA + keyB;
    var value = searchCityST + "-";

    if (localStorage.getItem(key)){
        var addCity = localStorage.getItem(key) + value
        localStorage.setItem(key, addCity);
    } else {
        localStorage.setItem(key, value);
    }
}

// Append recent searches onto top bar
 var oldKeyValue = localStorage.getItem('cityState')
    oldKeyValue = oldKeyValue.split('-');
    for (var i = 0; i < oldKeyValue.length; i++) {
    deposit.append('<div class="d-inline ml-4 resultCity">' + oldKeyValue[i] + '</div>');
    }
    

// Retrieve the value of the last search
if (oldKeyValue) {
var localStorageArray = [];
    localStorageArray = oldKeyValue;
    localStorageArray.pop();

// Deleted the last item of the array as to obtain last city that was searched and 
// stored in local storage
var lastLocalStorageResult = localStorageArray.pop();

    // Split the last items inside the array to divide them into the two values needed for the API call
    lastLocalStorageResult = lastLocalStorageResult.split(", ");

    // Asks the forecast box with current weather and forecast to be displayed and the welcome logo to be hidden
    if (lastLocalStorageResult) {
        $('.forecastBox').show();
        $('.placeholderBox').hide();
    }

    apiAJAXCall(lastLocalStorageResult[0], lastLocalStorageResult[1]);

} 

var resultCity = $('.resultCity');

resultCity.on('click', function() {
    // event.preventDefault(); Commented it as it was causing problems loading weather data

    // Query URL to pull city data
    var resultCity = $('.resultCity');
    var cityName = $('.cityName');

    
    // Created array to get values from search entries
    var cityStateArray = []; 


    // Separate values of search entry, split into different values and push into the array
    var resultCityText = $(this).text();
        resultCityText = resultCityText.split(", ");
        cityStateArray.push(resultCityText);


        // Empty and display previous and current searched values
        cityName.empty().append(resultCityText[0] + ", " + resultCityText[1]);



        // Creates apiAJAXcall function call
        apiAJAXCall(resultCityText[0], resultCityText[1]);

        // Console log for cityStateArray 


})
 
function generateBackground(bgUrl){
    $('body').css('background-image', bgUrl);
    $('body').css('background-position', 'center center');
    $('body').css('background-attachment', 'fixed');
    $('body').css('background-repeat', 'no-repeat');
    $('body').css('background-size', 'cover');

}
// AJAX Call
function apiAJAXCall(city, country) {

var apiKey = '3f0e791b672eddc26b02cdefef533281';
var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + "," + country + '&appid=' + apiKey;
// api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid={your api key}  API to be followed for city and state (US only) or country code

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(currentWeather){

    var lonLat = $('.lonLat');
    var uvIndex = $('.uvIndex');
    var cityDate = $('.cityDate');
    var currentMain = $('.currentMain');
    var currentIcon = $('.currentIcon');
    var temperature = $('.temperature');
    var humidity = $('.humidity');
    var tempmax = $('.tempmax');
    var tempmin = $('.tempmin');
    var feelslike = $('.feelslike');
    var windSpeed = $('.windSpeed');
    var cityName = $('.cityName');



        // Establishing City and State/Country    
        var countryCurrentWeather = currentWeather.sys.country;


        var cityNameCurrentWeather = currentWeather.name;


        var cityCountry = cityNameCurrentWeather + ", " + countryCurrentWeather;

        cityName.empty().append(cityCountry);

    
        // Establishing longitude and latitude for API UV Index
        var lonLatArray = [];

            // Establishing longitude
            longitude = (JSON.stringify(currentWeather.coord.lon));
    
            lonLatArray.push(longitude);
            // lon.empty().append("Longitude: " + longitude);
            
            // Establishing latitude
            latitude = (JSON.stringify(currentWeather.coord.lat));
    
            lonLatArray.push(latitude);
            lonLat.empty().append("Longitude: " + longitude + " " + " - " + " " + "Latitude: " + latitude);

        // Checking and verifying lonLatArray values
    
        var lonVal = lonLatArray[0];
        var latVal = lonLatArray[1];

        // Consoling lonVal and latVal values
    
    


        // Establishing Date 
    
        var dateGMT = new Date(currentWeather.dt * 1000);
    
    
        var dateDifference = (currentWeather.timezone);

        // Setting local time
        var dateLocal = (dateGMT + dateDifference)
            dateLocal = dateLocal.split("G");
            dateLocal = dateLocal[0];
    
        cityDate.empty().append(dateLocal);


        // Establishing Currrent Weather Conditions and Icon
    
        var main = currentWeather.weather[0].main;
    
        // currentMain.append(main);

        
        // Setting up background image conditionals depending on the current weather 
        // conditions of the city that has been searched
        if (main === "Clouds") {
            generateBackground('url(assets/images/clouds.jpg)');
        }

        if (main === "Clear") {
            generateBackground('url(assets/images/clear.jpg)');
        }

        if (main === "Thunderstorm") {
            generateBackground('url(assets/images/thunderstorms.jpg)');
        }

        if (main === "Drizzle") {
            generateBackground('url(assets/images/drizzle.jpg)');  
        }

        if (main === "Rain") {
            generateBackground('url(assets/images/rain.jpg)');
        }

        if (main === "Snow") {
            generateBackground('url(assets/images/snow.jpg)');
        }

        if (main === "Snow") {
            generateBackground('url(assets/images/clear.jpg)');
        } 

        if (main === "Mist") {
            generateBackground('url(assets/images/mist.jpg)');
        } 

        if (main === "Smoke") {
            generateBackground('url(assets/images/smoke.jpg)');   
        } 

        if (main === "Haze") {
            generateBackground('url(assets/images/haze.jpg)');
        } 

        if (main === "Dust") {
            generateBackground('url(assets/images/dust.jpg)');
        } 

        if (main === "Ash") {
            generateBackground('url(assets/images/ashes.jpg)');   
        } 

        if (main === "Squall") {
            generateBackground('url(assets/images/squall.jpg)');
        } 

        if (main === "Tornado") {
            generateBackground('url(assets/images/tornado.jpg)');  
        } 
        
        //Setting up logo and current weather data
    
        var description = currentWeather.weather[0].description;
    
            currentMain.empty().append("The current weather conditions are" + '<br>' + main + " with " + description + ".");

    
        var icon = currentWeather.weather[0].icon;
        var iconURL = "https://openweathermap.org/img/w/" + icon + ".png";
    
    
            currentIcon.empty().append('<img src="' + iconURL + '" style="height: 75px; width: auto;">');


        // Setting temperature and humidity
    
        var temp = currentWeather.main.temp;
        var tempConversion = Math.round((9 / 5) * (temp - 273) + 32) + "°F";
    
            temperature.empty().append("Current temperature: " + tempConversion);

        var feels_like = currentWeather.main.feels_like;
    
        var flConversion = Math.round((9 / 5) * (feels_like - 273) + 32) + "°F";
    
            feelslike.empty().append("Feels like: " + flConversion);

        var max = currentWeather.main.temp_max;
    
        var maxConversion = Math.round((9 / 5) * (max - 273) + 32) + "°F";
    
            tempmax.empty().append("Maximum Temperature: " + maxConversion);

        var min = currentWeather.main.temp_min;
    
        var minConversion = Math.round((9 / 5) * (min - 273) + 32) + "°F";
    
            tempmin.empty().append("Minimum Temperature: " + minConversion);

        var humidityP = (currentWeather.main.humidity) + "%";
    
            humidity.empty().append("Humidity: " + humidityP);
        
        // Converting wind speed from kts to mph
        var wind = (currentWeather.wind.speed);
            wind = Math.round(wind * 1.15078);
        var windDirection = (currentWeather.wind.deg);


            // Conditionals to determine wind direction
            if (windDirection > 27 && windDirection < 72) {
                windDirection = "Northeast (NE) at ";
        
                windSpeed.empty().append(windDirection + wind + " mph");
            } else if (windDirection > 71 && windDirection < 117) {
                windDirection = "East (E) at ";
        
                windSpeed.empty().append(windDirection + wind + " mph");
            } else if (windDirection > 116 && windDirection < 162) {
                windDirection = "Southeast (SE) at ";
        
                windSpeed.empty().append(windDirection + wind + " mph");
            } else if (windDirection > 161 && windDirection < 207) {
                windDirection = "South (S) at ";
        
                windSpeed.empty().append(windDirection + wind + " mph");
            } else if (windDirection > 206 && windDirection < 252) {
                windDirection = "Southwest (SW) at ";
        
                windSpeed.empty().append(windDirection + wind + " mph");
            } else if (windDirection > 251 && windDirection < 297) {
                windDirection = "Southeast (SE) at ";
        
                windSpeed.empty().append(windDirection + wind + " mph");
            } else if (windDirection > 296 && windDirection < 337) {
                windDirection = "Northwest (SE) at ";
        
                windSpeed.empty().append(windDirection + wind + " mph");
            } else {
                windDirection = "North (N) at ";
        
                windSpeed.empty().append(windDirection + wind + " mph");
            }

    
    

            

    // Calling for UV query URL 
        var apiKey = '3f0e791b672eddc26b02cdefef533281';
        var queryURLuv = 'https://api.openweathermap.org/data/2.5/uvi?lat=' + latVal + '&lon=' + lonVal + '&appid=' + apiKey;
    
            $.ajax({
                url: queryURLuv,
                method: "GET"
            }).then(function(UV) {
        
                uvIndex.empty().append('UV Index: ' + UV.value);


                if (UV.value > 8.99) {
                    $('.uvIndex').attr('style', 'color: red;');
                } else if (UV.value > 6.99) {
                    $('.uvIndex').attr('style', 'color: orange;');
                } else if (UV.value > 4.99) {
                    $('.uvIndex').attr('style', 'color: yellow;');
                } else {
                    $('.uvIndex').attr('style', 'color: cyan;');
                }

            })

            // Callin for Weather Forecast (One Call API)
            var queryURLForecast = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latVal + '&lon=' + lonVal + '&appid=' + apiKey;

            $.ajax({
                url: queryURLForecast,
                method: "GET"
            }).then(function(forecast) {
        

                var dayArray = []
                var weatherArray = []
                var iconArray = []
                var tempMaxArray = []
                var tempMinArray = []
                var humidityArray = []

                for (i = 1; i < 7; i++) {
                    // #1 Day
                    var day = (new Date(forecast.daily[i].dt * 1000)) + ''; 
                        day = day.split(" ");
                        day = day[0];
                        dayArray.push(day);
                    // #2 Weather
                    var weather = forecast.daily[i].weather[0].main + " and " + forecast.daily[i].weather[0].description;
                        weatherArray.push(weather);          
                    // #3 icon
                    var icon = forecast.daily[i].weather[0].icon;
                    var iconURL = "https://openweathermap.org/img/w/" + icon + ".png";
                        iconURL = '<img src="' + iconURL + '" style="height: 75px; width: auto;">'
                        iconArray.push(iconURL);
                        // currentIcon.empty().append('<img src="' + iconURL + '" style="height: 75px; width: auto;">');
                    // #4 Temperature Max
                    var tempMax = forecast.daily[i].temp.max;
                        tempMax = "Max. temperature: " + Math.round((9 / 5) * (tempMax - 273) + 32) + "°F";
                        tempMaxArray.push(tempMax);
                    // #6 Tempearture min
                    var tempMin = forecast.daily[i].temp.min;
                        tempMin = "Min. temperature: " + Math.round((9 / 5) * (tempMin - 273) + 32) + "°F";
                        tempMinArray.push(tempMin);
                    // #7 Humidity level
                    var humidity = forecast.daily[i].humidity;
                        humidity = "Humidity: " + humidity + "%";
                        humidityArray.push(humidity);
                    var humidityVal = forecast.daily[i].humidity;
                    }
                
                //Appending Day Name of Forecast
                $('#day1').empty().append(dayArray[0]);
                $('#day2').empty().append(dayArray[1]);
                $('#day3').empty().append(dayArray[2]);
                $('#day4').empty().append(dayArray[3]);
                $('#day5').empty().append(dayArray[4]);
                $('#day6').empty().append(dayArray[5]);

                // Appending Weather Conditions on Forecast
                $('#weather1').empty().append(weatherArray[0]);
                $('#weather2').empty().append(weatherArray[1]);
                $('#weather3').empty().append(weatherArray[2]);
                $('#weather4').empty().append(weatherArray[3]);
                $('#weather5').empty().append(weatherArray[4]);
                $('#weather6').empty().append(weatherArray[5]);

                // Appending icon for the day of forecast
                $('#icon1').empty().append(iconArray[0]);
                $('#icon2').empty().append(iconArray[1]);
                $('#icon3').empty().append(iconArray[2]);
                $('#icon4').empty().append(iconArray[3]);
                $('#icon5').empty().append(iconArray[4]);
                $('#icon6').empty().append(iconArray[5]);

                // Appending the Maximum Temperature for the date forecasted
                $('#tempMax1').empty().append(tempMaxArray[0]);
                $('#tempMax2').empty().append(tempMaxArray[1]);
                $('#tempMax3').empty().append(tempMaxArray[2]);
                $('#tempMax4').empty().append(tempMaxArray[3]);
                $('#tempMax5').empty().append(tempMaxArray[4]);
                $('#tempMax6').empty().append(tempMaxArray[5]);

                // Appending the Minimum Temperature for the date forecasted
                $('#tempMin1').empty().append(tempMinArray[0]);
                $('#tempMin2').empty().append(tempMinArray[1]);
                $('#tempMin3').empty().append(tempMinArray[2]);
                $('#tempMin4').empty().append(tempMinArray[3]);
                $('#tempMin5').empty().append(tempMinArray[4]);
                $('#tempMin6').empty().append(tempMinArray[5]);

                // Appending the humidity values for the date forecasted
                $('#humidity1').empty().append(humidityArray[0]);
                $('#humidity2').empty().append(humidityArray[1]);
                $('#humidity3').empty().append(humidityArray[2]);
                $('#humidity4').empty().append(humidityArray[3]);
                $('#humidity5').empty().append(humidityArray[4]);
                $('#humidity6').empty().append(humidityArray[5]);


                var newsBrief = '<h1 class="pt-5 newsBrief text-center">' + 'Forecast for <br>' + cityCountry + '</h1>' + '<p class="mt-5">' + main + ' conditions are expected with the possibility of ' + description + '.</p> <p>Today\'s temperature may rise to ' + maxConversion + '. Tonight, it may drop to ' + minConversion + '. </p> <p> However, the temperature may feel around ' + flConversion + ' to human touch, so plan accordingly for any outdoor activities. This is due to the level of humidity forecasted for today, which is measured at around ' + humidityVal + '%. </p> <p>If you wish to plan ahead, please refer to the cards below with the weather outlook for the next five days.</p> <h5>Have a pleasant day and wish you a great week ahead!</h5>';
                $('.newsBrief').empty().append(newsBrief);

                

    })
      
  });


}



})