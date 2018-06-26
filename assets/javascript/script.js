//temporary variables
var cityName = "Richmond";
var zipCode = "";
var countryCode = "US";
var forecastDays = [];
var userPref = {
    activites: [],
    uniqueID: "",
    isGoogle: false,
    email: "",
    zipCode: ""
}

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
var activities, autocomplete, locObj, $checkboxes, initCityState
var loadCnt = 0;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

//function to map API response object to application object
function mapForecastObject(data) {
    data.list.forEach(element => {
        var day = {
            date: moment(element.dt_txt).format('LLL'),
            name: element.dt_txt,
            tempMax: (parseFloat(element.main.temp_max - 273.15) * 1.8) + 32,/*Converting temp from Kelvin to Farenheit*/
            tempMin: (parseFloat(element.main.temp_max - 273.15) * 1.8) + 32,/*Converting temp from Kelvin to Farenheit*/
            windMin: element.wind.speed,
            skyCondition: element.weather[0].description,
        };

        forecastDays.push(day);
    });
    console.log(forecastDays);
}

//Api call to get array of 
function getForecast() {
    if (zipCode === "") {
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "," + countryCode + "&appid=0300e0494f9976a54d845a8f39ccb339";
        console.log(zipCode +" "+ cityName);
    }
    else {
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=" + zipCode + "," + countryCode + "&appid=0300e0494f9976a54d845a8f39ccb339";
    }
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        //Calling function to map larger object to usable object
        mapForecastObject(response);
    });
}

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


//We need link to radio buttons to populate this array
var listedActivties = [Cycling, Running, Golfing]
var selectedActivityArray = [];
var dayArray = [day1, day2];

//functions

//this will be called inside the api call or to run after the call is complete and the days have been assigned value


//loops through the activies array and day array and runs isItAGoodDay function to compare them.
/*function checkWeather(){
    console.log("check weather is running");
    console.log("selected activity array length: "+selectedActivityArray.length);
    console.log("day array length: "+dayArray.length)
    for (var i=0; i<selectedActivityArray.length; i++){
        console.log("i: "+i);
        for(var j=0; j<dayArray.length;j++){
            var activityObject = window[selectedActivityArray[i]];
            console.log("j: "+j);
            isItAGoodDay(activityObject, dayArray[j]);
        };
    };
}; */
function checkWeather() {
    console.log("check weather is running");
    console.log("selected activity array length: " + selectedActivityArray.length);
    console.log("day array length: " + forecastDays.length)
    for (var i = 0; i < selectedActivityArray.length; i++) {
        console.log("i: " + i);
        for (var j = 0; j < forecastDays.length; j++) {
            var activityObject = window[selectedActivityArray[i]];
            console.log("j: " + j);
            isItAGoodDay(activityObject, forecastDays[j]);
        };
    };
};

//compare activity properties to day properties to determine if the activity is recomended for that day the console.log it.
//requires two objects as perameters
function isItAGoodDay(activity, day) {
    console.log("checking if " + day.date + " is a good day for " + activity.name + ".");
    if (activity.tempMax > day.tempMax && activity.tempMin < day.tempMin) {
        console.log("The temp is good")
        if (activity.windMax > day.windMin && activity.windMin < day.windMin) {
            console.log("The wind is good")
            if (activity.skyCondition.indexOf(day.skyCondition) <= 0) {
                console.log("the sky condition is good");
                if (activity.precip.indexOf(day.precip) <= 0) {
                    console.log(activity.name + " is recommended for " + day.name);
                } else { console.log(activity.name + ' is not recommended due to ' + day.precip) };
            } else { console.log(activity.name + ' is not recommended due to skycondition') };
        } else { console.log(activity.name + ' is not recommended due to wind') };
    } else { console.log(activity.name + ' is not recommended due to the tempurature') };

};


//firebase config
var config = {
    apiKey: "AIzaSyAnIrJKU0DegRK-R7CqlNd84wrrdqmg7Xg",
    authDomain: "practice-a6d1d.firebaseapp.com",
    databaseURL: "https://practice-a6d1d.firebaseio.com",
    projectId: "practice-a6d1d",
    storageBucket: "practice-a6d1d.appspot.com",
    messagingSenderId: "487061189656"
};
firebase.initializeApp(config);
var provider = new firebase.auth.GoogleAuthProvider();
  
function getActObjectsFromArr(){
    var arr = [];
    for(var i = 0; i < activities.length; i++) {
        arr.push(window[activities[i]]);
    }
    return arr;
}

function pushPref(googleUser) {
    userPref.activites = getActObjectsFromArr();
    userPref.zipCode = locObj.zip;
    if(typeof googleUser !== "undefined"){
        userPref.uniqueID = googleUser["string for google user id"];
        userPref.email = googleUser["string for user from google docs"]
        userPref.isGoogle = true;
    } else {
        userPref.email = $("#userEmail").val();
    }
    firebase.database.ref("users/").push(user)
}

function ifUserExistSetVariable(){
    if(typeof userPref.email == "undefined" || userPref.email == "" ) {return false}
    
    firebase.database.ref.once("users/" + userPref.email, 
        function(snap){
            if(typeof snap !== "undefined") {
                userPref = snap
                return true;
            } else {
                return false;
            }
        }
    );
}


function pullPref() {
    if(userPref.email = "") {
        userPref = firebase.database.ref("users/" + userPref.email);
        return;
    } 
    var tempUserPref = firebase.database.ref("")
    firebase.database.ref("")
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
    if(typeof selectedActivityArray == "undefined" ||selectedActivityArray.length == 0) {
        $("#noActivities").modal();
        return
    }
        //ui updates to show first load or reset
        $("#weather-results").show();
        //added changes for updated structure
        zipCode = locObj.zip
        getForecast();
        //updated activities array to be string array top level (Vu was causing conflicts with bootstrap - known bugs around check boxes disappearing on mobile)
        selectedActivityArray = activities;
        checkWeather();
    $(window).resize(function(){setNavFeaturesWidth()});
}

function locationUpdate(){
    if(loadCnt==0){return};
    console.log("current: " + $(this).val() +" Init: " + initCityState)
    if($(this).val() === initCityState || $(this).val() === "") {
        $(this).val("").attr("placeholder","Enter location ...");
        // document.getElementById("location").style.zIndex = 0;
    } else {
        $("#changeInput").modal();
    }
}
function locLoseFocus(){
    if($(this).val() == "") {$(this).val(locObj.cityState)};
    setNavFeaturesWidth();
    // $(this).attr('size', $(this).val().length)
}

function loadGeoLocate(event){
    event.preventDefault();
    establishLocation("click");
}


function signInProcedure(){
    //Google Sign in
    console.log("sign in clicked")
    firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    user = result.user;
    //check if save modal is vsible to determine if load or pull
    if(checkVisible($("#saveModal","visible")) == true) {
      pushPref(user);
    } else {
      pullPref();
    }
    console.log(user);
    // ...
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}

function confirmUpdateAddressModal(){
    $("#location").val("").attr("placeholder","Enter location ...")
    .focus();
}

function ActivityCheckboxUpdate(){
    var showButton = $("#submit-search");
    var actElArr = $checkboxes.filter(':checked')
    $('#actCount').val(actElArr.length);
    if(actElArr.length > 0) {
        showButton.removeClass("disabled");
        activities = actElArr.map(function(){return $(this).val()}).get(); //converts element array to value array
    } else {
        showButton.addClass("disabled")
        activities = [];
    }
}

$(document).ready(function(){
    $checkboxes = $('#activities input[type="checkbox"]').change(ActivityCheckboxUpdate);
    $(".signIn").on("click", signInProcedure);
    establishLocation("IP");
    loadActivitiesStandard();
    $("#location").focus(locationUpdate);
    $("#location").focusout(locLoseFocus);
    $("#geolocate").click(loadGeoLocate);
    $("#submit-search").on("click",OutputButtonClick)    
    $("#updateAddConfirm").click(confirmUpdateAddressModal);
}) 


//Daniel Code
function swap(json) {
    var ret = {};
    for(var key in json){ret[json[key]] = key};
    return ret;
}
var stateByName = swap(statesByAbb);

function loadActivitiesStandard() {
var actForm = $("#activities");
    $("#activities-list").show();
    actForm.empty();
    for(var i = 0; i < listedActivties.length; i++) {
        var activityNameStr = listedActivties[i].name;
        var labelHTML = '<input ' + 'class="form-check-input activity mb-2" ' + 'type="checkbox" '+ 
            + 'id="act-' + activityNameStr + '" ' + 'value="' + activityNameStr + '"><h6>' + activityNameStr + '</h6></input>'        
        var newLabel = $("<label>")
            .addClass("form-check-label mx-1")
            .attr("for","act-" + activityNameStr)
            .html(labelHTML);
        actForm.append(newLabel);
        // $("#act-" + activityNameStr).text(activityNameStr)
    }
}

function Location(lat,lng,zip,city,state,cityState,source){
    this.lat = lat;
    this.lng = lng;
    this.zip = zip;
    this.city = city;
    this.state = state;
    this.cityState = cityState;
    this.source = source;
}

function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('location')),
            {types: ['geocode']}
        );
    autocomplete.addListener('place_changed', function(){
            console.log("did you clear it?")
            fillFromPlace(autocomplete.getPlace());
            setNavFeaturesWidth();
            // $("#location").attr('size', $("#location").val().length)
            locObj.source = "form";
        });
}
function fillFromLatLng(){
    $("#location-loading").show();
    $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + locObj.lat + "," + locObj.lng).done (
        function(address) {
            console.log(address)
            $("#location-loading").hide();
            $("#location").val(address.results[0].formatted_address);
            setNavFeaturesWidth();
            // $("#location").attr('size', $("#location").val().length)
            fillFromPlace(address.results[0])
        }
    )
}
function fillFromPlace(place) {
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
                    locObj.city = val;
                    break;
                case "administrative_area_level_1":
                    locObj.state = val;
                    break;
                case "postal_code":
                    locObj.zip = val
                    break;
            }
            // document.getElementById(addressType).value = val;
        }
    }
    locObj.cityState = locObj.city + ", " + locObj.state;
    console.log(locObj);
}
function establishLocation(source) {
    loadCnt++;
    $("#location-loading").show();
    if(source === "IP") {
        $.getJSON('https://geoip-db.com/json/').done(
            function(location) {
                locObj = new Location(
                        location.latitude,
                        location.longitude,
                        location.postal,
                        location.city,
                        location.state,
                        location.city + ", " + stateByName[location.state],
                        "IP"
                    )
                if(loadCnt == 1) {initCityState = locObj.cityState}
                    console.log(loadCnt + ": " + locObj.cityState)
                    console.log(locObj)
                $("#location").val(locObj.cityState);
                $("#location-loading").hide();
                setNavFeaturesWidth();
                // $("#location").attr('size', $("#location").val().length)
            }
        );
    } else if (source === "click") {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    var loc = {"lat": position.coords.latitude, "lng": position.coords.longitude}
                    var circle = new google.maps.Circle({center: loc, radius: position.coords.accuracy});
                    autocomplete.setBounds(circle.getBounds());
                    locObj.lat = position.coords.latitude;
                    locObj.lng = position.coords.longitude;
                    fillFromLatLng();
                    locObj.source = "click"

                    console.log("position")
                    console.log(position)
                },
                function() {
                    //do nothing on declination
                });
        }
    } else {
        alert("called establish with no value")
    }
}

function setNavFeaturesWidth(){
    var locInputBox = $("#location");
    if($(window).width() <= 800) {
        // locInputBox.attr('size',"30")
        $("#activities .form-check-label").removeClass("mx-1").addClass("mx-3")
        // locInputBox.removeClass("form-control-inline");
        // locInputBox.addClass("form-control");
    } else {
        // locInputBox.attr('size', "30");
        $("#activities .form-check-label").removeClass("mx-3").addClass("mx-1")
        // locInputBox.removeClass("form-control");
        // locInputBox.addClass("form-control-inline");
    }
}