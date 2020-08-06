$(document).ready(function() {


// Create onclick function for button with class submitSearch
// Obtain and display search criteria on navbar with class searchDeposit
// The criteria is contained inside input with class searchWeather

// var city = $('#city');
var submit = $('.submitSearch');
var deposit = $('.searchDeposit');
var searchCity = $('#searchCity');
var searchCityClass = $('.searchCity');
var searchState = $('#searchState');
var searchStateClass = $('.searchState');


// Establishes Event Listener Function
submit.on('click', function(){

    event.preventDefault();
    appendCity();
    apiAJAXCall(searchCity.val());

    console.log("You searched for city: " + searchCity.val());

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
    console.log(searchCityST);


        event.preventDefault();
        deposit.append('<div class="d-inline ml-4 resultCity">' + searchCityST + '</div>');

    var result = searchCityST;
        result = result + "-"
        console.log(result);

        cityObj.cityArray.push(searchCity.val());
        cityObj.stateArray.push(searchState.val());


    //     cityObj.cityArray.push(result);
    //     console.log(result);

        addLocalStorage();
        
  
}

console.log(cityObj.cityArray, cityObj.stateArray);

// Creates key and value with array within object (multiple city entries)
function addLocalStorage() {
    event.preventDefault();

    var keyA = searchCityClass.parent().attr("id");
    var keyB = searchStateClass.parent().attr("id");

    var key = keyA + keyB;
    var value = searchCityST + "-";

    if (localStorage.getItem(key)){
        var addCity = localStorage.getItem(key) + value
        localStorage.setItem(key, addCity);
    } else {
        localStorage.setItem(key, value);
    }
}


 var oldKeyValue = localStorage.getItem('cityState')
    oldKeyValue = oldKeyValue.split('-');
    console.log(oldKeyValue);    
    for (var i = 0; i < oldKeyValue.length; i++) {
    deposit.append('<div class="d-inline ml-4 resultCity">' + oldKeyValue[i] + '</div>');
    }



// Query URL to pull city data
$('.resultCity').on('click', function() {
    alert("testing saved city")
    var cityStateArray = [];    
    var resultCityText = $(this).text();
        resultCityText = resultCityText.split(", ");
        cityStateArray.push(resultCityText);
        
        console.log(resultCityText);
        console.log(resultCityText[0]);
        console.log(resultCityText[1]);

        apiAJAXCall(resultCityText[0], resultCityText[1]);
        console.log(cityStateArray)
})


// Add the dash +
// city = city + - ++
// console log city
// place.push(city)


// AJAX call 
function apiAJAXCall(city, country) {


var apiKey = '3f0e791b672eddc26b02cdefef533281';
var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "," + country + '&appid=' + apiKey;
// api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid={your api key}

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });


}



})