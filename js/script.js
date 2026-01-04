const container = document.getElementById('imgContainer');
const slide1 = document.getElementById('slide1');
const slide2 = document.getElementById('slide2');
const slide3 = document.getElementById('slide3');
const slides = [slide1, slide2, slide3];
const image = document.getElementById('centerImage');
const endPoint = 3350 - window.innerHeight; // scrollY when it snaps out of center

const navBarHeight = document.querySelector('nav').getBoundingClientRect().height;
const switchPoints = [700, 1400, endPoint + window.innerHeight - navBarHeight]; // scrollY thresholds to change image (account for fixed nav height)
const dotScrollPoints = [0, switchPoints[0] + 1, switchPoints[1] + 1];
let currentSlide = 1;

const btContainer = document.getElementById('bt');
const bt1 = document.getElementById('bt1');
const bt2 = document.getElementById('bt2');
const bt3 = document.getElementById('bt3');
const bts = [bt1, bt2, bt3];

const dotsContainer = document.getElementById('dots');
const dot1 = document.getElementById('dot1');
const dot2 = document.getElementById('dot2');
const dot3 = document.getElementById('dot3');
const dots = [dot1, dot2, dot3];
const arrow = document.getElementById('arrow');

// Trigger the scroll handler once when the page finishes loading (init state)
window.addEventListener('load', () => {
    window.dispatchEvent(new Event('scroll'));
    removeRect();
});

window.addEventListener('scroll', () => {
    removeRect();
    const scroll = window.scrollY;

    // Snap to center after snapPoint
    if (scroll <= endPoint) {
        container.classList.remove('snapped');
        btContainer.classList.remove('snapped');
        dotsContainer.classList.remove('snapped');
    } else if (scroll > endPoint) {
        container.classList.add('snapped');
        btContainer.classList.add('snapped');
        dotsContainer.classList.add('snapped');
    }

    let newSlide = currentSlide; // Track the new slide index

    // Switch between images based on scroll
    if (scroll < switchPoints[0]) {
        newSlide = 1;
    } else if (scroll < switchPoints[1]) {
        newSlide = 2;
    } else {
        newSlide = 3;
    }

    if (newSlide !== currentSlide) {

        // Helper to reset button to bottom for incoming animation
        const prepareEnter = (el) => {
            el.style.transition = 'none';
            el.style.top = '50%';
            el.style.opacity = '0';
            void el.offsetWidth; // Trigger reflow
            el.style.transition = '';
        };

        if (newSlide === 1) {
            slide1.style.pointerEvents = 'auto';
            slide2.style.top = '-5%';
            slide2.style.opacity = '0';
            slide1.style.opacity = '1';
            slide1.style.top = '0';

            // Buttons
            bt2.style.top = '-200%';
            bt2.style.opacity = '0';

            prepareEnter(bt1);
            setTimeout(() => {
                if (currentSlide !== 1) return; // Prevent animation if slide changed again
                bt1.style.top = '0';
                bt1.style.opacity = '1';
            }, 500);

        } else if (newSlide === 2) {
            slide2.style.pointerEvents = 'auto';
            slide1.style.top = '5%';
            slide1.style.opacity = '0';
            slide2.style.top = '0';
            slide2.style.opacity = '1';
            slide3.style.opacity = '0';
            slide3.style.top = '-5%';

            // Buttons
            bt1.style.top = '-200%';
            bt1.style.opacity = '0';
            bt3.style.top = '-200%';
            bt3.style.opacity = '0';

            prepareEnter(bt2);
            setTimeout(() => {
                if (currentSlide !== 2) return; // Prevent animation if slide changed again
                bt2.style.top = '0';
                bt2.style.opacity = '1';
            }, 500);

        } else if (newSlide === 3) {
            slide3.style.pointerEvents = 'auto';
            slide2.style.top = '5%';
            slide2.style.opacity = '0';
            slide3.style.top = '0';
            slide3.style.opacity = '1';

            // Buttons
            bt1.style.top = '-200%';
            bt1.style.opacity = '0';
            bt2.style.top = '-200%';
            bt2.style.opacity = '0';

            prepareEnter(bt3);
            setTimeout(() => {
                if (currentSlide !== 3) return; // Prevent animation if slide changed again
                bt3.style.top = '0';
                bt3.style.opacity = '1';
            }, 500);
        }

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
            top: dotScrollPoints[index],
            behavior: 'smooth'
        });
    });
});

arrow.addEventListener('click', () => {
    window.scrollTo({
        top: switchPoints[switchPoints.length - 1],
        behavior: 'smooth'
    });
});

function fadeGlow() {
    container.classList.add('fade');
    setTimeout(() => {
        container.classList.remove('fade');
    }, 250);
}


const products = document.getElementById('products');
const support = document.getElementById('support');
const solutions = document.getElementById('solutions');
const developers = document.getElementById('developers');
const partners = document.getElementById('partners');
const foundry = document.getElementById('foundry');

const rect = document.getElementById('animRect');
const rectShadow = document.getElementById('animRectShadow');

const productsLabel = products.querySelector('span');
const supportLabel = support.querySelector('span');
const solutionsLabel = solutions.querySelector('span');
const developersLabel = developers.querySelector('span');
const partnersLabel = partners.querySelector('span');
const foundryLabel = foundry.querySelector('span');

const productDD = document.getElementById('productDD');
const supportDD = document.getElementById('supportDD');
const solutionsDD = document.getElementById('solutionsDD');
const developersDD = document.getElementById('developersDD');
const partnersDD = document.getElementById('partnersDD');
const foundryDD = document.getElementById('foundryDD');

document.getElementById('mainContainer').addEventListener('click', () => {
    removeRect();
});

function removeRect() {
    rect.style.height = '0';
    rect.style.borderColor = '#000f28';
    rectShadow.style.opacity = '0';
    productsLabel.classList.remove('active');
    productDD.style.left = '-100%';
}

products.addEventListener('click', (e) => {
    e.stopPropagation();
    rect.style.height = '620px';
    rect.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    rectShadow.style.opacity = '1';
    setTimeout(() => {
        if (rect.style.height !== '620px') return; // Prevent if rect was removed
        productsLabel.classList.add('active');
    }, 500);

    productDD.style.left = '167px';
});


// About dropdown
const about = document.getElementById('about');
const signIn = document.getElementById('signIn');
signIn.addEventListener('click', (e) => {
    e.stopPropagation();
    about.style.top = '10%';
    setTimeout(() => {
        about.style.top = '-10%';
    }, 2000);
});