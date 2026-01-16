/* ==========================================================
   1. GENEL AYARLAR VE DİL VERİTABANI
   ========================================================== */
let currentLang = 'tr';
let scale = 1;
let pointX = 0;
let pointY = 0;
let start = { x: 0, y: 0 };
let isDragging = false;

const translations = {
    tr: { 
        title: "Türk Devletleri Sağlık Turizmi Haritası", 
        subtitle: "Bilgi almak istediğiniz ülkeyi seçiniz.", 
        home: "Anasayfa", about: "Hakkımızda", langName: "Türkçe",
        flag: "https://flagcdn.com/w20/tr.png",
        countries: { 
            "path3458": "Türkiye", 
            "path3456": "Türkiye", // İstanbul Parçası
            "path3456": "Türkiye", // Trakya/Komşu parçası (ihtimal)
            "path5796": "Azerbaycan", 
            "path3898": "Kazakistan", 
            "path3470": "Özbekistan", 
            "3470": "Özbekistan", 
            "tm": "Türkmenistan", 
            "kg": "Kırgızistan", 
            "cy": "KKTC" 
        }
    },
    en: { 
        title: "Turkic States Health Tourism Map", 
        subtitle: "Please select a country for information.", 
        home: "Home", about: "About Us", langName: "English",
        flag: "https://flagcdn.com/w20/gb.png",
        countries: { 
            "path3458": "Turkey", 
            "path3456": "Turkey", 
            "path3456": "Turkey",
            "path5796": "Azerbaijan", 
            "path3898": "Kazakhstan", 
            "path3470": "Uzbekistan", 
            "3470": "Uzbekistan", 
            "tm": "Turkmenistan", 
            "kg": "Kyrgyzstan", 
            "cy": "TRNC" 
        }
    },
    uz: { 
        title: "Turkiy Davlatlar Sog'liqni Saqlash Xaritasi", 
        subtitle: "Ma'lumot olish uchun davlatni tanlang.", 
        home: "Bosh sahifa", about: "Biz haqimizda", langName: "O'zbekcha",
        flag: "https://flagcdn.com/w20/uz.png",
        countries: { 
            "path3458": "Turkiya", 
            "path3456": "Turkiya", 
            "path3456": "Turkiya",
            "path5796": "Ozarbayjon", 
            "path3898": "Qozog'iston", 
            "path3470": "O'zbekiston", 
            "3470": "O'zbekiston", 
            "tm": "Turkmaniston", 
            "kg": "Qirg'iziston", 
            "cy.": "SHK" 
        }
    }
};

/* ==========================================================
   2. BAŞLATMA VE HARİTA YÖNETİMİ
   ========================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById('svg-wrapper');
    if (wrapper && typeof worldMapSVG !== 'undefined') {
        renderWorldMap();
        setupDragEvents(wrapper);
    }
});

// Dünya Haritasını İlk Kez Basma
function renderWorldMap() {
    const wrapper = document.getElementById('svg-wrapper');
    wrapper.innerHTML = worldMapSVG;
    document.getElementById('back-to-world').style.display = "none";
    colorizeMap();
    resetZoom();
}

// Türkiye Haritasına Geçiş
function renderTurkeyMap() {
    const wrapper = document.getElementById('svg-wrapper');
    if (typeof turkeyMapSVG === 'undefined') {
        alert("Türkiye harita verisi yüklenemedi!");
        return;
    }
    wrapper.style.opacity = "0";
    setTimeout(() => {
        wrapper.innerHTML = turkeyMapSVG;
        document.getElementById('back-to-world').style.display = "block";
        wrapper.style.opacity = "1";
        colorizeTurkeyProvinces();
        resetZoom();
    }, 200);
}

// Dünyaya Geri Dönüş
function goBackToWorld() {
    const wrapper = document.getElementById('svg-wrapper');
    wrapper.style.opacity = "0";
    setTimeout(() => {
        renderWorldMap();
        wrapper.style.opacity = "1";
    }, 200);
}

/* ==========================================================
   3. BOYAMA VE ETKİLEŞİM MANTIKLARI
   ========================================================== */

// Dünya Haritası Boyama
function colorizeMap() {
    const paths = document.querySelectorAll('#svg-wrapper svg path');
    const t = translations[currentLang].countries;

    paths.forEach(path => {
        const rawId = path.id;
        const countryName = t[rawId];

        if (countryName) {
            const isTR = (countryName === "Türkiye" || countryName === "Turkey" || countryName === "Turkiya");
            path.style.fill = isTR ? "#c0392b" : "#27ae60";
            path.style.cursor = "pointer";
            path.style.stroke = "#fff";
            path.style.strokeWidth = "0.5";

            path.onclick = (e) => {
                e.stopPropagation();
                if (isTR) renderTurkeyMap();
                else openModal(countryName);
            };

            path.onmouseenter = function() { this.style.filter = "brightness(1.2)"; };
            path.onmouseleave = function() { this.style.filter = "none"; };
        } else {
            path.style.fill = "#d1d8e0";
        }
    });
}

// Türkiye İllerini Boyama
function colorizeTurkeyProvinces() {
    const provinces = document.querySelectorAll('#svg-wrapper svg path');
    provinces.forEach(province => {
        province.style.fill = "#27ae60";
        province.style.stroke = "#fff";
        province.style.strokeWidth = "0.3";
        province.style.cursor = "pointer";

        province.onclick = (e) => {
            e.stopPropagation();
            const provinceName = province.getAttribute('name') || province.id;
            // İleride burası 5 kategorili modalı tetikleyecek
            openModal(provinceName + " - Detaylı Sağlık Hizmetleri");
        };

        province.onmouseenter = function() { this.style.fill = "#c0392b"; };
        province.onmouseleave = function() { this.style.fill = "#27ae60"; };
    });
}

/* ==========================================================
   4. ZOOM, SÜRÜKLEME VE DİL SİSTEMİ
   ========================================================== */
function updateTransform() {
    const svg = document.querySelector('#svg-wrapper svg');
    if (svg) svg.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
}

function zoomMap(direction) {
    if (direction === 'in') scale += 0.4;
    else {
        scale -= 0.4;
        if (scale <= 1) resetZoom();
    }
    updateTransform();
}

function resetZoom() {
    scale = 1; pointX = 0; pointY = 0;
    updateTransform();
}

function setupDragEvents(wrapper) {
    wrapper.onmousedown = (e) => {
        if (scale > 1) {
            isDragging = true;
            wrapper.style.cursor = "grabbing";
            start = { x: e.clientX - pointX, y: e.clientY - pointY };
        }
    };
    window.onmousemove = (e) => {
        if (!isDragging) return;
        pointX = e.clientX - start.x;
        pointY = e.clientY - start.y;
        updateTransform();
    };
    window.onmouseup = () => {
        isDragging = false;
        wrapper.style.cursor = "grab";
    };
}

function changeLang(lang) {
    currentLang = lang;
    const t = translations[lang];
    document.querySelector('h1').textContent = t.title;
    document.querySelector('#map-container p').textContent = t.subtitle;
    document.getElementById('nav-home').textContent = t.home;
    document.getElementById('nav-about').textContent = t.about;
    document.getElementById('current-lang-text').textContent = t.langName;
    document.getElementById('current-flag').src = t.flag;

    // Harita üzerindeki isimleri güncellemek için yeniden boya
    const isTurkeyVisible = document.getElementById('back-to-world').style.display === "block";
    if (isTurkeyVisible) colorizeTurkeyProvinces();
    else colorizeMap();
}

/* ==========================================================
   5. MODAL KONTROLÜ
   ========================================================== */
function openModal(name) {
    const modal = document.getElementById('countryModal');
    document.getElementById('modal-country-name').textContent = name;
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('countryModal').style.display = 'none';
}

window.onclick = (event) => {
    const modal = document.getElementById('countryModal');
    if (event.target == modal) closeModal();
};
