var zipCode ="23235";
var countryCode="US";
var forecastDays;


//Api call to get array of foreccast days
function getForecast(){
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=" + zipCode +","+ countryCode+"&appid=0300e0494f9976a54d845a8f39ccb339";
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {
        console.log(response);
        // Pass response object to 
    
        for (var i = 0; i < results.length; i++) {

        }
    });
}

getForecast();