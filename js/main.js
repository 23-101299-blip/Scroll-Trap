// State Management
let currentTheme = localStorage.getItem('theme') || 'dark';

// Preloader & Main Init
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

// Theme Functions
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


// Highlight Active Nav Link
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

// Scroll Top Utility
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

// Random Tip Utility
const mindfulnessTips = [
    "Leave your phone in another room while eating.",
    "Turn off all non-essential notifications.",
    "Set a specific time to check social media today.",
    "Try a 30-minute digital-free walk.",
    "Use a physical alarm clock instead of your phone.",
    "Delete apps that consume most of your time.",
    "Enable grayscale mode to make your screen less appealing.",
    "Practice the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.",
    "Create phone-free zones in your home, like the bedroom or dining table.",
    "Use app timers to limit daily usage of social media platforms.",
    "Keep your phone on silent and face-down when working.",
    "Unfollow accounts that don't add value to your life.",
    "Replace scrolling with reading a physical book before bed.",
    "Turn off autoplay for videos to avoid getting sucked into endless content.",
    "Make your phone inconvenient: remove it from your pocket and place it across the room."
];

function displayRandomTip() {
    const el = document.getElementById('random-tip-text');
    if (!el) return;
    el.innerText = mindfulnessTips[Math.floor(Math.random() * mindfulnessTips.length)];
}

// Endless Scroll Features Data
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

// Slider Logic
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

// Gallery Slider Logic
let currentGallerySlide = 0;
let galleryAutoplayInterval = null;

const galleryImages = [
    { src: 'assets/images/scroll_awareness.jpg', title: 'The Endless Void', info: 'Infinite feeds are designed to keep you scrolling long after your interest has faded.' },
    { src: 'assets/images/silent_room.jpg', title: 'The Silent Room', info: 'Presence is becoming a luxury as we choose pixels over the people sitting right next to us.' },
    { src: 'assets/images/nomophobia.jpg', title: 'The Modern Cage', info: 'The fear of being without a device is a documented psychological state.' },
    { src: 'assets/images/great_disconnect.jpg', title: 'Silent Dinners', info: 'Presence is becoming a luxury as we choose pixels over people nearby.' },
    { src: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=1000', title: 'The Loop', info: 'Infinite scrolling eliminates the natural stopping points our brains need.' },
    { src: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1000', title: 'Screens of Sleep', info: 'Blue light suppresses melatonin, disrupting our natural circadian rhythms.' }
];

function initGallery() {
    const track = document.getElementById('gallery-slider-track');
    const dotsContainer = document.getElementById('gallery-slider-dots');

    if (!track) return;

    // Render slides
    track.innerHTML = galleryImages.map((img, index) => `
        <div class="gallery-slide" onclick="openLightbox('${img.src}', '${img.title}')">
            <img src="${img.src}" alt="${img.title}">
            <div class="gallery-overlay">
                <div class="overlay-title">${img.title}</div>
                <div class="overlay-info">${img.info}</div>
            </div>
        </div>
    `).join('');

    // Render navigation dots
    if (dotsContainer) {
        dotsContainer.innerHTML = galleryImages.map((_, i) => `
            <span class="dot ${i === currentGallerySlide ? 'active' : ''}" onclick="goToGallerySlide(${i})"></span>
        `).join('');
    }

    updateGallerySlider();
    startGalleryAutoplay();
}

function moveGallerySlide(direction) {
    stopGalleryAutoplay();
    currentGallerySlide = (currentGallerySlide + direction + galleryImages.length) % galleryImages.length;
    updateGallerySlider();
}

function goToGallerySlide(index) {
    stopGalleryAutoplay();
    currentGallerySlide = index;
    updateGallerySlider();
}

function updateGallerySlider() {
    const track = document.getElementById('gallery-slider-track');
    const dots = document.querySelectorAll('#gallery-slider-dots .dot');

    if (!track) return;

    track.style.transform = `translateX(-${currentGallerySlide * 100}%)`;

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentGallerySlide);
    });
}

function startGalleryAutoplay() {
    // Auto-advance every 5 seconds
    galleryAutoplayInterval = setInterval(() => {
        currentGallerySlide = (currentGallerySlide + 1) % galleryImages.length;
        updateGallerySlider();
    }, 5000);
}

function stopGalleryAutoplay() {
    if (galleryAutoplayInterval) {
        clearInterval(galleryAutoplayInterval);
        galleryAutoplayInterval = null;
    }
}

// Lightbox Functions
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

// Login Logic
function selectUser(name) {
    document.querySelectorAll('.user-card').forEach(card => card.classList.remove('selected'));
    const id = name === 'Ali' ? 'user-male' : 'user-female';
    const card = document.getElementById(id);
    if (card) card.classList.add('selected');
    const form = document.getElementById('login-form-container');
    if (form) form.style.display = 'block';
    const label = document.getElementById('selected-user-type');
    if (label) label.innerText = `Login as ${name}`;
}

function handleLogin(e) {
    e.preventDefault();
    const user = document.getElementById('login-username').value;
    const pass = document.getElementById('login-password').value;
    const errorMsg = document.getElementById('login-error');

    if (user === 'ali' && pass === 'aligameel') {
        if (errorMsg) errorMsg.style.display = 'none';
        alert('Login successful! Welcome back, Ali.');
        window.location.href = 'index.html';
    } else {
        if (errorMsg) errorMsg.style.display = 'block';
    }
}

// Contact Logic
function validateForm(name, email, message) {
    const errors = [];

    // Name validation
    if (!name || name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('Please enter a valid email address');
    }

    // Message validation
    if (!message || message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }

    return errors;
}

function showSuccessSendMsg() {
    // Create success message element
    const existingMsg = document.getElementById('success-message');
    if (existingMsg) existingMsg.remove();

    const successMsg = document.createElement('div');
    successMsg.id = 'success-message';
    successMsg.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 20px 40px;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(16, 185, 129, 0.3);
        z-index: 10000;
        font-weight: 600;
        font-size: 1.1rem;
        animation: slideDown 0.5s ease-out;
    `;
    successMsg.innerHTML = '✓ Message sent successfully!';

    document.body.appendChild(successMsg);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        successMsg.style.animation = 'slideUp 0.5s ease-in';
        setTimeout(() => successMsg.remove(), 500);
    }, 3000);
}

function saveFormData(e) {
    e.preventDefault();

    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;

    // Validate form
    const errors = validateForm(name, email, message);
    if (errors.length > 0) {
        alert('Please fix the following errors:\n\n' + errors.join('\n'));
        return;
    }

    // Save data
    const data = {
        name: name,
        email: email,
        message: message,
        date: new Date().toLocaleString()
    };

    let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages.push(data);
    localStorage.setItem('contactMessages', JSON.stringify(messages));

    // Show success message
    showSuccessSendMsg();

    // Reset form
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

// Read More Toggle
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

// Scroll Animations
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

// Global initialization assignment handled by window listener at start
