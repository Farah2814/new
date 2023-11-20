let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    document.body.classList.add('active');
});

closeShopping.addEventListener('click', () => {
    document.body.classList.remove('active');
});

let services = [
    {
        id: 1,
        servicename: 'Business - Proposal',
        Perwordrate: 0.30
    },
    {
        id: 2,
        servicename: 'Email - copywriting',
        Perwordrate: 0.40
    },
    {
        id: 3,
        servicename: 'Academic - content',
        Perwordrate: 0.35
    },
    {
        id: 4,
        servicename: 'Website - content - writing',
        Perwordrate: 0.32
    },
    {
        id: 5,
        servicename: 'Blog - posts',
        Perwordrate: 0.36
    },
    {
        id: 6,
        servicename: 'Product - description',
        Perwordrate: 0.40
    },
    {
        id: 7,
        servicename: 'Casestudy',
        Perwordrate: 0.45
    },
    {
        id: 8,
        servicename: 'Ebooks',
        Perwordrate: 0.30
    },
    {
        id: 9,
        servicename: 'Socialmedia - post',
        Perwordrate: 0.40
    },
    {
        id: 10,
        servicename: 'Researcharticle',
        Perwordrate: 0.40
    },
    {
        id: 11,
        servicename: 'Whitepapers',
        Perwordrate: 0.40
    },

    {
        id: 12,
        servicename: 'Ghost - writing',
        Perwordrate: 0.40
    }


];

let listcards = [];

function initApp() {
    services.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <div class="title">${value.servicename}</div>
            <div class="Perwordrate">$${value.Perwordrate.toFixed(2)} per word</div>
            <input type="number" class="quantityInput" placeholder="Enter No. of Words">
            <button onclick="addToCard(${key})">Order Now</button>
        `;
        list.appendChild(newDiv);
    });
}

initApp();

function addToCard(key) {
    let quantityInput = document.querySelectorAll('.quantityInput')[key];
    let quantity = parseInt(quantityInput.value);
    if (isNaN(quantity) || quantity <= 0) {
        alert("Please enter a valid quantity.");
        return;
    }
    if (listcards[key] == null) {
        listcards[key] = services[key];
        listcards[key].quantity = quantity;
    } else {
        listcards[key].quantity += quantity;
    }
    reloadCard();
}

function removeFromCard(key) {
    listcards.splice(key, 1);
    reloadCard();
}

function reloadCard() {
    let listcard = document.querySelector('.listCard');
    listcard.innerHTML = '';
    let count = 0;
    let totalperwordrate = 0;
    listcards.forEach((value, key) => {
        let serviceCost = value.Perwordrate * value.quantity;
        totalperwordrate = totalperwordrate + serviceCost;
        count = count + value.quantity;
        let listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="title">${value.servicename}</div>
            <div class="quantity">${value.quantity} x $${value.Perwordrate.toFixed(2)}</div>
            <div class="serviceCost">$${serviceCost.toFixed(2)}</div>
            <button class="removeButton" onclick="removeFromCard(${key})">Remove</button>
        `;
        listcard.appendChild(listItem);
    });
    total.innerText = `Total: $${totalperwordrate.toFixed(2)}`;
    quantity.innerText = count;
}

let checkoutButton = document.querySelector('.checkoutButton');
checkoutButton.addEventListener('click', () => {
    alert('Thank you for trusting Farah Siddiqui Writes!');
});
