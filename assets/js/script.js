$(document).ready(function() {


// Create onclick function for button with class submitSearch
// Obtain and display search criteria on navbar with class searchDeposit
// The criteria is contained inside input with class searchWeather

var city = $('#city');
var submit = $('.submitSearch');
var deposit = $('.searchDeposit');
var searchCity = $('#searchCity');
var searchCityClass = $('.searchCity');
    

// Establishes Event Listener Function
submit.on('click', function(){

    event.preventDefault();
    appendCity();
    addKey();

})


// Create City, ST object with array
citySTObj = {
    citySTArray: [],
};


// Appends City, ST value into top bar
function appendCity() {

    event.preventDefault();
    deposit.append('<div class="d-inline ml-4">' + searchCity.val() + '</div>');
    var result = searchCityST.val();
    citySTObj.citySTArray.push(result);

}


console.log(citySTObj);

// Creates key and value with array within object (multiple city entries)
function addKey() {

    var key = searchCitySTClass.parent().attr("id");
    console.log(key);
    var value = citySTObj.citySTArray;
    console.log(value);
    localStorage.setItem(key, value);

}


// Query URL to pull city data

queryURL = 'http://pro.openweathermap.org/data/2.5/forecast/hourly?q=' + city name}&appid={your api key}

// AJAX call 

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    $("#movie-view").text(JSON.stringify(response));
  });











})