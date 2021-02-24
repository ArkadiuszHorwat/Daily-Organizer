let slideNumber = 0;
nextSlide();

function nextSlide(){
    let i;
    const weatherBg = document.querySelector('.weather-container');
    for(i = 0; i < 4; i++){
        weatherBg.classList.remove(`slide${slideNumber}`);
    }
    slideNumber++;
    if(slideNumber > 5) {slideNumber = 1}
    weatherBg.classList.add(`slide${slideNumber}`);
    setTimeout(nextSlide,5000);
}







