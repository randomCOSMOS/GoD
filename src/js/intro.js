function showWelcome() {
    $('#topic').css('display', 'none');
    $('#welcome').css('display', 'block');
}

function showLoader() {
    $('#welcome').css('display', 'none');
    $('#loader').css('display', 'block');
}

function showDesktop() {
    $('header').css('display', 'none');
    $('#desktop').css('display', 'block');
}

setTimeout(showWelcome, 4000);
setTimeout(showLoader, 8000);
// setTimeout(showDesktop, 19000);
setTimeout(showDesktop, 10);
