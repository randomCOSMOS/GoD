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
    $(".gif").attr("src", "./assets/loading.png");
    let search = $("#text").val();
    showGif(search);
    $("#query").html(search);
});

$(".random").on("click", () => {
    $(".gif").attr("src", "./assets/loading.png");
    say(" ");
    say("random word...")   
    getData(wordnikAPI)
        .then(data => {
            $("#query").html(data.word);
            showGif(data.word)
        });
});

if ((window.location.href).indexOf('localhost') !== 7) {
    var loc = window.location.href + '';
    if (loc.indexOf('http://') == 0) {
        window.location.href = loc.replace('http://', 'https://');
    }
}