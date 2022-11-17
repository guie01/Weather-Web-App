var searches = JSON.parse(localStorage.getItem("searches")) || ["Orlando", "Honolulu", "Las Vegas", "Miami", "Los Angeles"];


// Function that creates Top Cities searched
function renderTopSearches() {

    $("#city-buttons").empty();

    // Looping through the array of movies
    for (var i = 0; i < searches.length; i++) {

      var a = $("<button>");
      a.addClass("cities-btn");
      // Adding a data-attribute
      a.attr("data-name", searches[i]);
      // Providing the initial button text
      a.text(searches[i]);
      // Adding the button to the buttons-view div
      $("#city-buttons").append(a);
    }
  }

  $("#city-inputbtn").on("click", function(event) { 
    // This line grabs the input from the textbox
    var cityInput = $("#city-input").val().trim();
    // Adding city from the textbox and push it to our array
    searches.push(cityInput);
    localStorage.setItem("searches", JSON.stringify(searches));
    displayInformation(cityInput);
  });

// This function adds buttons cities previously searched
function displayInformation (cityInput){
  event.preventDefault();
  $("#cities-container").empty();
  $("#weather-container").empty();
  $("#weather-container").append($("<h4>").text("Forecast").append());

  //AJAX CALL 
  cityName = cityInput;
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=7711a0edefc76492174a095e3f34f4d7";
                  
    
      $.ajax({
        url: queryURL,
        method: "GET"

        })
        .then(function (response) {
          console.log(queryURL);

          console.log(response);

          var cityContainer = $("<div>");
          var cityTitle = $("<h1>");
          var cityHumid = $("<p>");
          var cityWind = $("<p>");
          var cityTemp = $("<p>");
          var cityUV = $("<p>");

          //Title
          cityContainer.append(cityTitle);
          cityTitle.text(response.name);
          $("#cities-container").append(cityContainer);

          //Humidity
          cityHumid.text("Humidity: " + response.main.humidity);
          $("#cities-container").append(cityHumid);

          //Wind
          cityWind.text("Wind Speed: " + response.wind.speed);
          $("#cities-container").append(cityWind);

          //Temp
          cityTemp.text("Temperature " + response.main.temp);
          $("#cities-container").append(cityTemp);

          var lon = JSON.stringify(response.coord.lon);
          var lat = JSON.stringify(response.coord.lat);

          var queryURLUV = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude={part}&appid=7711a0edefc76492174a095e3f34f4d7";

          console.log(lon);
          console.log(lat);

          $.ajax({
            url: queryURLUV,
            method: "GET"
    
            })
            .then(function (response) {
              console.log(queryURLUV);
    
              console.log(response);

              // UV Index 
              var uvIndex = response.current.uvi
              cityUV.text("UV Index: " + uvIndex);
              $("#cities-container").append(cityUV);

              if(uvIndex<4){
                cityUV.css("color","green");
                cityUV.css("font-weight","700");
              } else if(uvIndex>10){
                cityUV.css("color","red");
                cityUV.css("font-weight","700");
              } else{
                cityUV.css("color","yellow");
                cityUV.css("font-weight","700");
              }
          })


         })



        var queryURL2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=7711a0edefc76492174a095e3f34f4d7";

        $.ajax({
          url: queryURL2,
          method: "GET"
  
          })
          .then(function (response) {
            console.log(queryURL2);
  
            console.log(response); 
            // 5 day for loop
            for(var i = 6; i<39; i+=8){
              console.log(i);

            var forecastDay1Cont = $("<div>");
            var forecastDay1Date = $("<p>");
            var forecastDay1Img = $("<img>");
            var forecastDay1Temp = $("<p>");
            var forecastDay1Hum = $("<p>");
            var forecastTest = $("<p>");
            
          
            forecastDay1Cont.append(forecastDay1Date);
            forecastDay1Cont.attr("id", "forecast-cont");
            forecastDay1Date.text(moment(response.list[i].dt_txt).format('L'));
            $("#weather-container").append(forecastDay1Cont);

            //Icon
            forecastDay1Cont.append(forecastDay1Img);
            var imgIcon = response.list[i].weather[0].icon;
            forecastDay1Img.attr("src", "http://openweathermap.org/img/wn/" + imgIcon + "@2x.png");

            //Temp
            forecastDay1Cont.append(forecastDay1Temp);
            forecastDay1Temp.text("Temp: "+ response.list[i].main.temp);
            
            //Humid
            forecastDay1Cont.append(forecastDay1Hum);
            forecastDay1Hum.text("Humidity: " + response.list[i].main.humidity);
            }
          })

          
    renderTopSearches();
  }; 
  renderTopSearches();

  
$("#city-buttons").on("click", ".cities-btn", function(event){
  var cityClicked = event.target.getAttribute("data-name");
  displayInformation(cityClicked);
})