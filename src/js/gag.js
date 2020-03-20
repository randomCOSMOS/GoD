// API address
const giphyAPI = "https://api.giphy.com/v1/gifs/search?api_key=YMW1ZsxVp8JDNIuz6TdMv48tk7fyTrzm&limit=25&offset=0&rating=G&lang=en&q=";
const wordnikAPI = "http://api.wordnik.com/v4/words.json/randomWord?api_key=8nqhsvilsbiip1s14s9ti5ip5xvrcihstf9eov0q2izmc6wzr";


// things to do on start
window.onload = () => $("#text").val("");


// functions
const say = (something) => console.log(something);

const getData = async (url) => {

    const response = await fetch(url);
    const json = await response.json();
    return json;

}

const keyUp = () => {
    if (event.keyCode === 13) {
        $(".submit").click();
    }
}

const showGif = async (query) => {
    let r = Math.floor(Math.random() * 20);

    const data = await getData(giphyAPI + query);
    try {
        say(data);
        const gifUrl = await data.data[r].images.downsized_large.url;
        $(".gif").attr("src", gifUrl);
    } catch (err) {
        say("can't find image");
        $(".random").click();
    }

}


// Code
$("#text").on("keyup", keyUp);

$(".submit").on("click", () => {
    let search = $("#text").val();
    showGif(search);
    $(".ys").remove();
    $(".hide").hide();
    $(".show").show();
});

$(".random").on("click", () => {
    say(" ");
    say("random word...")
    getData(wordnikAPI)
        .then(data => showGif(data.word));
    $(".ys").remove();
    $(".hide").hide();
    $(".show").show();

});

$(".show").on("click", () => {
    fetch("/server")
        .then(response => response.json())
        .then(json => {
            for (item of json) {
                let youSearched = $("<p class=\"ys\"></p>").text(item.query + ", ");
                $(".wys").append(youSearched);
            }
        });
    $(".show").hide();
    $(".hide").show();
});

$(".hide").hide();

$(".hide").on("click", () => {
    $(".ys").remove();
    $(".hide").hide();
    $(".show").show();
});