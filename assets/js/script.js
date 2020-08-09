$(document).ready(function() {

// var city = $('#city');
var submit = $('.submitSearch');
var deposit = $('.searchDeposit');
var searchCity = $('#searchCity');
var searchCityClass = $('.searchCity');
var labelCityClass = $('.labelCity');
var searchState = $('#searchState');
var searchStateClass = $('.searchState');
var labelStateClass = $('.labelState');
var cardStyleResult = $('.cardStyleResult');

// Establishes Event Listener Function
submit.on('click', function(){
    // event.preventDefault();
    console.log(searchCity.val());
var city = searchCity.val();
    console.log(searchState.val());
var country = searchState.val();
    // cardStyleResult.show();
    // ajaxAfterCard();
    
    // console.log("You searched for city: " + searchCity.val() + ", " + searchState.val() + ".");
    apiAJAXCall(city, country);
    appendCity();
       
})

// function ajaxAfterCard() {
//     apiAJAXCall(searchCity.val(), searchState.val());
// }

// Create City, ST object with array
var cityObj = {
    cityArray: [],
    stateArray: [],
};

// Appends City value into top bar
var searchCityST;
function appendCity() {

    searchCityST = searchCity.val() + ", " + searchState.val();
    console.log(searchCityST);

        event.preventDefault();
        deposit.append('<div class="d-inline ml-4 resultCity">' + searchCityST + '</div>');

    var result = searchCityST;
        result = result + "-"
        console.log(result);

        cityObj.cityArray.push(searchCity.val());
        cityObj.stateArray.push(searchState.val());


        addLocalStorage();
        apiAJAXCall();
  
}

console.log(cityObj.cityArray, cityObj.stateArray);

// Creates key and value with array within object (multiple city entries)
function addLocalStorage() {
    event.preventDefault();

    var keyA = labelCityClass.parent().attr("id");
    console.log(keyA);
    var keyB = labelStateClass.parent().attr("id");
    console.log(keyB)

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
    console.log(oldKeyValue);    
    for (var i = 0; i < oldKeyValue.length; i++) {
    deposit.append('<div class="d-inline ml-4 resultCity">' + oldKeyValue[i] + '</div>');
    }
    

// Retrieven the value of the last search

if (oldKeyValue) {
var localStorageArray = [];
    console.log(localStorageArray);
    localStorageArray = oldKeyValue;
    console.log(localStorageArray);
    localStorageArray.pop();
    console.log(localStorageArray);

var lastLocalStorageResult = localStorageArray.pop();
    console.log(lastLocalStorageResult);
    lastLocalStorageResult = lastLocalStorageResult.split(", ");
    console.log(lastLocalStorageResult)

    if (lastLocalStorageResult) {
        // cardStyleResult.show();
    }

    console.log(lastLocalStorageResult[0]);
    console.log(lastLocalStorageResult[1]);
    apiAJAXCall(lastLocalStorageResult[0], lastLocalStorageResult[1]);

} 

// Query URL to pull city data
var resultCity = $('.resultCity');
var cityName = $('.cityName');

resultCity.on('click', function() {
    event.preventDefault();
    console.log("These are the results for: " + resultCity.text());
    
    // Created array to get values from search entries
    var cityStateArray = []; 

    // Separate values of search entry, split into different values and push into the array
    var resultCityText = $(this).text();
        resultCityText = resultCityText.split(", ");
        cityStateArray.push(resultCityText);
        console.log(resultCityText);

        // Empty and display previous and current searched values
        cityName.empty().append(resultCityText[0] + ", " + resultCityText[1]);
        console.log(resultCityText[0]);
        console.log(resultCityText[1]);

        // Creates apiAJAXcall function call
        apiAJAXCall(resultCityText[0], resultCityText[1]);

        // Console log for cityStateArray 
        console.log(cityStateArray);

        // cardStyleResult.show();
})
 

// AJAX Call
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

function apiAJAXCall(city, country) {


var apiKey = '3f0e791b672eddc26b02cdefef533281';
var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "," + country + '&appid=' + apiKey;
// api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid={your api key}

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(currentWeather){
    console.log(currentWeather);

    // Establishing City and State/Country    
    var countrycurrentWeather = currentWeather.sys.country;
    console.log(countrycurrentWeather);

    var cityNamecurrentWeather = currentWeather.name;
    console.log(cityNamecurrentWeather);

    var cityCountry = cityNamecurrentWeather + ", " + countrycurrentWeather;
    console.log(cityCountry);

    if (cityName === "") {
        cityName.append(cityCountry);
    } else {
        cityName.empty().append(cityCountry);
    }
    
    // Establishing longitude and latitude for API UV Index
    var lonLatArray = [];

        // Establishing longitude
        longitude = (JSON.stringify(currentWeather.coord.lon));
        console.log(longitude);
        lonLatArray.push(longitude);
        // lon.empty().append("Longitude: " + longitude);
        
        // Establishing latitude
        latitude = (JSON.stringify(currentWeather.coord.lat));
        console.log(latitude);
        lonLatArray.push(latitude);
        lonLat.empty().append("Longitude: " + longitude + " " + " - " + " " + "Latitude: " + latitude);

    // Checking and verifying lonLatArray values
    console.log(lonLatArray);
    var lonVal = lonLatArray[0];
    var latVal = lonLatArray[1];

    // Consoling lonVal and latVal values
    console.log(lonVal)
    console.log(latVal)


    // Establishing Date 
    console.log(currentWeather.dt);
    var dateGMT = new Date(currentWeather.dt * 1000);
    console.log(dateGMT.toUTCString())
    
    console.log(currentWeather.timezone);
    var dateDifference = (currentWeather.timezone);

    // Setting local time
    var dateLocal = (dateGMT + dateDifference)
        dateLocal = dateLocal.split("G");
        dateLocal = dateLocal[0];
        console.log(dateLocal)
    cityDate.empty().append(dateLocal);


    // Establishing Currrent Weather Conditions and Icon
    console.log(currentWeather.weather[0].main);
    var main = currentWeather.weather[0].main;
    console.log(main);
    // currentMain.append(main);

    console.log(currentWeather.weather[0].description);
    var description = currentWeather.weather[0].description;
    console.log(description);
    currentMain.empty().append("The current weather conditions are" + '<br>' + main + " with " + description + ".");

    console.log(currentWeather.weather[0].icon);
    var icon = currentWeather.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
    console.log(icon);
    console.log(iconURL);
    currentIcon.empty().append('<img src="' + iconURL + '" style="height: 75px; width: auto;">');


    // Setting temperature and humidity
    console.log(currentWeather.main.temp);
    var temp = currentWeather.main.temp;
    var tempConversion = Math.floor((9 / 5) * (temp - 273) + 32) + "°F";
    console.log(tempConversion);
    temperature.empty().append("Current temperature: " + tempConversion);

    var feels_like = currentWeather.main.feels_like;
    console.log(currentWeather.main.feels_like);
    var flConversion = Math.floor((9 / 5) * (feels_like - 273) + 32) + "°F";
    console.log(flConversion);
    feelslike.empty().append("Feels like: " + flConversion);

    var max = currentWeather.main.temp_max;
    console.log(currentWeather.main.temp_max);
    var maxConversion = Math.floor((9 / 5) * (max - 273) + 32) + "°F";
    console.log(maxConversion);
    tempmax.empty().append("Maximum Temperature: " + maxConversion);

    var min = currentWeather.main.temp_min;
    console.log(currentWeather.main.temp_min); 
    var minConversion = Math.floor((9 / 5) * (min - 273) + 32) + "°F";
    console.log(minConversion);
    tempmin.empty().append("Minimum Temperature: " + minConversion);

    var humidityP = (currentWeather.main.humidity) + "%";
    console.log(humidityP);
    humidity.empty().append("Humidity: " + humidityP);
    

    // Calling for UV query URL 
    var apiKey = '3f0e791b672eddc26b02cdefef533281';
    var queryURLuv = 'http://api.openweathermap.org/data/2.5/uvi?lat=' + latVal + '&lon=' + lonVal + '&appid=' + apiKey;
    
        $.ajax({
            url: queryURLuv,
            method: "GET"
        }).then(function(UV) {
            console.log(UV);
            uvIndex.empty().append('UV Index: ' + UV.value);
        })

    var queryURLForecast = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latVal + '&lon=' + lonVal + '&appid=' + apiKey;

    $.ajax({
        url: queryURLForecast,
        method: "GET"
    }).then(function(forecast) {
        console.log(forecast);
    })
      
  });

 

}

function cardStyleResult() {
    $('.cardStyleResult').show();
}

})