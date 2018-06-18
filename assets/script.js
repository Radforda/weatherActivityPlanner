
// all units should be in F mph 

//variables
var walk={
    name: "Walking",
    tempMax:80,
    tempMin:55,
    windMin:0,
    windMax:20,
    skyCondition:['clear', 'cloudy'],//will need updated depending on the API
    precip:['none']
};

var sail={
    name:"Sailing",
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

var dayArray=[day1, day2];
//We need link to radio buttons and this array this is just a test array
var selectedActivityArray=[walk, sail];

//will be linked to submit button
checkWeather();

//loops through the activies array and day array and runs isItAGoodDay function to compare them.
function checkWeather(){
    console.log("check weather is running");
    console.log("selected activity array length: "+selectedActivityArray.length);
    console.log("day array length: "+dayArray.length)
    for (var i=0; i<selectedActivityArray.length; i++){
        console.log("i: "+i);
        for(var j=0; j<dayArray.length;j++){
            console.log("j: "+j);
            
            isItAGoodDay(selectedActivityArray[i], dayArray[j]);
        };
    };
};

//compare activity properties to day properties to determine if the activity is recomended for that day.
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