var topics = ['Happy', 'Congrats', 'Dance', 'Laugh']
var giphyResults = {};

$(document).ready(function() {
    addCreateTopicButtonListener();   
    addClearGifButtonListener(); 
    
    startingAnimation();

    renderButtons();

    $(document).on("click ", '.topic-btn', function() {
        var topicOfButton = $(this).attr("data-topic");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          topicOfButton + "&api_key=fNDrarOYEB8zX8lMfPgf1PzyyjUvJJP4";

    //     $.ajaxPrefilter(function(options) {
    //        if (options.crossDomain && $.support.cors) {
    //            options.url = 'https://cors-anywhere.herokuapp.com/' + options.queryURL;
    //        }
    //    });

  
        $.ajax({
          url: queryURL,
          method: "GET"
        })
        .then(function(response) {
            giphyResults = response.data;

            $.each(giphyResults, function (key) {
                var gifDiv = $("<div id="+key+">");
                gifDiv.addClass('gif');
                
                var rating = giphyResults[key].rating;
                var p = $("<p>").text("Rating: " + rating);
                
                var topicImage = $("<img>");
                topicImage.attr("src", giphyResults[key].images.fixed_height_still.url);
                
                gifDiv.prepend(p);
                gifDiv.prepend(topicImage);
    
                $("#gifsContainer").prepend(gifDiv);

                $(document).on('click', '#'+key , function () {
                    console.log($('#'+key));
                    topicImage.attr("src", giphyResults[key].images.fixed_height.url);
                    
                    
                });
            });

        });

    });

    


});

function addGifClickEvent() {
    // $(document).on('click','.gif', function () {
    //     .attr('src', giphyResults.key);
    // });
}

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

