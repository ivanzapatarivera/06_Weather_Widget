$(document).ready(function() {


// Create onclick function for button with class submitSearch
// Obtain and display search criteria on navbar with class searchDeposit
// The criteria is contained inside input with class searchWeather

var submit = $('.submitSearch');
var deposit = $('.searchDeposit');
var searchWeather = $('#searchWeather')
    console.log(searchWeather);

submit.on('click', function(){

    event.preventDefault();
    appendCity();


})


function appendCity() {

    event.preventDefault();
    deposit.append('<div class="d-inline ml-4">' + searchWeather.val() + '</div>');

}

// Obtain the AJAX for OpenWeather
// Include Search's AJAX details into appendCity();

})