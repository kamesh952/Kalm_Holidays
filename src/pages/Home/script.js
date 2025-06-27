
window.onload = function() {
    closeModal();
    setupCarousel();
};

function openModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        const iframe = modal.querySelector('iframe');
        modal.style.display = 'flex';
        modal.style.zIndex = '1000'; // Ensure it appears in front
        if (iframe) iframe.style.display = 'block';
    }
}

function closeModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        const iframe = modal.querySelector('iframe');
        modal.style.display = 'none';
        if (iframe) iframe.style.display = 'none';
    }
}

function openCountryModal() {
    const modal = document.getElementById('country-modal');
    if (modal) {
        modal.style.display = 'block';
        modal.style.zIndex = '900'; // Ensure it's behind login modal
    }
}

function closeCountryModal() {
    const modal = document.getElementById('country-modal');
    if (modal) modal.style.display = 'none';
}

function selectCountry(currency, flagUrl) {
    const currencyElement = document.getElementById('currency');
    const flagIcon = document.getElementById('flag-icon');
    if (currencyElement && flagIcon) {
        currencyElement.textContent = currency;
        flagIcon.src = flagUrl;
        closeCountryModal();
    }
}function setupCarousel() {
    console.log("Carousel is being set up.");
let currentSlide = 0;
        let slides = document.querySelectorAll('.carousel-slide');
        let slideInterval;

        function showSlide(index) {
            slides[currentSlide].classList.remove('active');
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        function nextSlide() { showSlide(currentSlide + 1); }
        function prevSlide() { showSlide(currentSlide - 1); }

        function startAutoSlide() {
            slideInterval = setInterval(nextSlide, 200000);
        }

        function stopAutoSlide() {
            clearInterval(slideInterval);
        }

        document.querySelector('.carousel').addEventListener('mouseenter', stopAutoSlide);
        document.querySelector('.carousel').addEventListener('mouseleave', startAutoSlide);
        document.querySelector('.prev').addEventListener('click', prevSlide);
        document.querySelector('.next').addEventListener('click', nextSlide);

        startAutoSlide();
        function toggleMenu() {
            const navItems = document.getElementById("navItems");
            navItems.classList.toggle("show");
        }
    }
function navigateToHome() {
    window.location.href = "HOME.html";
}function changeCountry(countryName, countryCode) {
            
    document.getElementById("current-flag").src = `https://flagcdn.com/w40/${countryCode}.png`;
}
