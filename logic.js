
var appID = "a8fe1a1c44677133fbab3264e86bad65";
var city = "";
var state = "";
$('.submit-btn').on('click', function(event){
    event.preventDefault()
    
    if($(this).attr('id') === 'city-btn' && $('#city').val().trim() !== ""){
        //Search by City
        city = $('#city').val();        
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appID;
            
                
    } else if($(this).attr('id') === 'zip-btn' && $('#zip').val().trim() !== ""){
        //Searcg by zip
        var zip = $('#zip').val();
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zip + "&appid=" + appID;
    }

    
        $.ajax({
            url: queryURL,
            method: "GET",
          }).then(function (data) {
            console.log(data);
        })
    

});