const container = document.getElementById('imgContainer');
const slide1 = document.getElementById('slide1');
const slide2 = document.getElementById('slide2');
const slide3 = document.getElementById('slide3');
const slides = [slide1, slide2, slide3];
const image = document.getElementById('centerImage');
const endPoint = 3950 - window.innerHeight; // scrollY when it snaps out of center
const switchPoints = [1100, 2200, endPoint + window.innerHeight]; // scrollY thresholds to change image
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

window.addEventListener('scroll', () => {
    removeRect();
    const scroll = window.scrollY;

    // Snap to center after snapPoint
    if (scroll <= endPoint) {
        container.style.top = '';
        btContainer.style.top = '';
        dotsContainer.classList.add('fixed');
        dotsContainer.style.top = '';
    } else if (scroll > endPoint) {
        container.style.top = `${endPoint}px`;
        btContainer.style.top = `${endPoint + 685}px`;
        dotsContainer.classList.remove('fixed');
        dotsContainer.style.top = `${endPoint + 340}px`;
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


const products = document.getElementById('products');
const support = document.getElementById('support');
const solutions = document.getElementById('solutions');
const developers = document.getElementById('developers');
const partners = document.getElementById('partners');
const foundry = document.getElementById('foundry');
const rect = document.getElementById('animRect');
const rectShadow = document.getElementById('animRectShadow');
const productsLabel = products.querySelector('span');

function removeRect() {
    rect.style.top = '-1000px';
    rectShadow.classList.remove('active');
    productsLabel.classList.remove('active');
}

window.addEventListener('click', () => {
    removeRect();
});

products.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent the window click from immediately removing the class
    rect.style.top = '-400px';
    rectShadow.classList.add('active');
    productsLabel.classList.add('active');
});