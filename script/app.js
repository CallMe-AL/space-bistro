// ***** navbar functionality *****

const navTog = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');

navTog.addEventListener('click', function() {
    let containerHeight = linksContainer.getBoundingClientRect().height;
    let linksHeight = links.getBoundingClientRect().height;
    
    if (containerHeight == 0) {
        linksContainer.style.height = `${linksHeight}px`;
    } else {
        linksContainer.style.height = 0;
    }
});

// ***** fixed nav functionality *****
const navBar = document.querySelector('.nav-container');
const navHeight = navBar.getBoundingClientRect().height;

window.addEventListener('scroll', function(e) {
    const scrollHeight = window.pageYOffset;
    
    if (scrollHeight > 150) {
        navBar.classList.add('fixed-nav');
    } else {
        navBar.classList.remove('fixed-nav');
    }
});

// ***** scroll functionality *****
const scrollLinks = document.querySelectorAll('.scroll-link');

scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        const id = e.currentTarget.getAttribute('href').slice(1);
        const element = document.getElementById(id);

        const containerHeight = linksContainer.getBoundingClientRect().height;
        const navHeight = navBar.getBoundingClientRect().height;
        const fixedNav = navBar.classList.contains('fixed-nav');

        let position = element.offsetTop - navHeight;

        if (!fixedNav) {
            position = position - navHeight;
        }

        if (navHeight > 94) {
            position = position + containerHeight + 1;
        }
        
        window.scrollTo({
            left: 0,
            top: position,            
            behavior: 'smooth'
        });

        linksContainer.style.height = 0;
    });
});

// ***** carousel functionality *****

let slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const carousel = document.querySelector('.carousel');

// start by moving the last slide to before the first slide
carousel.insertBefore(slides[slides.length - 1], slides[0]);

// carouselAuto();

// function carouselAuto() {
//     slides = document.querySelectorAll('.slide');
//     let activeSlide = document.querySelector('.active');
//     let next = activeSlide.nextElementSibling;

//     carousel.appendChild(slides[0]);

//     activeSlide.classList.remove('active');
//     next.classList.add('active');

//     setTimeout(carouselAuto, 2000);
// }

nextBtn.addEventListener('click', function() {
    // must refresh slide array because each slide's position will have changed!
    slides = document.querySelectorAll('.slide');
    let activeSlide = document.querySelector('.active');
    let next = activeSlide.nextElementSibling;

    // moves current slide w/ active class to the end of the carousel
    carousel.appendChild(slides[0]);

    // moves active class from old slide to its sibling
    activeSlide.classList.remove('active');
    next.classList.add('active');
});

prevBtn.addEventListener('click', function() {
    slides = document.querySelectorAll('.slide');
    let activeSlide = document.querySelector('.active');
    let prev = activeSlide.previousElementSibling;

    carousel.insertBefore(slides[slides.length - 1], slides[0]);

    activeSlide.classList.remove('active');
    prev.classList.add('active');
});

// ***** countdown functionality *****

const items = document.querySelectorAll('.deadline-format h4');
const deadline = document.querySelector('.countdown-time');
const countdownWrap = document.querySelector('.countdown');

const futureDate = new Date("March 20, 2022 11:00:00").getTime();

function getRemainingTime() {

    const currentTime = new Date().getTime();
    const timeRemaining = futureDate - currentTime;

    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    let daysLeft = Math.floor((timeRemaining / oneDay));
    let hoursLeft = Math.floor((timeRemaining % oneDay) / oneHour);
    let minutesLeft = Math.floor((timeRemaining % oneHour) / oneMinute);
    let secondsLeft = Math.floor((timeRemaining % oneMinute) / 1000);

    const values = [daysLeft, hoursLeft, minutesLeft, secondsLeft];

    function format(item) {
        if (item < 10) {
            return item = `0${item}`;
        }

        return item;
    }

    items.forEach(function(item, index) {
        item.innerHTML = format(values[index]);
    });

    if (timeRemaining < 0) {
        clearInterval(countdown);
        countdownWrap.style.display = 'none';
        deadline.innerHTML = `The restaurant is up and running!`;
    }
}

let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();

// ***** faq functionality *****

const questions = document.querySelectorAll('.faq-question');

questions.forEach(function(question) {
    // remember to select question NOT document!!!
    // selects btn within each question, rather than all 
    const btn = question.querySelector('.faq-button');
    
    btn.addEventListener('click', function() {
        questions.forEach(function(item) {
            if (item !== question) {
                 item.classList.remove('faq-open');
            }
        });
        
        question.classList.toggle('faq-open');
    }); 
});

// ***** reviews functionality *****

const reviews = [
    {
        id: 1,
        name: "bob jones",
        title: 'washington post',
        img: "images/reviewers/hello-i-m-nik-chicken-guy-unsplash.jpg",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quis assumenda suscipit aut aperiam. Perspiciatis expedita officia incidunt debitis, illo laudantium cumque nobis explicabo possimus commodi vitae quo iure optio.",
    },
    {
        id: 2,
        name: 'unit 62345',
        title: 'death star times',
        img: 'images/reviewers/elisabeth-pieringer-stormtrooper-unsplash.jpg',
        text: "I'm baby selvage selfies master cleanse lyft man braid aesthetic fanny pack truffaut palo santo kickstarter af yr viral photo booth mumblecore. IPhone kitsch fixie wayfarers everyday carry. Bespoke gochujang microdosing, 8-bit skateboard salvia tousled kickstarter waistcoat. Man bun typewriter hella kombucha.",
    },
    {
        id: 3,
        name: 'king roald and queen anne',
        title: 'royal eats',
        img: 'images/reviewers/mulyadi-royalty-unsplash.jpg',
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quis assumenda suscipit aut aperiam. Perspiciatis expedita officia incidunt debitis, illo laudantium cumque nobis explicabo possimus commodi vitae quo iure optio.",
    },
    {
        id: 4,
        name: 'billy bob',
        title: 'new york times',
        img: 'images/reviewers/alan-hardman-unsplash.jpg',
        text: "Jean shorts try-hard ugh kale chips, poke biodiesel man braid succulents synth la croix. Chartreuse green juice marfa poutine skateboard yuccie yr tousled. Tacos distillery bitters organic neutra portland brunch. Mlkshk chia neutra, fingerstache hexagon pickled sriracha normcore.",
    }
];

const img = document.getElementById('person-img');
const author = document.getElementById('author');
const job = document.getElementById('job');
const reviewInfo = document.getElementById('review-info');

const prevReview = document.querySelector('.prev-rvw');
const nextReview = document.querySelector('.next-rvw');
const surpriseReview = document.querySelector('.surprise-btn');

let currentItem = 0;

// loads initial item after HTML downloaded by browser
window.addEventListener('DOMContentLoaded', function() {
    showPerson(currentItem);
    
});

// show person based on item
function showPerson(person) {
    const item = reviews[person];
    img.src = item.img;
    author.textContent = item.name;
    job.textContent = item.title;
    reviewInfo.textContent = item.text;
}

nextReview.addEventListener('click', function() {
    currentItem++;
    if (currentItem > reviews.length - 1) {
        currentItem = 0;
    }
    showPerson(currentItem);
});

prevReview.addEventListener('click', function() {
    currentItem--;
    if (currentItem < 0) {
        currentItem = reviews.length - 1;
    }
    showPerson(currentItem);
});

surpriseReview.addEventListener('click', function() {
    let previousNum = currentItem;
    currentItem = Math.floor(Math.random() * reviews.length);

    if (currentItem == previousNum) {
        currentItem++;
        if (currentItem > reviews.length - 1) {
            currentItem = 0;
        }
    }
    showPerson(currentItem);
});

// ***** copyright functionality *****
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();