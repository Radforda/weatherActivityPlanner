//temporary variables
var zipCode ="23235";
var countryCode="US";
var forecastDays;


//Api call to get array of 
function getForecast(){
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=" + zipCode +","+ countryCode+"&appid=0300e0494f9976a54d845a8f39ccb339";
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {
        console.log(response);
        // YOUR CODE GOES HERE!!!
        forecastDays = response.data;
    
        for (var i = 0; i < results.length; i++) {

        }
    });
}

function 
getForecast();

// all units should be in F mph 

//variables
console.log("I am working......sort of")
var Running={
    name: "Running",
    tempMax:80,
    tempMin:55,
    windMin:0,
    windMax:20,
    skyCondition:['clear', 'cloudy'],//will need updated depending on the API
    precip:['none']
};

var Cycling={
    name:"Cycling",
    tempMax:110,
    tempMin:60,
    windMin:10,
    windMax:20,
    skyCondition:['clear', 'cloudy'],//will need updated depending on the API
    precip:['none', 'lightRain']
};

var Golfing={
    name:"Golfing",
    tempMax:110,
    tempMin:60,
    windMin:10,
    windMax:20,
    skyCondition:['clear', 'cloudy'],//will need updated depending on the API
    precip:['none', 'lightRain']
};

//days will be populated with weather API data these are test days currently
var day1= {
    name:"Monday",
    tempMax:70,
    tempMin:65,
    windMin:15,
    windMax:17,
    skyCondition:"clear",
    precip:'none'

};

var day2={
    name:"tuesday",
    tempMax:70,
    tempMin:60,
    windMin:10,
    windMax:20,
    skyCondition:'clear',
    precip:'none'
};


//We need link to radio buttons to populate this array
var listedActivties = [Cycling,Running,Golfing]
var selectedActivityArray=[];
var dayArray=[day1, day2];



//functions

//this will be called inside the api call or to run after the call is complete and the days have been assigned value


//loops through the activies array and day array and runs isItAGoodDay function to compare them.
function checkWeather(){
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
};

//compare activity properties to day properties to determine if the activity is recomended for that day the console.log it.
//requires two objects as perameters
function isItAGoodDay (activity, day){
    console.log( "checking if "+day.name+" is a good day for "+activity.name+".");
    if (activity.tempMax>day.tempMax && activity.tempMin<day.tempMin){
        console.log("The temp is good")
        if(activity.windMax>day.windMax && activity.windMin<day.windMin){
            console.log("The wind is good")
            if(activity.skyCondition.indexOf(day.skyCondition)<=0){
                console.log("the sky condition is good");
                if(activity.precip.indexOf(day.precip)<=0){
                    console.log(activity.name+" is recommended for "+day.name);
                }else{console.log(activity.name+' is not recommended due to '+day.precip)};
            }else{console.log(activity.name+' is not recommended due to skycondition')};
        }else{console.log(activity.name+' is not recommended due to wind')};    
    }else{console.log(activity.name+' is not recommended due to the tempurature')};  

};




///Daniel Code

let zipApp = new Vue({
    el: "#zip-app",
    data: {
        city: " ",
        state: " ",
        cityString: " ",
        zip: "94301",
        error: ""
    },
    methods: {
        getCity: function() {
            let self = this;
            $.getJSON("https://ZiptasticAPI.com/" + this.zip, function(result) {
                if (result.error) {
                self.error = "zip code not found";
                self.city = "";
                $(".error").addClass("no");
                } else {
                self.city = result.city;
                self.state = result.state;
                self.cityString = " City: " + result.city + " State: " + result.state;
                }
            });
        }
    },
    watch: {
        zip: function() {
            if (this.zip.length === 5) {
                this.getCity();
                this.error = "";
                $(".error").removeClass("no");
            }
            if (this.zip.length < 5) {
                this.city = "";
                this.error = "hey, that's not a zipcode";
            }
        }
    }, 
    mounted: function(){
        this.getCity();
    }
})

var activities = new Vue({
    el: "#activities",
    data: {
        checkedAct: []
    }
})
$("#submit-search").on("click",function(e){
    e.preventDefault();
        $("#submit-search").on("click",function(e){
            e.preventDefault();
            console.log(activities);
            console.log(activities._data.checkedAct[0]);
            console.log(zipApp._data.city);
            selectedActivityArray = activities._data.checkedAct;
            console.log(selectedActivityArray);
            checkWeather();
        })
})