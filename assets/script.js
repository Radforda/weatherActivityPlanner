
// all units should be in F mph 
var walk={
    name: "Walking",
    tempMax:85,
    tempMin:55,
    windMin:0,
    windMax:20,
    skyCondition:{clear, cloudy},//will need updated depending on the API
    precip:{none}
};

var sail={
    name:"Sailing",
    tempMax:110,
    tempMin:60,
    windMin:10,
    windMax:20,
    skyCondition:[clear, cloudy],//will need updated depending on the API
    precip:[none, lightRain]
};


//We need link to radio buttons and this array this is just a test array
var selectedActivityArray={walk, sail}


//this will be populated with weather API data these are test days currently
var dayArray=[
    {
       name:"Monday",
       tempMax:110,
       tempMin:60,
       windMin:10,
       windMax:20,
       skyCondition:{clear, cloudy},//will need updated depending on the API
       precip:{none, lightRain}
    },
    {
    name:"tuesday",
    tempMax:0,
    tempMin:-40,
    windMin:10,
    windMax:20,
    skyCondition:{clear, cloudy},//will need updated depending on the API
    precip:{none, lightRain}
    }    
];



//loop through the activies array and day array
function checkWeather(){
    for (var i=0; i<selectedActivityArray.length;i++){
        for(var j=0; j<dayArray;j++){
            goodDay(selectedActivityArray[i], dayArray[j]);
        };
    };
};

//compare activity properties to day properties to determine if the activity is recomended for that day
function goodDay (activity, day){
    if (
    activity.tempMax>day.tempMax && activity.tempMin>day.tempMin
    && activity.windMax>day.windMax && activity.windMin>day.windMin
    && activity.skyCondition.indexOf(day.skyCondition)<=0
    && activity.precip.indexOf(day.precip)<=0){ 
    
            return(activity.name, day.name)
        
    }
    

};