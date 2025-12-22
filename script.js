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
            if (!btn.classList.contains('added')) {
                btn.classList.add('added');
                label.textContent = 'Remove';
                cartCount++;
            } else {
                btn.classList.remove('added');
                label.textContent = 'Add';
                cartCount--;
            }

            cartCounter.textContent = cartCount;

            cartCounter.classList.remove('bump');
            void cartCounter.offsetWidth;
            cartCounter.classList.add('bump');

            btn.classList.remove('swap');
        }, 150);
    });
});