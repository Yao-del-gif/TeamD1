const searchInput = document.querySelector('.search-bar');
const categoryLinks = document.querySelectorAll('.catlinks');
const sections = document.querySelectorAll('.category-section');

let activeCategory = 'all';

function filterProducts() {
    const searchValue = searchInput.value.toLowerCase();

    sections.forEach(section => {
        let sectionVisible = false;

        section.querySelectorAll('.items').forEach(item => {
            const itemName = (item.dataset.name || '').toLowerCase();
            const itemCategory = item.dataset.category || '';

            const matchCategory =
                activeCategory === 'all' || itemCategory === activeCategory;
            const matchSearch = itemName.includes(searchValue);

            if (matchCategory && matchSearch) {
                item.style.display = 'flex';
                sectionVisible = true;
            } else {
                item.style.display = 'none';
            }
        });

        section.style.display = sectionVisible ? 'block' : 'none';
    });
}

categoryLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();

        categoryLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        activeCategory = link.dataset.category;
        filterProducts();
    });
});

searchInput.addEventListener('input', filterProducts);

let cartCount = 0;
const cartCounter = document.querySelector('.cart-count');

document.querySelectorAll('.add-btn').forEach(btn => {
    btn.innerHTML = '<span>Add</span>';

    btn.addEventListener('click', () => {
        const label = btn.querySelector('span');

        btn.classList.add('swap');

setTimeout(() => {
    const item = btn.closest('.items');
    const name = item.dataset.name;
    const price = parseInt(item.dataset.price.replace(/,/g, ''));
    const img = item.querySelector('img').src;

if (!btn.classList.contains('added')) {
    btn.classList.add('added');
    cartCount++;

    sliderCart.push({ name, price, img, qty: 1 });
    showToast('Item added to cart');

} else {
    alert('Item is already added to the cart');
}


    cartCounter.textContent = cartCount;
    cartCounter.classList.remove('bump');
    void cartCounter.offsetWidth;
    cartCounter.classList.add('bump');

    renderSliderCart();
    btn.classList.remove('swap');
}, 150);
        });
    });

const toast = document.getElementById('toast');

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

const cartBtn = document.querySelector('.cart-btn');
const cartSlider = document.querySelector('.cart-slider');
const cartOverlay = document.querySelector('.cart-overlay');
const closeCartBtn = document.querySelector('.close-cart');
const cartItemsEl = document.querySelector('.cart-items');
const cartTotalEl = document.getElementById('cart-total');

let sliderCart = [];

cartBtn.addEventListener('click', e => {
    e.preventDefault();
    cartSlider.classList.add('open');
    cartOverlay.classList.add('show');
});

cartOverlay.addEventListener('click', closeSliderCart);
closeCartBtn.addEventListener('click', closeSliderCart);

function closeSliderCart() {
    cartSlider.classList.remove('open');
    cartOverlay.classList.remove('show');
}

function renderSliderCart() {
    cartItemsEl.innerHTML = '';
    let total = 0;

    sliderCart.forEach((item, index) => {
        total += item.price * item.qty;

        cartItemsEl.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}">
                <div class="cart-info">
                    <strong>${item.name}</strong>
                    <div class="qty-controls">
                        <button onclick="changeQty(${index}, -1)">−</button>
                        <span>${item.qty}</span>
                        <button onclick="changeQty(${index}, 1)">+</button>
                        <span class="remove-item" onclick="removeSliderItem(${index})">🗑</span>
                    </div>
                    <small>Ks ${(item.price * item.qty).toLocaleString()}</small>
                </div>
            </div>
        `;
    });

    cartTotalEl.textContent = `Ks ${total.toLocaleString()}`;
}
function syncProductButton(itemName) {
    document.querySelectorAll('.items').forEach(item => {
        if (item.dataset.name === itemName) {
            const btn = item.querySelector('.add-btn');
            btn.classList.remove('added');
        }
    });
}

function changeQty(index, change) {
    const item = sliderCart[index];
    item.qty += change;

    if (item.qty <= 0) {
        sliderCart.splice(index, 1);
        cartCount--;
        cartCounter.textContent = cartCount;

        syncProductButton(item.name);
    }

    renderSliderCart();
}

function removeSliderItem(index) {
    const item = sliderCart[index];

    sliderCart.splice(index, 1);
    cartCount--;
    cartCounter.textContent = cartCount;

    syncProductButton(item.name);
    renderSliderCart();
}

document.querySelector('.buy-now').addEventListener('click', () => {
    if (sliderCart.length === 0) {
        alert('Your cart is empty');
        return;
    }

    sliderCart = [];
    renderSliderCart();

    // ✅ Reset cart count
    cartCount = 0;
    cartCounter.textContent = cartCount;

    document.querySelectorAll('.add-btn').forEach(btn => {
        btn.classList.remove('added');
    });

    closeSliderCart();

    alert('Thank you for shopping with us!');
});

function toggleCategory(btn) {
    const section = btn.closest('.category-section');
    section.classList.toggle('expanded');

    btn.textContent = section.classList.contains('expanded')
        ? 'Show less'
        : 'See more';
}
