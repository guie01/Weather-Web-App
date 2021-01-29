var topCities = ["Orlando", "Honolulu", "Las Vegas", "Miami", "Los Angeles"];

// Function that creates Top Cities searched
function renderButtons() {

    $("#city-buttons").empty();

    // Looping through the array of movies
    for (var i = 0; i < topCities.length; i++) {

      var a = $("<button>");
      a.addClass("cities-btn");
      // Adding a data-attribute
      a.attr("data-name", topCities[i]);
      // Providing the initial button text
      a.text(topCities[i]);
      // Adding the button to the buttons-view div
      $("#city-buttons").append(a);
    }
  }

// This function adds buttons cities previously searched

  $("#city-inputbtn").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var cityInput = $("#city-input").val().trim();
    // Adding city from the textbox and push it to our array
    topCities.push(cityInput);

    //AJAX CALL 
    cityName = cityInput;
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=7711a0edefc76492174a095e3f34f4d7";
                  
    
      $.ajax({
        url: queryURL,
        method: "GET"

        })
        .then(function (response) {
          console.log(queryURL);

          console.log(response);

          var cityContainer = $("<div>");
          var cityTitle = $("<h1>");

          cityContainer.append(cityTitle);
          cityTitle.text(response.name);
          $("#cities-container").append(cityContainer);
        })

        var queryURL2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=7711a0edefc76492174a095e3f34f4d7";

        $.ajax({
          url: queryURL2,
          method: "GET"
  
          })
          .then(function (response) {
            console.log(queryURL2);
  
            console.log(response); 

            var forecastDay1Cont = $("<div>");
            var forecastDay1Date = $("<p>");
            var forecastDay1Img = $("<img>");
            var forecastDay1Temp = $("<p>");
            var forecastDay1Hum = $("<p>");

            forecastDay1Cont.append(forecastDay1Date);
            forecastDay1Cont.attr("id", "forecast-cont");
            forecastDay1Date.text(moment(response.list[4].dt_txt).format('L'));
            $("#weather-container").append(forecastDay1Cont);

            forecastDay1Cont.append(forecastDay1Img);
            var imgIcon = response.list[4].weather[0].icon;
            forecastDay1Img.attr("src", "http://openweathermap.org/img/wn/" + imgIcon + "@2x.png");
          })

      //   <div id = city-titlecont>
      //   <h1 class = city-title>Atlanta</h1>
      //   </div>
      // <div id = city-temp>TEMP</div>
      // <div id = city-humidity>HUMIDITY</div>
      // <div id = city-uvindex>UV INDEX</div>



    renderButtons();
  });

  renderButtons();


  for(var i = 4; i<37; i+=8){
    console.log(i);
  }
