let desktopBackground = '../assets/background/mist.jpg';
$('#desktop').css('background-image', `url(${desktopBackground})`);

let date = new Date();
let today = date.getDate();
let month = date.getMonth();
let fullYear = date.getFullYear();
let hour = date.getHours();
let minutes = date.getMinutes();

function updateTime() {
    $("#date").text(`${today}-${month}-${fullYear}`);
    $("#time").text(`${hour}:${minutes}`);
}

setInterval(updateTime, 1000);