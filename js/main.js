// Localization Data
const translations = {
    en: {
        logo: "Scroll Trap",
        nav_home: "Home",
        nav_stats: "Impact",
        nav_addiction: "Addiction",
        nav_privacy: "Privacy & Stats",
        nav_gallery: "Gallery",
        nav_contact: "Contact",
        hero_title_1: "Addiction Pathways",
        hero_title_2: "Dopamine Loops",
        read_more: "Read More",
        read_less: "Read Less",
        footer_mission: "Empowering individuals to reclaim their attention in a digital world designed to distract.",
        footer_resources: "Resources",
        footer_stats: "Addiction Statistics",
        footer_tips: "Mindfulness Tips",
        footer_impact: "Neurological Impact",
        footer_guides: "Digital Detox Guides",
        footer_community: "Community",
        footer_stories: "Success Stories",
        footer_forum: "Awareness Forum",
        footer_events: "Live Workshops",
        lang_toggle: "AR"
    },
    ar: {
        logo: "فخ التمرير",
        nav_home: "الرئيسية",
        nav_stats: "التأثير",
        nav_addiction: "الإدمان",
        nav_privacy: "الخصوصية والإحصائيات",
        nav_gallery: "المعرض",
        nav_contact: "اتصل بنا",
        hero_title_1: "مسارات الإدمان",
        hero_title_2: "حلقات الدوبامين",
        read_more: "اقرأ المزيد",
        read_less: "اقرأ أقل",
        footer_mission: "تمكين الأفراد من استعادة انتباههم في عالم رقمي صُمم لتشتيتهم.",
        footer_resources: "الموارد",
        footer_stats: "إحصائيات الإدمان",
        footer_tips: "نصائح الوعي",
        footer_impact: "التأثير العصبي",
        footer_guides: "أدلة التخلص من السموم الرقمية",
        footer_community: "المجتمع",
        footer_stories: "قصص النجاح",
        footer_forum: "منتدى التوعية",
        footer_events: "ورش عمل مباشرة",
        lang_toggle: "EN"
    }
};

// State Management
let currentLang = localStorage.getItem('lang') || 'en';
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
    applyLang(currentLang);
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

// Localization Functions
function toggleLang() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    localStorage.setItem('lang', currentLang);
    applyLang(currentLang);
}

function applyLang(lang) {
    document.body.className = lang === 'ar' ? 'lang-ar' : '';
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });

    // Update dynamic buttons
    document.querySelectorAll('.btn-read').forEach(btn => {
        const isLess = btn.innerText === translations['en'].read_less || btn.innerText === translations['ar'].read_less;
        btn.innerText = isLess ? translations[lang].read_less : translations[lang].read_more;
    });

    // Re-render dynamic content if language changes
    renderScrollFeatures();
    initSlider();
    initGallery();
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
const mindfulnessTips = {
    en: [
        "Leave your phone in another room while eating.",
        "Turn off all non-essential notifications.",
        "Set a specific time to check social media today.",
        "Try a 30-minute digital-free walk.",
        "Use a physical alarm clock instead of your phone."
    ],
    ar: [
        "اترك هاتفك في غرفة أخرى أثناء الأكل.",
        "أوقف جميع التنبيهات غير الضرورية.",
        "حدد وقتاً معيناً لتصفح وسائل التواصل اليوم.",
        "جرب المشي لمدة 30 دقيقة بدون أجهزة رقمية.",
        "استخدم منبهاً حقيقياً بدلاً من هاتفك."
    ]
};

function displayRandomTip() {
    const el = document.getElementById('random-tip-text');
    if (!el) return;
    const tips = mindfulnessTips[currentLang];
    el.innerText = tips[Math.floor(Math.random() * tips.length)];
}

// Endless Scroll Features Data
const scrollFeatures = [
    {
        title_en: "No Natural End",
        title_ar: "لا نهاية طبيعية",
        desc_en: "Infinite content means you never reach the 'bottom', so there's always more to see.",
        desc_ar: "المحتوى اللانهائي يعني أنك لن تصل أبداً إلى 'القاع'، لذا هناك دائماً المزيد لتراه."
    },
    {
        title_en: "Time Distortion",
        title_ar: "تشويه الوقت",
        desc_en: "Loss of track of time as you're in a 'flow state' while gazing at your screen.",
        desc_ar: "فقدان الشعور بالوقت بينما تكون في 'حالة تدفق' أثناء التحديق في شاشتك."
    },
    {
        title_en: "FOMO Amplified",
        title_ar: "تضخيم الخوف من الفوات",
        desc_en: "Constant updates create a fear that missing even one post means the end of the world.",
        desc_ar: "التحديثات المستمرة تخلق خوفاً من أن تفويت منشور واحد يعني نهاية العالم."
    }
];

function renderScrollFeatures() {
    const container = document.getElementById('card-features');
    if (!container) return;

    container.innerHTML = scrollFeatures.map(feat => `
        <div class="feature-col">
            <h4>${currentLang === 'en' ? feat.title_en : feat.title_ar}</h4>
            <p>${currentLang === 'en' ? feat.desc_en : feat.desc_ar}</p>
        </div>
    `).join('');
}

// Slider Logic
let currentSlide = 0;
const sliderImages = [
    { src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000', title_en: 'Endless Scrolling', title_ar: 'تمرير بلا نهاية' },
    { src: 'https://images.unsplash.com/photo-1542314831068cd1dbfeeb?q=80&w=1000', title_en: 'Digital Isolation', title_ar: 'العزلة الرقمية' },
    { src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1000', title_en: 'Mindful Usage', title_ar: 'الاستخدام الواعي' }
];

function initSlider() {
    const sliderWrapper = document.getElementById('slider-wrapper');
    const dotsContainer = document.getElementById('slider-dots');
    if (!sliderWrapper) return;

    sliderWrapper.innerHTML = sliderImages.map(img => `
        <div class="slide">
            <img src="${img.src}" alt="${img.title_en}">
            <div class="slide-caption">
                <h3>${currentLang === 'en' ? img.title_en : img.title_ar}</h3>
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

// Gallery Logic
const galleryImages = [
    { src: 'assets/images/scroll_awareness.jpg', title: 'The Endless Void', info: 'Infinite feeds are designed to keep you scrolling long after your interest has faded.' },
    { src: 'assets/images/silent_room.jpg', title: 'The Silent Room', info: 'Presence is becoming a luxury as we choose pixels over the people sitting right next to us.' },
    { src: 'assets/images/nomophobia.jpg', title: 'The Modern Cage', info: 'The fear of being without a device is a documented psychological state.' },
    { src: 'assets/images/great_disconnect.jpg', title: 'Silent Dinners', info: 'Presence is becoming a luxury as we choose pixels over people nearby.' },
    { src: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=1000', title: 'The Loop', info: 'Infinite scrolling eliminates the natural stopping points our brains need.' },
    { src: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1000', title: 'Screens of Sleep', info: 'Blue light suppresses melatonin, disrupting our natural circadian rhythms.' }
];

function initGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    grid.innerHTML = galleryImages.map(img => `
        <div class="gallery-item reveal" onclick="openLightbox('${img.src}', '${img.title}')">
            <img src="${img.src}" alt="${img.title}">
            <div class="gallery-overlay">
                <div class="overlay-title">${img.title}</div>
                <div class="overlay-info">${img.info}</div>
            </div>
        </div>
    `).join('');
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
function selectUser(gender) {
    document.querySelectorAll('.user-card').forEach(card => card.classList.remove('selected'));
    const card = document.getElementById(`user-${gender}`);
    if (card) card.classList.add('selected');
    const form = document.getElementById('login-form-container');
    if (form) form.style.display = 'block';
    const label = document.getElementById('selected-user-type');
    if (label) label.innerText = gender === 'male' ? 'Male User' : 'Female User';
}

function handleLogin(e) {
    e.preventDefault();
    alert('Login successful! Welcome back.');
    window.location.href = 'index.html';
}

// Contact Logic
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
    alert(currentLang === 'en' ? 'Message sent!' : 'تم الإرسال!');
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
            btn.innerText = translations[currentLang].read_more;
            btn.onclick = () => {
                if (p.innerText === short) {
                    p.innerText = full;
                    btn.innerText = translations[currentLang].read_less;
                } else {
                    p.innerText = short;
                    btn.innerText = translations[currentLang].read_more;
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
