
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
                lat = locationData.results[0].locations[0].displayLatLng.lat;
                lon = locationData.results[0].locations[0].displayLatLng.lng;
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
                    console.log(Math.round(fiveDayData.current.temp));
                    for (var i = 1; i < 6 ; i++){
                        console.log(fiveDayData.daily[i].dt);
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