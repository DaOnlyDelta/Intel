const container = document.getElementById('imgContainer');
const slide1 = document.getElementById('slide1');
const slide2 = document.getElementById('slide2');
const slide3 = document.getElementById('slide3');
const slides = [slide1, slide2, slide3];
const image = document.getElementById('centerImage');
const startPoint = 50; // scrollY when it snaps to center
const endPoint = 2278; // scrollY when it snaps out of center
const switchPoints = [200, 900, 1600, endPoint + window.innerHeight - 100]; // scrollY thresholds to change image
let currentSlide = 1;

const btContainer = document.getElementById('bt');
const bt1 = document.getElementById('bt1');
const bt2 = document.getElementById('bt2');
const bt3 = document.getElementById('bt3');

const dotsContainer = document.getElementById('dots');
const dot1 = document.getElementById('dot1');
const dot2 = document.getElementById('dot2');
const dot3 = document.getElementById('dot3');
const dots = [dot1, dot2, dot3];
const arrow = document.getElementById('arrow');

const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const scroll = window.scrollY;

    // Snap to center after snapPoint
    if (scroll >= startPoint && scroll <= endPoint) {
        container.classList.add('fixed');
        container.style.top = '';
        btContainer.classList.add('fixed');
        btContainer.style.top = '';
        dotsContainer.classList.add('fixed');
        dotsContainer.style.top = '';
        nav.classList.remove('fixed');
    } else if (scroll < startPoint) {
        container.classList.remove('fixed');
        container.style.top = '';
        btContainer.classList.remove('fixed');
        btContainer.style.top = '';
        dotsContainer.classList.remove('fixed');
        dotsContainer.style.top = '';
        nav.classList.remove('fixed');
    } else if (scroll > endPoint) {
        container.classList.remove('fixed');
        container.style.top = `${endPoint - 115}px`;
        btContainer.classList.remove('fixed');
        btContainer.style.top = `${endPoint + 540}px`;
        dotsContainer.classList.remove('fixed');
        dotsContainer.style.top = `${endPoint + 340}px`;
        nav.classList.add('fixed');
    }

    let newSlide = currentSlide; // Track the new slide index

    // Switch between images based on scroll
    if (scroll < switchPoints[1]) {
        newSlide = 1;
        slide1.style.pointerEvents = 'auto';
        slide1.style.opacity = '1';
        slide1.style.top = '0';
        slide2.style.top = '-5%';
        slide2.style.opacity = '0';

        bt1.style.opacity = '1';
        bt1.style.top = '0';
        bt2.style.opacity = '0';
        bt2.style.top = '50%';
    } else if (scroll < switchPoints[2]) {
        newSlide = 2;
        slide2.style.pointerEvents = 'auto';
        slide1.style.top = '5%';
        slide1.style.opacity = '0';
        slide2.style.top = '0';
        slide2.style.opacity = '1';
        slide3.style.opacity = '0';
        slide3.style.top = '-5%';

        bt1.style.opacity = '0';
        bt1.style.top = '-200%';
        bt2.style.opacity = '1';
        bt2.style.top = '0';
        bt3.style.opacity = '0';
        bt3.style.top = '50%';

    } else {
        newSlide = 3;
        slide3.style.pointerEvents = 'auto';
        slide2.style.top = '5%';
        slide2.style.opacity = '0';
        slide3.style.top = '0';
        slide3.style.opacity = '1';

        bt2.style.opacity = '0';
        bt2.style.top = '-200%';
        bt3.style.opacity = '1';
        bt3.style.top = '0';
    }

    if (newSlide !== currentSlide) {
        fadeGlow();

        slides.forEach(element => {
            element.style.pointerEvents = 'none';
        });
        slides[newSlide - 1].style.pointerEvents = 'auto';

        dots.forEach(element => {
            element.classList.remove('active');
        });
        dots[newSlide - 1].classList.add('active');

        currentSlide = newSlide; // Update currentSlide
    }
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        window.scrollTo({
            top: switchPoints[index],
            behavior: 'smooth'
        });
    });
});

arrow.addEventListener('click', () => {
    window.scrollTo({
        top: switchPoints[currentSlide],
        behavior: 'smooth'
    });
});

function fadeGlow() {
    container.classList.add('fade');
    setTimeout(() => {
        container.classList.remove('fade');
    }, 250);
}