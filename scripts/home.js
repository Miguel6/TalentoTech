let currentSlideIndex = 0;

setTimeout(() => {
    console.log('Iniciando');
    autoIncrementSlide();
    setInterval(() => {
        autoIncrementSlide();
    }, 500000);
}, 500)

function autoIncrementSlide() {
    goToSlide(currentSlideIndex);
    currentSlideIndex++;
}

function prevSlide() {
    currentSlideIndex--;
    goToSlide(currentSlideIndex--);
}

function nextSlide() {
    currentSlideIndex++;
    goToSlide(currentSlideIndex++);
}

function goToSlide(index) {
    let slides = Array.from(document.getElementsByClassName("main-slideshow"));
    let dots = Array.from(document.getElementsByClassName("dot-selector-slideshow"));

    if (index > slides.length - 1) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[currentSlideIndex].style.display = "block";
    dots[currentSlideIndex].className += " active";
}
