
var weatherAppID = "a8fe1a1c44677133fbab3264e86bad65";
var locID = "iqdeIphOmFTHdvGRonpZrdKkjACvb5Sg";
var city = "";
var todayDate = moment().format('l');
var locationURL;
var lat;
var long;

//console.log(moment().add(1, 'days').format('l'));
$('.submit-btn').on('click', function(event){
    event.preventDefault()
    var state = "";
    var locationURL = "https://open.mapquestapi.com/geocoding/v1/address?key=iqdeIphOmFTHdvGRonpZrdKkjACvb5Sg&location=victorville,ca"

    if($(this).attr('id') === 'city-btn' && $('#city').val().trim() !== ""){
        //Search by City
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
                    $('#city-name').text(locationResults.adminArea5 + ", " + locationResults.adminArea3);
                    $('#current-temp').text(Math.round(fiveDayData.current.temp));
                    $('#humidity').text(fiveDayData.current.humidity);
                    $('#hi-temp').text(fiveDayData.daily[0].temp.max.toFixed(1));
                    $('#lo-temp').text(fiveDayData.daily[0].temp.min.toFixed(1));
                    $('#wind').text(Math.round(fiveDayData.current.wind_speed));
                    $('#uv').text(fiveDayData.current.uvi.toFixed(1));
                    $('#weather-icon').attr('src', "http://openweathermap.org/img/wn/" + fiveDayData.current.weather[0].icon + "@2x.png");
                    $('#today-weather-data').fadeIn(250);
                    console.log(fiveDayData);
                    for (var i = 1; i < 6 ; i++){
                    
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