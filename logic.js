
var appID = "a8fe1a1c44677133fbab3264e86bad65";
var city = "";
var state = "";
$('.submit-btn').on('click', function(event){
    event.preventDefault()
    
    if($(this).attr('id') === 'city-btn' && $('#city').val().trim() !== ""){
        //Search by City
        city = $('#city').val();        
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + appID;
            
                
    } else if($(this).attr('id') === 'zip-btn' && $('#zip').val().trim() !== ""){
        //Searcg by zip
        var zip = $('#zip').val();
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zip + "&units=imperial&appid=" + appID;
    }

    
        $.ajax({
            url: queryURL,
            method: "GET",
          }).then(function (data) {
            console.log(data);
            $("#city-name").text("City: " + data.name);
            $("#current-temp").text("Current temperature: " + data.main.temp.toFixed(1));
            $('#humidity').text("Humidity: " + data.main.humidity + "%");
            $("#hi-temp").text("High temperature: " + data.main.temp_max);
            $("#lo-temp").text("Low temperature: " + data.main.temp_min);
        })
    

});