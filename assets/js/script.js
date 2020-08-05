$(document).ready(function() {


// Create onclick function for button with class submitSearch
// Obtain and display search criteria on navbar with class searchDeposit
// The criteria is contained inside input with class searchWeather

// var city = $('#city');
var submit = $('.submitSearch');
var deposit = $('.searchDeposit');
var searchCity = $('#searchCity');
var searchCityClass = $('.searchCity');
    

// Establishes Event Listener Function
submit.on('click', function(){

    event.preventDefault();
    appendCity();
    addLocalStorage();
    apiAJAXCall();

})


// Create City, ST object with array
cityObj = {
    cityArray: [],
};


// Appends City value into top bar
function appendCity() {

    event.preventDefault();
    deposit.append('<div class="d-inline ml-4">' + searchCity.val() + '</div>');
    var result = searchCity.val();
    cityObj.cityArray.push(result);

}


console.log(cityObj);

// Creates key and value with array within object (multiple city entries)
function addLocalStorage() {

    var key = searchCityClass.parent().attr("id");
    console.log(key);
    var value = cityObj.cityArray;
    console.log(value);
    localStorage.setItem(key, value);

}


// Query URL to pull city data

var apiKey = '153c22b1d7bf8797ae2dad9664ef02d7';
var queryURL = 'http://pro.openweathermap.org/data/2.5/forecast/hourly?q=' + 'London' + '&appid=' + apiKey;

// AJAX call 
function apiAJAXCall() {
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    $('#weatherResults').text(JSON.stringify(response));
  });

}









})