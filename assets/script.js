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
        })

    renderButtons();
  });

  renderButtons();
