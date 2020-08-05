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

    console.log("You searched for city: " + searchCity.val());

})


// Create City, ST object with array
cityObj = {
    cityArray: [],
};


// Appends City value into top bar
function appendCity() {

    event.preventDefault();
    deposit.append('<div class="d-inline ml-4 resultCity">' + searchCity.val() + '</div>');
    var result = searchCity.val();
    cityObj.cityArray.push(result);
    resultCity();

}

function resultCity() {

$('.resultCity').on('click', function() {
    alert("Weather forecast from previous search.")
})

}

console.log(cityObj);

// Creates key and value with array within object (multiple city entries)
function addLocalStorage() {
    event.preventDefault();
    var key = searchCityClass.parent().attr("id");
    console.log(key);
    var value = cityObj.cityArray;
    console.log(value);
    localStorage.setItem(key, value);
    
}

$('#searchDeposit .resultCity').val(localStorage.getItem('city'));

// Query URL to pull city data





// AJAX call 
function apiAJAXCall() {

console.log("Search City Value is: " + searchCity.val());
var apiKey = '3f0e791b672eddc26b02cdefef533281';
var queryURL = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + searchCity.val() + '&appid=' + apiKey;


$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    $('#weatherResults').text(JSON.stringify(response));
  });

}









})