const menu = [
    {
        id: 1,
        title: "space pancakes",
        category: "breakfast",
        price: "$8.99",
        img: "./images/menu-images/mae-mu-pancakes-unsplash.jpg",
        desc: "I'm baby prism bicycle rights four loko literally, sartorial scenester affogato echo park knausgaard jean shorts meditation intelligentsia selvage edison bulb.",
    },
    {
        id: 2,
        title: "space salad",
        category: "lunch",
        price: "$6.99",
        img: "./images/menu-images/yoav-aziz-salad-unsplash.jpg",
        desc: "Cliche brooklyn kale chips subway tile irony, plaid etsy knausgaard skateboard four loko.",
    },
    {
        id: 3,
        title: "space margarita",
        category: "drinks",
        price: "$6.99",
        img: "./images/menu-images/tai-s-captures-margarita-unsplash.jpg",
        desc: "Hell of vape hexagon squid, VHS tumeric subway tile snackwave freegan salvia gochujang twee blue bottle prism.",
    },
    {
        id: 4,
        title: "space panini",
        category: "lunch",
        price: "$8.99",
        img: "./images/menu-images/jack-shingai-panini-unsplash.jpg",
        desc: "Paleo before they sold out 8-bit hashtag waistcoat kickstarter activated charcoal artisan.",
    },
    {
        id: 5,
        title: "space espresso",
        category: "drinks",
        price: "$3.99",
        img: "./images/menu-images/matt-hoffman-espresso-unsplash.jpg",
        desc: "Pickled hella unicorn raw denim letterpress, cred vaporware helvetica pok pok pinterest prism.",
    },
    {
        id: 6,
        title: "space burger",
        category: "lunch",
        price: "$10.99",
        img: "./images/menu-images/amirali-mirhashemian-burger-unsplash.jpg",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, dolorum?",
    },
    {
        id: 7,
        title: "space onion soup",
        category: "lunch",
        price: "$6.99",
        img: "./images/menu-images/sheri-silver-fosoup-unsplash.jpg",
        desc: "Ennui banjo cold-pressed, brooklyn vape church-key vice. Meggings af selvage copper mug.",
    },
    {
        id: 8,
        title: "space croissant",
        category: "breakfast",
        price: "$16.99",
        img: "./images/menu-images/mae-mu-croissant-unsplash.jpg",
        desc: "Locavore neutra man bun swag normcore, pop-up pitchfork vegan humblebrag shaman chillwave. Vape DIY affogato godard.",
    },
]

window.addEventListener('DOMContentLoaded', function() {
    displayMenuItems(menu);
    displayMenuButtons();
});

const section = document.querySelector('.section-center');
const btnContainer = document.querySelector('.btn-container');

function displayMenuItems(menuItems) {

    menuItems.sort(function(a, b) {
        let catA = a.category;
        let catB = b.category;

        if (catA < catB) {
            return -1;
        }

        if (catA > catB) {
            return 1;
        }

        return 0;
    });

    let menuMap = menuItems.map(function(item) {
        return `<article class="menu-item">
        <img src=${item.img} class="menu-img" alt=${item.title}>
        <div class="menu-info">
            <header>
                <h4>${item.title}</h4>
                <h4 class="price">${item.price}</h4>
            </header>
            <p class="item-text">
                ${item.desc}
            </p>
        </div>
    </article>`;
    });

    menuMap = menuMap.join('');

    section.innerHTML = menuMap;
}

function displayMenuButtons() {

    // reduces menu array to just access the categories
    const categories = menu.reduce(function(values, item) {
        if (!values.includes(item.category)) {
            values.push(item.category)
        }
        return values;
    },['all']);

    // creates 'x' amount of buttons based on # of categories
    const categoryBtns = categories.map(function(category) {
        return `<button class="filter-btn" data-id=${category}>${category}</button>`
    }).join('');

    btnContainer.innerHTML = categoryBtns;
    const btns = document.querySelectorAll('.filter-btn');

    // filters menu by category
    btns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            const category = e.currentTarget.dataset.id;

            const menuCategory = menu.filter(function(menuItem) {
                if (menuItem.category == category) {
                    return menuItem;
                }
            });

            if (category == 'all') {
                displayMenuItems(menu);
            } else {
                displayMenuItems(menuCategory);
            }
        });
    });
}

// ***** fixed nav functionality *****
const navBar = document.querySelector('.nav-container');
const navHeight = navBar.getBoundingClientRect().height;

window.addEventListener('scroll', function(e) {
    const scrollHeight = window.pageYOffset;
    
    if (scrollHeight > navHeight) {
        navBar.classList.add('fixed-nav');
    } else {
        navBar.classList.remove('fixed-nav');
    }
});

// ***** copyright functionality *****
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();