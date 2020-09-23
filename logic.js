
var weatherAppID = "a8fe1a1c44677133fbab3264e86bad65";
var locID = "iqdeIphOmFTHdvGRonpZrdKkjACvb5Sg";
var city = "";
var state = "";
var todayDate = moment().format('l');
var locationURL;
var lat;
var long;

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
        console.log("City Value" + $('#city').val().trim())
        city = $('#city').val();        
        
        if($('option:selected').attr('value') !== "" ){
            state = $('option:selected').attr('value');
        }     
        locationURL = "https://open.mapquestapi.com/geocoding/v1/address?key=" + locID + "&location="+ city + state;
    } else if($(this).attr('id') === 'zip-btn' && $('#zip').val().trim() !== ""){

        var zip = $('#zip').val();
        var locationURL = "https://open.mapquestapi.com/geocoding/v1/address?key=" + locID + "&location="+ zip;
    }






        $.ajax({
            url: locationURL,
            method: "GET",
            }).then(function (locationData) {
                var locationResults = locationData.results[0].locations[0]
                lat = locationResults.displayLatLng.lat;
                lon = locationResults.displayLatLng.lng;
                var fiveDayURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&units=imperial&appid=" + weatherAppID;
                // console.log(locationData.results[0].locations[0].adminArea5);
                // console.log(locationData.results[0].locations[0].adminArea3);
                // console.log(locationData.results[0].locations[0].adminArea1);
                // console.log("Lat " + locationData.results[0].locations[0].displayLatLng.lat);
                // console.log("Lng " + locationData.results[0].locations[0].displayLatLng.lng);
                $.ajax({
                url: fiveDayURL,
                method: "GET",
                }).then(function (fiveDayData) {
                    city = locationResults.adminArea5;
                    state = locationResults.adminArea3;
                    if (state !== ""){
                        $('#city-name').text(city + ", " + state);
                        $('#search-history').append('<p class="search-p">' + city + ", " + state + '</p>')
                    } else {
                        $('#city-name').text(city);
                        $('#search-history').append('<p class="search-p">' + city + '</p>')
                    }
                    var currentUV = fiveDayData.current.uvi;

                    $('#current-temp').text(Math.round(fiveDayData.current.temp));
                    $('#humidity').text(fiveDayData.current.humidity);
                    $('#hi-temp').text(fiveDayData.daily[0].temp.max.toFixed(1));
                    $('#lo-temp').text(fiveDayData.daily[0].temp.min.toFixed(1));
                    $('#wind').text(Math.round(fiveDayData.current.wind_speed));
                    $('#uv').text(currentUV.toFixed(1));
                    $('#weather-icon').attr('src', "http://openweathermap.org/img/wn/" + fiveDayData.current.weather[0].icon + "@2x.png");
                    console.log(fiveDayData);
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
                        var newDate = $('<h3>').text("9/22/20");
                        var newIcon = $('<img>').attr({'src': "http://openweathermap.org/img/wn/" + fiveDayData.daily[i].weather[0].icon + "@2x.png", 
                                                       "alt": "Weather icon",
                                                        "class": "five-day-icon"});
                        var newTemp = $('<p>').text("Low/High temp: " + fiveDayData.daily[i].temp.min.toFixed(1) + "/" + fiveDayData.daily[i].temp.max.toFixed(1));
                        var newHumidity = $('<p>').text("Humidity: " + fiveDayData.daily[i].humidity);
                        newDiv.append(newDate, newIcon, newTemp, newHumidity);
                        newDiv.appendTo($('#five-day-forcast'));
                        $('#today-weather-data').fadeIn(500);
                        $('#five-day-forcast').delay(500).fadeIn(500);
                    }

                    // $("#current-temp").text("Current temperature: " + data.main.temp.toFixed(1));
                    // $('#humidity').text("Humidity: " + data.main.humidity + "%");
                    // $("#hi-temp").text("High temperature: " + data.main.temp_max);
                    // $("#lo-temp").text("Low temperature: " + data.main.temp_min);

                // for (var a = 0; a < 40; a += 8){
                //     for (var i = 0; i < 8 ; i++){
                //     tempArray.push(forcast.list[a + i].main.temp);
    
                //     }
                // }
                // for (var b = 0; b < tempArray.length; b++)
    
    
                // console.log(data.weather[0].description);
                // $("#city-name").text("City: " + data.name);
                // $("#current-temp").text("Current temperature: " + data.main.temp.toFixed(1));
                // $('#humidity').text("Humidity: " + data.main.humidity + "%");
                // $("#hi-temp").text("High temperature: " + data.main.temp_max);
                // $("#lo-temp").text("Low temperature: " + data.main.temp_min);
            })
            // for (var a = 0; a < 40; a += 8){
            //     for (var i = 0; i < 8 ; i++){
            //     tempArray.push(forcast.list[a + i].main.temp);

            //     }
            // }
            // for (var b = 0; b < tempArray.length; b++)


            // console.log(data.weather[0].description);
            // $("#city-name").text("City: " + data.name);
            // $("#current-temp").text("Current temperature: " + data.main.temp.toFixed(1));
            // $('#humidity').text("Humidity: " + data.main.humidity + "%");
            // $("#hi-temp").text("High temperature: " + data.main.temp_max);
            // $("#lo-temp").text("Low temperature: " + data.main.temp_min);
        })
       // console.log(tempArray);



});