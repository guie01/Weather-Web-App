var topCities = ["Orlando", "Honolulu", "Las Vegas", "Miami", "Los Angeles"];


// 
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

    renderButtons();
  });

  renderButtons();
