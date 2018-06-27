//temporary variables
var forecastDays = [];
var userPref = {
    activities: [],
    googleId: "",
    isGoogle: false,
    email: "",
    city: "",
    state: "",
    zipCode: "",
    geo: {
        lat: "",
        lng: ""
    }
};

var statesByAbb = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
    };
var stateByName = swap(statesByAbb);
var activities, autocomplete, $checkboxes, initCityState, locSuccess
var logInStatus = 0;
var loadCnt = 0;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};
var displayDays=[]

// getForecast();
// all units should be in F mph 

//variables
var Running = {
    name: "Running",
    tempMax: 80,
    tempMin: 55,
    windMin: 0,
    windMax: 20,
    skyCondition: ['clear', 'cloudy'],//will need updated depending on the API
    precip: ['none']
};

var Cycling = {
    name: "Cycling",
    tempMax: 110,
    tempMin: 60,
    windMin: 10,
    windMax: 20,
    skyCondition: ['clear', 'cloudy'],//will need updated depending on the API
    precip: ['none', 'lightRain']
};

var Golfing = {
    name: "Golfing",
    tempMax: 110,
    tempMin: 60,
    windMin: 10,
    windMax: 20,
    skyCondition: ['clear', 'cloudy'],//will need updated depending on the API
    precip: ['none', 'lightRain']
};

//days will be populated with weather API data these are test days currently
var day1 = {
    name: "Monday",
    tempMax: 70,
    tempMin: 65,
    windMin: 15,
    windMax: 17,
    skyCondition: "clear",
    precip: 'none'

};

var day2 = {
    name: "tuesday",
    tempMax: 70,
    tempMin: 60,
    windMin: 10,
    windMax: 20,
    skyCondition: 'clear',
    precip: 'none'
};

var listedActivties = [Cycling, Running, Golfing]
var selectedActivityArray = [];
var dayArray = [day1, day2];
var displayDay=[];
var currentDay=Number(moment().format("DD"));
comparisonDay=currentDay+1;
var card="";
var cardTime="";
var cardActivity="";
var cardNumber=0;
//this will be called inside the api call or to run after the call is complete and the days have been assigned value
//this will be called inside the api call or to run after the call is complete and the days have been assigned value
function checkWeather() {
    
    console.log("check weather is running");
    console.log("selected activity array length: " + selectedActivityArray.length);
    console.log("day array length: " + forecastDays.length)

    for (var j = 0; j < forecastDays.length; j++) {
        console.log("j: " + j);
        console.log("forcast date: "+forecastDays[j].number+" current day:  "+currentDay+" comparison switch day:"+comparisonDay)
        if ((forecastDays[j].number!=currentDay)&&(forecastDays[j].time<=21)&&(forecastDays[j].time>=9)){
            if (forecastDays[j].number==comparisonDay){
                if (forecastDays[j]!=comparisonDay+1){
                    $("#results").append(card);
                }

                console.log("creating card");
                comparisonDay=Number(moment(forecastDays[j].rawMoment).add(1, 'days').format("DD"))
                card=$("<div>").addClass("card").html("");
                cardHeader=$('<h5>').addClass("card-header").text(forecastDays[j].name);
                cardBody=$("<div>").addClass("card-body").html("");
                cardTime=$("<div>").addClass('cardDay').html("<h5>"+forecastDays[j].displayTime+"</h5>");
                
                cardBody.append(cardTime);
                card.append(cardHeader);
                card.append(cardBody);
                
            } 
                else{
                    console.log(card);
                    cardTime=$("<div>").addClass('cardDay').html("<h5>"+forecastDays[j].displayTime+"</h5>");
                    card.append(cardTime);
            };


            for (var i = 0; i < selectedActivityArray.length; i++) {
            console.log("i: " + i);
            var activityObject = window[selectedActivityArray[i]];
            
            console.log(activityObject);
            console.log(forecastDays[j]);
            isItAGoodDay(activityObject, forecastDays[j]);
        };
    };
};
};

//compare activity properties to day properties to determine if the activity is recomended for that day the console.log it.
//requires two objects as perameters
function isItAGoodDay(activity, day) {
    console.log("checking if " + day.date + " is a good day for " + activity.name + ".");
    if (activity.tempMax > day.tempMax && activity.tempMin < day.tempMin) {
        if (activity.windMax > day.windMin && activity.windMin < day.windMin) {
            if (activity.skyCondition.indexOf(day.skyCondition) <= 0) {
                if (activity.precip.indexOf(day.precip) <= 0) {
                    cardTime.append("<p>"+activity.name+"</p>");
                    console.log(activity.name + " is recommended for " + day.name);
                } else { };
            } else { };
        } else {};
    } else {  };
};

//firebase config
var config = {
    apiKey: "AIzaSyDub3ovHdLDIgJYuXAUV_-d-tux3LetDuU",
    authDomain: "ycis-project-01.firebaseapp.com",
    databaseURL: "https://ycis-project-01.firebaseio.com",
    projectId: "ycis-project-01",
    storageBucket: "ycis-project-01.appspot.com",
    messagingSenderId: "90816397737"
  };
firebase.initializeApp(config);
var database = firebase.database;
var provider = new firebase.auth.GoogleAuthProvider();


//Api call to get array of 
function getForecast() {
    $("#pleaseWaitDialog").modal("show");
    //api.openweathermap.org/data/2.5/forecast?lat=35&lon=139
    
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?zip=" + userPref.zipCode + ",US" + "&appid=0300e0494f9976a54d845a8f39ccb339";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(
        function (response) {
            console.log(response);
            //Calling function to map larger object to usable object
            mapForecastObject(response);
            checkWeather();
            $("#pleaseWaitDialog").modal("hide");
        }
    ).fail(
        function(){
            $("#pleaseWaitDialog").modal("hide");
            $("#noForecast").modal();
        }
    );
}

//function to map API response object to application object
function mapForecastObject(data) {
    data.list.forEach(element => {
        var day = {
            date: moment(element.dt_txt).format('LLL'),
            number:Number(moment(element.dt_txt).format("DD")),
            name: moment(element.dt_txt).format('dddd'),
            time:Number(moment(element.dt_txt).format("HH")),
            displayTime:(moment(element.dt_txt).format("LT")),
            tempMax: (parseFloat(element.main.temp_max - 273.15) * 1.8) + 32,/*Converting temp from Kelvin to Farenheit*/
            tempMin: (parseFloat(element.main.temp_max - 273.15) * 1.8) + 32,/*Converting temp from Kelvin to Farenheit*/
            windMin: element.wind.speed,
            skyCondition: element.weather[0].description,
        };
        forecastDays.push(day);
    });
    console.log(forecastDays);
}


function getActObjectsFromArr(){
    var arr = [];
    for(var i = 0; i < userPref.activities.length; i++) {
        for(act in listedActivties){
            if(listedActivties[act].name == userPref.activities[i]) {
                arr.push(listedActivties[act]);
            }
        }
    }
    return arr;
}
function pushPref(googleUser,callingElementId) {
    userPref.activities = getActObjectsFromArr();
    alert(JSON.stringify(userPref))
    if(typeof googleUser !== "undefined") {
        userPref.isGoogle = true;
        userPref.googleId = googleUser.b.b;
        userPref.email = googleUser.email;
    } else {
        userPref.isGoogle = false;
        userPref.googleId = "";
        if(callingElementId == "save-signIn") {
            userPref.email = $("#emailInput2").val();
        } else {
            userPref.email = $("#emailInput").val();
        }
    }
    
    database.ref().child('users').push(userPref.email);
}

function pullPref(googleUser, callingElementId) {
    if(typeof googleUser !== "undefined") {
        userPref.isGoogle = true;
    } else {
        if(callingElementId == "save-signIn") {
            userPref.email = $("#emailInput2").val();
        } else {
            userPref.email = $("#emailInput").val();
        }
    }
    var tempUser = database.ref.once("/users/" + userPref.email);
    console.log(tempuser)
    if(typeof tempUser !== "undefined") {
        userPref = tempUser;
    } else {
        swal({
            type: 'error',
            title: 'Oops...',
            text: "Unable to locate that email on file. Please try a different one or start again."
        })
        
    }
}
function checkVisible( elm, evalType ) {
    evalType = evalType || "visible";

    var vpH = $(window).height(), // Viewport Height
        st = $(window).scrollTop(), // Scroll Top
        y = $(elm).offset().top,
        elementHeight = $(elm).height();

    if (evalType === "visible") return ((y < (vpH + st)) && (y > (st - elementHeight)));
    if (evalType === "above") return ((y < (vpH + st)));
}
function OutputButtonClick (event) {
    event.preventDefault();
    selectedActivityArray = userPref.activities;
    switch (true) {
        case userPref.activities.length == 0:
        swal({
            type: 'error',
            title: 'Oops...',
            text: "There weren't any activities selected, please choose at least one desired activity and try again."
          })
            break;
        case locSuccess === false:
        swal({
            type: 'error',
            title: 'Oops...',
            text: 'There was no location entered, please add a desired locale and try again.'
          })
            break;
        default:
            //ui updates to show first load or reset
            $("#weather-results").show();
            //added changes for updated structure
            getForecast();
            //updated activities array to be string array top level (Vu was causing conflicts with bootstrap - known bugs around check boxes disappearing on mobile)   
        }    
}

function locLoseFocus(){
    if(locSuccess) {
        if($(this).val() == "") {$(this).val(userPref.city + ", " + userPref.state)};
    }
}
function geoLocateClick(event){
    event.preventDefault();
    establishLocation("click");
}

function googleSignIn(){
    alert("you at google?")
    var noGo = false;
    if(logInStatus == 0) {
        switch (true) {
            case userPref.activities.length == 0:
                swal({
                    type: 'error',
                    title: 'Oops...',
                    text: "There weren't any activities selected, please choose at least one desired activity and try again."
                })
                noGo = true;
                break;
            case locSuccess === false:
                swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'There was no location entered, please add a desired locale and try again.'
                })
                noGo = true;
                break;
        }
        if(noGo) {return};
    } else {
        if(!userPref.isGoogle) {
            return;
        } else {
            //log out of google (code later)
            logInStatus = 0;
            return;
        }
    }
    firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    user = result.user;
    pullPref(user);
    }).catch(function(error) {
        noGo = true;
        logInFailed();
        console.log("Google Error: " + error)
    });
    if(logInStatus == 0 && noGo == false) {
        logInStatus = 1;
        logInStatusDisplayUpdates(userPref.email);
    }
}

function logInFailed(){
    logInStatus = 0;
    swal({
        type: 'error',
        title: 'Oops...',
        text: "Looks like there was an issue with the login process, please try again."
    })
}

function LogInClick(event){
    event.preventDefault();
    var emailEntered ="";
    if($(this).attr("id") == "save-signIn") {
        emailEntered = $("#emailInput2").val();
    } else {
        emailEntered = $("#emailInput").val();
    }
    if(emailEntered == "") {
        swal({
            type: 'error',
            title: 'Oops...',
            text: "No email entered, please try again."
        })
        return;
    } 
    var googleUser;
    alert("you here?")
    if(logInStatus == 1) {
        pushPref(googleUser,$(this).attr("id"));
    } else {
        pullPref(googleUser,$(this).attr("id"));
    }
}

function ActivityCheckboxUpdate(){
    var actElArr = $checkboxes.filter(':checked')
    $('#actCount').val(actElArr.length);
    if(actElArr.length > 0) {
        var strArr = actElArr.map(function(){return $(this).val()}).get()//converts element array to value array
        userPref.activities = strArr
    } else {
        userPref.activities = [];
    }
}
function swap(json) {
    var ret = {};
    for(var key in json){ret[json[key]] = key};
    return ret;
}
function loadActivitiesStandard() {;
    for(var i = 0; i < listedActivties.length; i++) {
        var activityNameStr = listedActivties[i].name;
        var divFormGroup = $('<div class="form-check form-check-inline">');        
        var newLabel = $("<label>")
            .addClass("form-check-label ml-1")
            .attr("for","act-" + activityNameStr)
            .html('<span style="font-size:18px">' + activityNameStr + '</span>');
        var checkbox = $('<input ' + 'class="form-check-input activity m-2" ' + 'type="checkbox" '+ 
            + 'id="act-' + activityNameStr + '" ' + 'value="' + activityNameStr + '">')
        divFormGroup.append(checkbox);
        divFormGroup.append(newLabel);
        $("#activities").append(divFormGroup);
    }
}

function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('location')),
            {types: ['geocode']}
        );
    autocomplete.addListener('place_changed', function(){
            var place = autocomplete.getPlace();
            establishLocation("place",place);
        });
}

function latLngSuccess(address){
    var place = address.results[0];
    $("#location").val(place.formatted_address);
    establishLocation("place",place);
    locSuccess = true;
    didWeGetALocation()
}

function latLngFail(error){
    console.log(error);
    locSuccess = false;
    didWeGetALocation(true);
}
function latLngAddress(){
    $("#location-loading").show();
    $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + userPref.geo.lat + "," + userPref.geo.lng
    ).done (
        latLngSuccess
    ).fail(
        latLngFail
    );
    
}
function geoipDBSuccuess(results){
    locSuccess = true;
    userPref.geo.lat = results.latitude;
    userPref.geo.lng = results.longitude;
    userPref.zipCode = results.postal;
    userPref.city = results.city;
    userPref.state = results.state;
    $("#location").val(userPref.city + ", " + userPref.state);
    locSuccess = true;
    didWeGetALocation();
}
function establishLocation(source, place) {
    loadCnt++;
    if(source !== "place") {$("#location-loading").show()};
    if(source === "IP") {
        $.getJSON('https://geoip-db.com/json/')
        .done(geoipDBSuccuess)
        .fail(function(){
            locSuccess = false
            console.log("failed to get geo-ip coords")
        });
    } else if (source === "click") {
        if (navigator.geolocation) {
            var startingVal = $("#location").val()
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    userPref.geo.lat = position.coords.latitude;
                    userPref.geo.lng = position.coords.longitude;
                    var circleObj = {
                        center: userPref.geo,
                        radius: position.coords.accuracy
                    }
                    var circle = new google.maps.Circle(circleObj);
                    autocomplete.setBounds(circle.getBounds());
                    latLngAddress();// locSuccess Set after googleapi 
                },
                function() {
                    if(startingVal == "" || startingVal !== $("#location").val()) {
                        locSuccess = false;
                    }                        
                });
        }
    } else if (source === "place") { 
        if (typeof place === "undefined"){
            locSuccess = false;
            console.log("establishLocation called with 'place' as source && no place variable sent")
        } else {
            locSuccess = true;
            var componentForm = {
                street_number: 'short_name',
                route: 'long_name',
                locality: 'long_name',
                administrative_area_level_1: 'short_name',
                country: 'long_name',
                postal_code: 'short_name'
            };
        
            for (var i = 0; i < place.address_components.length; i++) {
                var addressType = place.address_components[i].types[0];
                if (componentForm[addressType]) {
                    var val = place.address_components[i][componentForm[addressType]];
                    switch (addressType) {
                        case "locality":
                            userPref.city = val;
                            break;
                        case "administrative_area_level_1":
                            userPref.state = val;
                            break;
                        case "postal_code":
                            userPref.zipCode = val
                            break;
                    }
                }
            }
        }
    } else {
        locSuccess = false;
        console.log("error getting location data::function(source) = " + source);
    }
    didWeGetALocation()
}

function didWeGetALocation(geoOnly){
    $("#location-loading").hide();
    if(locSuccess === false) {
        userPref.city = "";
        userPref.state = "";
        userPref.zipCode = "";
        if(geoOnly !== true) {
            userPref.geo.lng = "";
            userPref.geo.lat = "";
        }
    } else {
        if(typeof initCityState == "undefined") {initCityState = userPref.city + ", " + userPref.state};
    }
}
function windowResized(){
    if($(window).width() <= 800) {
        $("#activities .form-check-label").removeClass("mx-1").addClass("mx-3")
    } else {
        $("#activities .form-check-label").removeClass("mx-3").addClass("mx-1")
    }
}


function logInStatusDisplayUpdates (email){
    if(logInStatus == 0) {
        $("#loggedIn").html(email + '<i class="fa fa-user-circle-o fa-2x pl-1" aria-hidden="true">');
        $(".loggedIn").show();
        $(".loggedOut").hide();
        $("#loggedInShowForecast").removeClass("col-md-3").addClass("col-md-5 text-right")
    } else {
        $("#loggedInShowForecast").removeClass("col-md-5 text-class").addClass("col-md-3")
        $(".loggedIn").hide();
        $(".loggedOut").show();
    }
}

$(document).ready(function(){
    loadActivitiesStandard();
    $checkboxes = $('#activities input[type="checkbox"]').change(ActivityCheckboxUpdate);
    establishLocation("IP");
    $("#location").focusout(locLoseFocus);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
    $("#geolocate").click(geoLocateClick);  
    $("#submit-search").on("click",OutputButtonClick);
    $(window).resize(windowResized);    
    $(".google-click").click(googleSignIn);
    $(".logWasClicked").click(function(event){
        event.preventDefault();
        var googleUser
        pushPref(googleUser,$(this).attr("id"))
    });

    //temp
    $("#printUserPref").click(function(){
        alert(JSON.stringify(userPref))
    });
}) 