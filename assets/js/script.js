$(document).ready(function() {


// Create onclick function for button with class submitSearch
// Obtain and display search criteria on navbar with class searchDeposit
// The criteria is contained inside input with class searchWeather

var cityST = $('#cityST');
var submit = $('.submitSearch');
var deposit = $('.searchDeposit');
var searchCityST = $('#searchCityST')
    


// Appends search into top bar
submit.on('click', function(){

    event.preventDefault();
    appendCity();
    addKey();

})



citySTObj = {};

function appendCity() {

    event.preventDefault();
    deposit.append('<div class="d-inline ml-4">' + searchCityST.val() + '</div>');
    var result = searchCityST.val();
    citySTObj.push(result);
}
console.log(citySTObj);


function addKey() {

    var value = searchCityST.val()
    console.log(value);
    var key = cityST;
    console.log(key);
    localStorage.setItem(key, value);

}




// Obtain the AJAX for OpenWeather
// Include Search's AJAX details into appendCity();

})