const container = document.getElementById('imgContainer');
const slide1 = document.getElementById('slide1');
const slide2 = document.getElementById('slide2');
const slide3 = document.getElementById('slide3');
const slides = [slide1, slide2, slide3];
const image = document.getElementById('centerImage');
const startPoint = 50; // scrollY when it snaps to center
const endPoint = 2200; // scrollY when it snaps out of center
const switchPoints = [200, 900, 1600]; // scrollY thresholds to change image
let currentSlide = 0;

window.addEventListener('scroll', () => {
    const scroll = window.scrollY;

    // Snap to center after snapPoint
    if (scroll >= startPoint && scroll < endPoint) {
        container.classList.add('fixed');
        container.style.top = '';
        container.style.transform = '';
    } else if (scroll < startPoint) {
        container.classList.remove('fixed');
        container.style.top = '';
        container.style.transform = '';
    } else if (scroll >= endPoint) {
        container.classList.remove('fixed');
        container.style.top = `${endPoint + 10}px`;
        container.style.transform = 'translateX(-50%)';
    }

    let newSlide = currentSlide; // Track the new slide index

    // Switch between images based on scroll
    if (scroll < switchPoints[1]) {
        newSlide = 0;
        slides[0].style.opacity = '1';
        slides[0].style.top = '0';
        slides[1].style.top = '-10%';
        slides[1].style.opacity = '0';
    } else if (scroll < switchPoints[2]) {
        newSlide = 1;
        slides[0].style.top = '10%';
        slides[0].style.opacity = '0';
        slides[1].style.top = '0';
        slides[1].style.opacity = '1';
        slides[2].style.opacity = '0';
        slides[2].style.top = '-10%';
    } else {
        newSlide = 2;
        slides[1].style.top = '10%';
        slides[1].style.opacity = '0';
        slides[2].style.top = '0';
        slides[2].style.opacity = '1';
    }

    // Only call fadeGlow if the slide has changed
    if (newSlide !== currentSlide) {
        fadeGlow();
        currentSlide = newSlide; // Update currentSlide
    }
});

function fadeGlow() {
    container.classList.add('fade');
    setTimeout(() => {
        container.classList.remove('fade');
    }, 200);
}