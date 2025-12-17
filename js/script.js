const container = document.getElementById('imgContainer');
const slide1 = document.getElementById('slide1');
const slide2 = document.getElementById('slide2');
const slide3 = document.getElementById('slide3');
const slides = [slide1, slide2, slide3];
const image = document.getElementById('centerImage');
const startPoint = 50; // scrollY when it snaps to center
const endPoint = 2200; // scrollY when it snaps out of center
const switchPoints = [400, 1000, 1600]; // scrollY thresholds to change image

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

    slides.forEach(s => s.classList.remove('active'));

    // Switch between images based on scroll
    if (scroll < switchPoints[1]) {
        slides[0].classList.add('active');
        slides[0].style.top = '0';
        slides[1].style.top = '-100%';
    } else if (scroll < switchPoints[2]) {
        slides[1].classList.add('active');
        slides[0].style.top = '100%';
        slides[1].style.top = '0';
        slides[2].style.top = '-100%';
    } else {
        slides[2].classList.add('active');
        slides[1].style.top = '100%';
        slides[2].style.top = '0';
    }
});
