const products = [
    // Картинки карточек меняются здесь: замените значение в поле img у нужного товара.
    // У Samsung фото встроено прямо в код, поэтому оно работает даже без папки images.
    { name: "iPhone 15 Pro", category: "phones", price: "от 114 990 ₽", img: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-1.jpg" },
    { name: "Samsung Galaxy S24", category: "phones", price: "от 89 990 ₽", img: "images/samsung-galaxy-s24-ultra.jpg" },
    { name: "Google Pixel 8", category: "phones", price: "от 72 990 ₽", img: "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-8-1.jpg" },
    { name: "Xiaomi 14", category: "phones", price: "от 64 990 ₽", img: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-14-1.jpg" },
    { name: "OnePlus 12", category: "phones", price: "от 69 990 ₽", img: "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-12-1.jpg" },
    { name: "AirPods Pro 2", category: "headphones", price: "от 24 990 ₽", img: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=900&q=80" },
    { name: "Sony WH-1000XM5", category: "headphones", price: "от 39 990 ₽", img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=900&q=80" },
    { name: "Samsung Buds 2", category: "headphones", price: "от 10 990 ₽", img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80" },
    { name: "Marshall Major IV", category: "headphones", price: "от 14 990 ₽", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80" },
    { name: "Sennheiser Momentum", category: "headphones", price: "от 32 990 ₽", img: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80" },
    { name: "iPad Pro 11", category: "tablets", price: "от 109 990 ₽", img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80" },
    { name: "Galaxy Tab S9", category: "tablets", price: "от 79 990 ₽", img: "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?auto=format&fit=crop&w=900&q=80" },
    { name: "Xiaomi Pad 6", category: "tablets", price: "от 34 990 ₽", img: "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=900&q=80" },
    { name: "Lenovo Tab P12", category: "tablets", price: "от 42 990 ₽", img: "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=900&q=80" },
    { name: "Huawei MatePad", category: "tablets", price: "от 36 990 ₽", img: "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&w=900&q=80" }
];


const categoryNames = {
    phones: "Телефоны",
    headphones: "Наушники",
    tablets: "Планшеты"
};

const fallbackImage = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="620" viewBox="0 0 900 620">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f3ecff"/>
      <stop offset="1" stop-color="#ffe8f3"/>
    </linearGradient>
  </defs>
  <rect width="900" height="620" rx="46" fill="url(#g)"/>
  <circle cx="450" cy="240" r="92" fill="#8a2be2" opacity="0.16"/>
  <rect x="365" y="140" width="170" height="210" rx="30" fill="#8a2be2" opacity="0.25"/>
  <rect x="390" y="172" width="120" height="146" rx="22" fill="#ffffff" opacity="0.9"/>
  <text x="450" y="420" font-family="Arial, sans-serif" font-size="54" font-weight="700" text-anchor="middle" fill="#8a2be2">F3sty Device</text>
  <text x="450" y="470" font-family="Arial, sans-serif" font-size="25" text-anchor="middle" fill="#6b7280">изображение товара</text>
</svg>`);

const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('.icon') : null;

if (themeToggleBtn && themeIcon) {
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        themeIcon.style.transform = 'scale(0) rotate(-180deg)';
        
        setTimeout(() => {
            themeIcon.textContent = document.body.classList.contains('dark-mode') ? '🌙' : '☀️';
            themeIcon.style.transform = 'scale(1) rotate(0deg)';
        }, 200);
    });

    themeIcon.style.transition = 'transform 0.3s ease';
    themeIcon.style.display = 'inline-block';
}

const grid = document.getElementById('product-grid');

function renderProducts() {
    if (!grid) return;

    products.forEach((product) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.category = product.category;
        
        card.innerHTML = `
            <div class="img-wrapper">
                <img src="${product.img}" alt="${product.name}" loading="lazy" decoding="async" width="600" height="420">
            </div>
            <h3>${product.name}</h3>
            <p class="product-price">${product.price}</p>
            <button class="order-btn">Оформить заказ</button>
        `;
        grid.appendChild(card);
    });

    document.querySelectorAll('.card img').forEach((img) => {
        img.addEventListener('error', () => {
            img.src = fallbackImage;
            img.classList.add('fallback-img');
        }, { once: true });
    });
}

renderProducts();

if (grid) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, Math.random() * 200); 
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.card').forEach(card => observer.observe(card));
}

const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.dataset.filter;
        let delay = 0;
        
        document.querySelectorAll('.card').forEach(card => {
            card.classList.remove('visible');
            
            setTimeout(() => {
                if (filterValue === 'all' || card.dataset.category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => card.classList.add('visible'), 50 + delay);
                    delay += 50; 
                } else {
                    card.style.display = 'none';
                }
            }, 400);
        });
    });
});

const modal = document.getElementById('orderModal');
const closeBtn = modal ? modal.querySelector('.close-btn') : null;
const submitBtn = document.getElementById('submitOrder');
const formContainer = document.getElementById('formContainer');
const successMessage = document.getElementById('successMessage');
const fioInput = document.getElementById('fio');
const phoneInput = document.getElementById('phone');
const modalBackdrop = modal ? modal.querySelector('.modal-backdrop') : null;

function openModal() {
    if (!modal || !formContainer || !successMessage || !fioInput || !phoneInput || !submitBtn) return;
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
    setTimeout(() => modal.classList.add('show'), 10);
    formContainer.style.display = 'block';
    successMessage.style.display = 'none';
    submitBtn.style.transform = '';
    fioInput.value = '';
    phoneInput.value = '';
}

function closeModal() {
    if (!modal) return;
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }, 400);
}

document.querySelectorAll('.order-btn').forEach(btn => {
    btn.addEventListener('click', openModal);
});

if (closeBtn) closeBtn.addEventListener('click', closeModal);
if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

if (submitBtn && fioInput && phoneInput && formContainer && successMessage) {
    submitBtn.addEventListener('click', () => {
        if (fioInput.value.trim() !== '' && phoneInput.value.trim() !== '') {
            submitBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                formContainer.style.display = 'none';
                successMessage.style.display = 'block';
            }, 200);
        } else {
            const inputs = [fioInput, phoneInput];
            inputs.forEach(input => {
                if(input.value.trim() === '') {
                    input.style.borderColor = '#ff2a85';
                    setTimeout(() => input.style.borderColor = '', 1500);
                }
            });
        }
    });
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
});

const scrollTopBtn = document.getElementById('scrollTopBtn');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
