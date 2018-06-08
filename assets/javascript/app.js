$(document).ready(function () {

    var topics = ["ducks", "cats", "dogs", "giraffe"];

    var giphyApiKey = "&api_key=tVjGOCsWzlMoY4VZXjENFAx3aRPFuooF";

    var searchTerm = "?tag=" + "duck";

    var giphyApi = "https://api.giphy.com/v1/gifs/random" + searchTerm + giphyApiKey;

    var gif;

    var gifTitle;

    var gifRating;

    var searchCount = 10;

    var createCard = function () {
        var cardCol = $("<div>");
        $(cardCol).addClass("col s12 m2");
        $(".gif-container").append(cardCol);

        var card = $("<div>");
        $(card).addClass("card small");

        $(cardCol).append(card);

        var cardImage = $("<div>");
        $(cardImage).addClass("card-image");
        $(card).append(cardImage);

        var img = $("<img>").attr("src", gif);
        $(cardImage).append(img);

        var cardContent = $("<div>");
        $(cardContent).addClass("card-content");
        $(card).append(cardContent);

        var cardTitle = $("<span>");
        $(cardTitle).addClass("card-title");
        $(cardTitle).text(gifTitle);
        $(cardContent).append(cardTitle);

        var cardp = $("<p>");
        $(cardp).text("Rating: " + gifRating);
        $(cardContent).append(cardTitle);

        var cardAction = $("<div>");
        $(cardAction).addClass("card-action");
        $(card).append(cardAction);

        var a = $("<a>");
        $(a).attr("href", "#");
        $(a).text("Download");
        $(cardAction).append(a);
        console.log("ran")

    }

    var createButtons = function () {
        $(".buttons").empty();
        for (i = 0; i < topics.length; i++) {
            var button = $("<a>").addClass("waves-effect waves-light btn-small button").text(topics[i]);
            $(".buttons").append(button);
        }
    }

    $("body").on("click", ".button", function () {
        searchTerm = "?tag=" + $(this).text();
        giphyApi = "https://api.giphy.com/v1/gifs/random" + searchTerm + giphyApiKey;
        console.log(searchTerm);
        search();
    })

    createButtons();

    var search = function () {
        $(".gif-container").empty();
        for (j = 0; j < searchCount; j++) {
            $.ajax({
                url: giphyApi,
                method: "GET"
            }).then(function (response) {
                // console.log("ran");
                console.log(response);
                var result = response.data;

                // console.log(result);

                gif = result.fixed_height_downsampled_url;
                gifRating = result.rating;
                if (result.title) {
                    gifTitle = result.title;

                }
                else {
                    gifTitle = "No Title";
                }
                createCard();
            });
        }
    }

    $("#submit").on("click", function () {
        if ($("#add-topic").val()) {
            topics.push($("#add-topic").val());
            $("#add-topic").val("");
            M.updateTextFields();
            createButtons();
        }
    })

    search();
});