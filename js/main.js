let currentTheme = localStorage.getItem('theme') || 'dark';

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.classList.add('hidden'), 500);
    }
    init();
});

function init() {
    applyTheme(currentTheme);
    highlightActiveLink();
    setupScrollTop();
    renderScrollFeatures();
    displayRandomTip();
    initSlider();
    initGallery();
    initReadMore();
    initScrollAnimations();
}

function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
    applyTheme(currentTheme);
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.innerHTML = theme === 'dark' ? '🌙' : '☀️';
    }
}

function highlightActiveLink() {
    const fileName = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === fileName) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function setupScrollTop() {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
}

const mindfulnessTips = [
    "Leave your phone in another room while eating.",
    "Turn off all non-essential notifications.",
    "Set a specific time to check social media today.",
    "Try a 30-minute digital-free walk.",
    "Use a physical alarm clock instead of your phone."
];

function displayRandomTip() {
    const el = document.getElementById('random-tip-text');
    if (!el) return;
    el.innerText = mindfulnessTips[Math.floor(Math.random() * mindfulnessTips.length)];
}

const scrollFeatures = [
    {
        title: "No Natural End",
        desc: "Infinite content means you never reach the 'bottom', so there's always more to see."
    },
    {
        title: "Time Distortion",
        desc: "Loss of track of time as you're in a 'flow state' while gazing at your screen."
    },
    {
        title: "FOMO Amplified",
        desc: "Constant updates create a fear that missing even one post means the end of the world."
    }
];

function renderScrollFeatures() {
    const container = document.getElementById('card-features');
    if (!container) return;

    container.innerHTML = scrollFeatures.map(feat => `
        <div class="feature-col">
            <h4>${feat.title}</h4>
            <p>${feat.desc}</p>
        </div>
    `).join('');
}

let currentSlide = 0;
const sliderImages = [
    { src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000', title: 'Endless Scrolling' },
    { src: 'https://images.unsplash.com/photo-1542314831068cd1dbfeeb?q=80&w=1000', title: 'Digital Isolation' },
    { src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1000', title: 'Mindful Usage' }
];

function initSlider() {
    const sliderWrapper = document.getElementById('slider-wrapper');
    const dotsContainer = document.getElementById('slider-dots');
    if (!sliderWrapper) return;

    sliderWrapper.innerHTML = sliderImages.map(img => `
        <div class="slide">
            <img src="${img.src}" alt="${img.title}">
            <div class="slide-caption">
                <h3>${img.title}</h3>
            </div>
        </div>
    `).join('');

    if (dotsContainer) {
        dotsContainer.innerHTML = sliderImages.map((_, i) => `
            <span class="dot ${i === currentSlide ? 'active' : ''}" onclick="goToSlide(${i})"></span>
        `).join('');
    }
    updateSlider();
}

function moveSlide(direction) {
    currentSlide = (currentSlide + direction + sliderImages.length) % sliderImages.length;
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function updateSlider() {
    const wrapper = document.getElementById('slider-wrapper');
    const dots = document.querySelectorAll('.dot');
    if (!wrapper) return;
    wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
}

const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1000', title: 'Circuit of Addiction' },
    { src: 'https://images.unsplash.com/photo-1520333789090-1afc82db536a?q=80&w=1000', title: 'Ghost of Social Media' },
    { src: 'assets/images/nomophobia.jpg', title: 'The Digital Cage' },
    { src: 'assets/images/great_disconnect.jpg', title: 'Disconnected' },
    { src: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1000', title: 'Screen Glow' },
    { src: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=1000', title: 'Endless Loop' }
];

function initGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    grid.innerHTML = galleryImages.map(img => `
        <div class="gallery-item" onclick="openLightbox('${img.src}', '${img.title}')">
            <img src="${img.src}" alt="${img.title}">
            <div class="gallery-overlay"></div>
        </div>
    `).join('');
}

function openLightbox(src, caption) {
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const lbCap = document.getElementById('lightbox-caption');
    if (!lb || !lbImg) return;
    lbImg.src = src;
    lbCap.innerText = caption;
    lb.style.display = 'flex';
}

function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (lb) lb.style.display = 'none';
}

function toggleZoom() {
    const img = document.getElementById('lightbox-img');
    if (img) img.classList.toggle('zoom-active');
}

function selectUser(gender) {
    document.querySelectorAll('.user-card').forEach(card => card.classList.remove('selected'));
    const card = document.getElementById(`user-${gender}`);
    if (card) card.classList.add('selected');
    const form = document.getElementById('login-form-container');
    if (form) form.style.display = 'block';
    const label = document.getElementById('selected-user-type');
    if (label) label.innerText = gender === 'male' ? 'Ali' : 'Dyana';
}

function handleLogin(e) {
    e.preventDefault();
    alert('Login successful! Welcome back.');
    window.location.href = 'index.html';
}

function saveFormData(e) {
    e.preventDefault();
    const data = {
        name: document.getElementById('contact-name').value,
        email: document.getElementById('contact-email').value,
        message: document.getElementById('contact-message').value,
        date: new Date().toLocaleString()
    };
    let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages.push(data);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    alert('Message sent!');
    e.target.reset();
}

function getSavedData() {
    const tableBody = document.getElementById('messages-table-body');
    if (!tableBody) return;
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    tableBody.innerHTML = messages.map(msg => `
        <tr>
            <td>${msg.name}</td>
            <td>${msg.email}</td>
            <td>${msg.message}</td>
            <td>${msg.date}</td>
        </tr>
    `).join('');
}

function initReadMore() {
    document.querySelectorAll('.block-text p').forEach(p => {
        if (p.innerText.length > 200 && !p.nextElementSibling?.classList.contains('btn-read')) {
            const full = p.innerText;
            const short = full.substring(0, 200) + "...";
            p.innerText = short;
            const btn = document.createElement('button');
            btn.className = 'btn-read';
            btn.innerText = 'Read More';
            btn.onclick = () => {
                if (p.innerText === short) {
                    p.innerText = full;
                    btn.innerText = 'Read Less';
                } else {
                    p.innerText = short;
                    btn.innerText = 'Read More';
                }
            };
            p.after(btn);
        }
    });
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
