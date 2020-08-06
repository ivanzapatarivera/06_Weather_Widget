$(document).ready(function() {


// Create onclick function for button with class submitSearch
// Obtain and display search criteria on navbar with class searchDeposit
// The criteria is contained inside input with class searchWeather

// var city = $('#city');
var submit = $('.submitSearch');
var deposit = $('.searchDeposit');
var searchCity = $('#searchCity');
var searchCityClass = $('.searchCity');


// Create City, ST object with array
var cityObj = {
    cityArray: [],
};

// Establishes Event Listener Function
submit.on('click', function(){

    event.preventDefault();
    appendCity();
    //addLocalStorage();
    apiAJAXCall(searchCity.val());

    console.log("You searched for city: " + searchCity.val());

})

// Appends City value into top bar
function appendCity() {

    event.preventDefault();
    deposit.append('<div class="d-inline ml-4 resultCity">' + searchCity.val() + '</div>');
    var result = searchCity.val().trim();
    result = result + "-"
    console.log(result);


    cityObj.cityArray.push(result);
    console.log(result)
    addLocalStorage();
   // resultCity();

}

console.log(cityObj);

// Creates key and value with array within object (multiple city entries)
function addLocalStorage() {
    event.preventDefault();
    var key = searchCityClass.parent().attr("id");
     var value = cityObj.cityArray;

    if (localStorage.getItem(key)){
        var addCity = localStorage.getItem(key) + value
        localStorage.setItem(key, addCity);
    } else {

 
        localStorage.setItem(key, value);

    }
}


 var oldKeyValue = localStorage.getItem('city')
    oldKeyValue = oldKeyValue.split('-');
    console.log(oldKeyValue);    
    for (var i = 0; i < oldKeyValue.length; i++) {
    deposit.append('<div class="d-inline ml-4 resultCity">' + oldKeyValue[i] + '</div>');
    }

// Query URL to pull city data
$('.resultCity').on('click', function() {
    alert("testing saved city")

    var resultCityText = $(this).text();
    console.log(resultCityText)
    apiAJAXCall(resultCityText)
})

// Add the dash +
// city = city + - ++
// console log city
// place.push(city)


// AJAX call 
function apiAJAXCall(city) {


var apiKey = '3f0e791b672eddc26b02cdefef533281';
var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;
api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid={your api key}


$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });

}



})