var topics = ['Happy', 'Congrats', 'Dance', 'Laugh']

$(document).ready(function() {
    addCreateTopicButtonListener();   
    addClearGifButtonListener(); 
    
    startingAnimation();

    renderButtons();

    $(document).on("click ", '.topic-btn', function() {
        var topicOfButton = $(this).attr("data-topic");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          topicOfButton + "&api_key=dc6zaTOxFJmzC&limit=10";
  
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            var results = response.data;
            console.log(results)

            for (var i = 0; i < results.length; i++) {
              var gifDiv = $("<div>");
  
              var rating = results[i].rating;
  
              var p = $("<p>").text("Rating: " + rating);
  
              var topicImage = $("<img>");
              topicImage.addClass('gif');
              topicImage.attr("src", results[i].images.fixed_height.url);
  
              gifDiv.prepend(p);
              gifDiv.prepend(topicImage);
  
              $("#gifsContainer").prepend(gifDiv);

            //   $(document).on('click','.gif', function () {
            //       topicImage.attr('src', result[i].images.fixed_height.url);
            //   });
            }
          });
      });



});

function startingAnimation () {
    setTimeout(function(){
        $('.lead').removeClass('d-none');
        $('.lead').addClass('animated slideInLeft 3s');
    },1500);
    // setTimeout(function(){
    //     $('.navBarBrand').removeClass('animated pulse infinite');
    // },1500);
}

function renderButtons() {
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    for (var i = 0; i < topics.length; i++) {
      var a = $("<button>");
      a.addClass("topic-btn btn btn-sm");
      a.attr("data-topic", topics[i]);
      a.text(topics[i]);
      $("#buttons-view").append(a);
    }
}

function addClearGifButtonListener() {
    $('#clearGifs').on('click', function () {
        clearGifs();
    });
} 



function clearGifs() {
    $('#gifsContainer').empty();
}

function addCreateTopicButtonListener () {
    $("#create-topic").on("click", function(event) {
    event.preventDefault(); 
    var topic = $("#searchBar").val().trim();

    topics.push(topic);

    renderButtons();
    });
}

