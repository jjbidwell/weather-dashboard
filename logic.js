
var weatherAppID = "a8fe1a1c44677133fbab3264e86bad65";
var locID = "iqdeIphOmFTHdvGRonpZrdKkjACvb5Sg";
var city = "";
var state = "";
var lat;
var long;
//var tempArray = [];
$('.submit-btn').on('click', function(event){
    event.preventDefault()
var locationURL = "https://open.mapquestapi.com/geocoding/v1/address?key=iqdeIphOmFTHdvGRonpZrdKkjACvb5Sg&location=victorville,ca"
    if($(this).attr('id') === 'city-btn' && $('#city').val().trim() !== ""){
        //Search by City
        city = $('#city').val();        
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + weatherAppID;
        var locationURL =  "https://open.mapquestapi.com/geocoding/v1/address?key=" + locID + "&location=" + city;   
                
    } else if($(this).attr('id') === 'zip-btn' && $('#zip').val().trim() !== ""){
        //Searcg by zip
        var zip = $('#zip').val();
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zip + "&units=imperial&appid=" + weatherAppID;
        var locationURL =  "https://open.mapquestapi.com/geocoding/v1/address?key=" + locID + "&location=" + zip;  

    }

    
        // $.ajax({
        //     url: queryURL,
        //     method: "GET",
        //   }).then(function (data) {
        //     $("#city-name").text("City: " + data.name);
        //     $("#current-temp").text("Current temperature: " + data.main.temp.toFixed(1));
        //     $('#humidity').text("Humidity: " + data.main.humidity + "%");
        //     $("#hi-temp").text("High temperature: " + data.main.temp_max);
        //     $("#lo-temp").text("Low temperature: " + data.main.temp_min);
        // })



        $.ajax({
            url: locationURL,
            method: "GET",
            }).then(function (locationData) {
                console.log(locationData);
               
                var forcastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=minutely,hourly&units=imperial&appid=a8fe1a1c44677133fbab3264e86bad65"
                $.ajax({
                url: forcastURL,
                method: "GET",
                }).then(function (weatherData) {
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