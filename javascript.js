$(document).ready(function() {
  //initial array of Reactions
  var reactions = [
    "yes",
    "no",
    "maybe",
    "happy",
    "sad",
    "angry",
    "concerned",
    "shrug",
    "blush",
    "dance",
    "sleepy"
  ];

  //actually shows the GIFS in the DOM
  function displayGIFs() {
    //empty out so they dont keep stacking
    $("#gifsgohere").empty();
    //calls the reaction-name attribute in each query?
    var reaction = $(this).attr("reaction-name");
    //putting the link together
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      reaction +
      "&api_key=dc6zaTOxFJmzC&limit=10";

    //AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);

      var results = response.data;

      // Looping through each result item
      for (var i = 0; i < results.length; i++) {
        //new div for rating and gif included
        var ratingandgif = $("<div class='rateandgif'>");
        console.log(response);
        //gettin the infos from the GET
        var imageUrl = response.data[i].images.fixed_height.url;
        var stillUrl = response.data[i].images.fixed_height_still.url;
        var rating = response.data[i].rating;

        //div for the gif itself
        var gifDiv = $("<img>");
        //p tag for the rating
        var p = $("<p>").text("Rating: " + results[i].rating);
        var q = $("<p>").text("Title: " + results[i].title);
        var dl = results[i].images.original.url;
        //add some attributes
        gifDiv.attr("src", stillUrl);
        gifDiv.attr("animatedUrl", imageUrl);
        gifDiv.attr("stillUrl", stillUrl);
        gifDiv.attr("state", "still");
        gifDiv.addClass("gif");

        //put the title and rating and the gif in the div
        ratingandgif.append(gifDiv);

        ratingandgif.append(q);;

        ratingandgif.append(p);

        //put the div in the other div, wow my comments suck
        $("#gifsgohere").append(ratingandgif);
      }
    });
  }

  //actually shows the buttons in the DOM
  function displayButtons() {
    $("#buttonsgohere").empty();

    //FOR EVERY REACTION IN THE REACTIONS ARRAY
    for (var i = 0; i < reactions.length; i++) {
      //make a god damn button amd add class/attributes to it and stick it in the right div
      var butt = $("<button>");
      butt.addClass("button");
      butt.attr("reaction-name", reactions[i]);
      butt.text(reactions[i]);
      $("#buttonsgohere").append(butt);
    }
  }

  //when that submit button is pressed this happens
  $("#add-reaction").click(function(event) {
    if ($("#search-input").val()) {
      event.preventDefault();

      var newthing = $("#search-input")
        .val()
        .trim();
      //shoves the new reaction into the reactions array
      reactions.push(newthing);
      $("#search-input").val("");
      //show all da buttonz
      displayButtons();
    } else {
      alert("Please enter valid text");
    }
  }); //closing the submit button function

  //whenever an actual reaction button is pressed its gonna show the gifs
  $(document).on("click", ".button", displayGIFs);

  //ctoggles gifs to be still and animated
  function toggleGif() {
    //THIS GIF's STATE is  now stored in state
    var state = $(this).attr("state");

    //if state is STILL, then
    if (state === "still") {
      //change state to animate and make the src attricute into the animated url of this gfi
      $(this).attr("src", $(this).attr("animatedUrl"));
      $(this).attr("state", "animate");
    }

    //if the state is NOT STILL aka animate
    else {
      //change state to still and make it move
      $(this).attr("src", $(this).attr("stillUrl"));
      $(this).attr("state", "still");
    }
  } // closing for toggleGif

  //listening for clicks on class .gif
  $(document).on("click", ".gif", toggleGif);

  //display initial buttons with this
  displayButtons();
}); ///closing for document ready
