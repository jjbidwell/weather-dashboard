
var weatherAppID = "a8fe1a1c44677133fbab3264e86bad65";
var locID = "iqdeIphOmFTHdvGRonpZrdKkjACvb5Sg";
var city = "";
var state = "";
var historyArray =[""];
var todayDate = moment().format('l');
var locationURL;
var fiveDayURL;
var locationResults;
var lat;
var long;


function render(){
    if(localStorage.getItem('search history') !== null){
        historyArray = localStorage.getItem('search history').split(',');
        for(var a = 0; a < 10 && a < historyArray.length; a++){
        $('#history-'+ a).text(historyArray[a]);
        }
    }
    
}
render();
//console.log(moment().add(1, 'days').format('l'));
$('.submit-btn').on('click', function(event){
    event.preventDefault();

    if($(this).attr('id') === 'city-btn' && $('#city').val().trim() === "" || $(this).attr('id') === 'zip-btn' && $('#zip').val().trim() === ""){
        alert('You must enter either a city or zip code to proceed');
        return;
    }

    var locationURL = "https://open.mapquestapi.com/geocoding/v1/address?key=iqdeIphOmFTHdvGRonpZrdKkjACvb5Sg&location=victorville,ca"

    if($(this).attr('id') === 'city-btn' && $('#city').val().trim() !== ""){
        //Search by City
        city = $('#city').val();        
        

        if($('option:selected').attr('value') === "" )  {
            alert('You must select a state, territory, or outside the US to proceed');
            return;
        }else if($('option:selected').attr('value') !== "-" ){
            state = $('option:selected').attr('value');
        } 
        locationURL = "https://open.mapquestapi.com/geocoding/v1/address?key=" + locID + "&location="+ city + state;
    } else if($(this).attr('id') === 'zip-btn' && $('#zip').val().trim() !== ""){
        //search by Zip
        var zip = $('#zip').val();
        var locationURL = "https://open.mapquestapi.com/geocoding/v1/address?key=" + locID + "&location="+ zip;
    } else if($(this).attr('class') === 'submit-btn search-p'){
        //Click on search history
        fullCity = $(this).text();
        var space = fullCity.lastIndexOf(" ")
        city = fullCity.slice(0, space);
        state = fullCity.slice(space);
        locationURL = "https://open.mapquestapi.com/geocoding/v1/address?key=" + locID + "&location="+ city + "," + state;
    }

    
        $.ajax({
            url: locationURL,
            method: "GET",
            }).then(function (locationData) {
                locationResults = locationData.results[0].locations[0]
                lat = locationResults.displayLatLng.lat;
                lon = locationResults.displayLatLng.lng;
                fiveDayURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&units=imperial&appid=" + weatherAppID;
                $.ajax({
                url: fiveDayURL,
                method: "GET",
                }).then(function (fiveDayData) {
                    
                        city = locationResults.adminArea5;
                        state = locationResults.adminArea3;
                    if (state !== ""){
                        $('#city-name').text(city + " " + state);
                    } else if (state === ""){
                        $('#city-name').text(city);
                    }

                    if(historyArray.indexOf(city + " " + state) === -1){
                       // $('#search-history').append('<p class= "submit-btn search-p">' + city + ", " + state + '</p>');
                        historyArray.unshift(city + " " + state);
                    } else if(historyArray.indexOf(city + " " + state) === -1){
                       // $('#search-history').append('<p class= "submit-btn search-p">' + city + '</p>');
                        historyArray.unshift(city);
                    }
                    
                    
                    if (historyArray.length > 10){
                        historyArray.pop();
                    }
                    localStorage.setItem('search history', historyArray);
                    render();
                    var currentUV = fiveDayData.current.uvi;

                    $('#current-temp').text(Math.round(fiveDayData.current.temp));
                    $('#humidity').text(fiveDayData.current.humidity);
                    $('#hi-temp').text(fiveDayData.daily[0].temp.max.toFixed(1));
                    $('#lo-temp').text(fiveDayData.daily[0].temp.min.toFixed(1));
                    $('#wind').text(Math.round(fiveDayData.current.wind_speed));
                    $('#uv').text(currentUV.toFixed(1));
                    $('#weather-icon').attr('src', "http://openweathermap.org/img/wn/" + fiveDayData.current.weather[0].icon + "@2x.png");
                    $('#five-day-forcast').empty();
                    $('#five-day-forcast').css('display', "none");
                    $('#today-weather-data').css('display', "none");

                    if(currentUV <= 2){
                        $('#uv').css({'background-color': 'green', 'color': "white"})
                    } else if(currentUV > 2 && currentUV <=5){
                        $('#uv').css({'background-color': 'yellow', 'color': "black"})
                    } else if(currentUV > 5 && currentUV <= 7){
                        $('#uv').css({'background-color': 'orange', 'color': "white"})
                    } else if(currentUV > 7){
                        $('#uv').css({'background-color': 'red', 'color': "white"})
                    }


                    for (var i = 1; i < 6 ; i++){
                        var newDiv = $('<div>').attr({'class': 'column weather-forcast',
                                                      'id': "day-" + i });
                        var newDate = $('<h3>').text(moment().add(i, 'days').format('l'));
                        var newIcon = $('<img>').attr({'src': "http://openweathermap.org/img/wn/" + fiveDayData.daily[i].weather[0].icon + "@2x.png", 
                                                       "alt": "Weather icon",
                                                        "class": "five-day-icon"});
                        var newTemp = $('<p>').html("Low/High temp: <span class='bold'>" + fiveDayData.daily[i].temp.min.toFixed(1) + "/" + fiveDayData.daily[i].temp.max.toFixed(1) + "</span>");
                        var newHumidity = $('<p>').html("Humidity: <span class='bold'>" + fiveDayData.daily[i].humidity + "</span>%");
                        newDiv.append(newDate, newIcon, newTemp, newHumidity);
                        newDiv.appendTo($('#five-day-forcast'));
                        $('#today-weather-data').fadeIn(500);
                        $('#five-day-forcast').delay(500).fadeIn(500);
                    }


    
                
            })


            
        })

$('select').prop('selectedIndex', 0);
$('#city').val('');
$('#zip').val('')

});