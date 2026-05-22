/**
 * Ideal Learning Academy – Preloader Script (v3)
 * ------------------------------------------------------------
 * - 5 seconds total loading, 20% per second → one star lights per second
 * - Each page gets 2 unique quotes (Islamic & general),
 *   stored inside this file and injected automatically
 * - Quote cycles every 2.5 seconds (Islamic → general after 2.5s)
 * - Fades out after 5 seconds AND page load complete
 */

(function () {
    'use strict';

    // ==================== PAGE‑SPECIFIC QUOTES ====================
    const quotesByPage = {
        'index': [
            "“Seek knowledge from the cradle to the grave.” — Hadith",
            "“Education is the most powerful weapon which you can use to change the world.” — Nelson Mandela"
        ],
        'about': [
            "“The best among you are those who learn the Quran and teach it.” — Hadith",
            "“The function of education is to teach one to think intensively.” — Martin Luther King Jr."
        ],
        'academics': [
            "“Are those who know equal to those who do not know?” — Quran 39:9",
            "“The roots of education are bitter, but the fruit is sweet.” — Aristotle"
        ],
        'admissions': [
            "“My Lord, increase me in knowledge.” — Quran 20:114",
            "“Education is not preparation for life; education is life itself.” — John Dewey"
        ],
        'islamic-life': [
            "“And I did not create the jinn and mankind except to worship Me.” — Quran 51:56",
            "“Live as if you were to die tomorrow. Learn as if you were to live forever.” — Mahatma Gandhi"
        ],
        'gallery': [
            "“Allah is beautiful, and He loves beauty.” — Hadith",
            "“A picture is a poem without words.” — Horace"
        ],
        'contact': [
            "“The believers are but brothers, so make settlement between your brothers.” — Quran 49:10",
            "“The single biggest problem in communication is the illusion that it has taken place.” — George Bernard Shaw"
        ],
        'student-dashboard': [
            "“And say: My Lord, increase me in knowledge.” — Quran 20:114",
            "“Success is not final, failure is not fatal: it is the courage to continue that counts.” — Winston Churchill"
        ],
        'student-resources': [
            "“The seeking of knowledge is obligatory for every Muslim.” — Hadith",
            "“The beautiful thing about learning is that nobody can take it away from you.” — B.B. King"
        ],
        'student-prayer-log': [
            "“Indeed, prayer prohibits immorality and wrongdoing.” — Quran 29:45",
            "“The future belongs to those who believe in the beauty of their dreams.” — Eleanor Roosevelt"
        ],
        'student-quran-tracker': [
            "“This is the Book about which there is no doubt, a guidance for those conscious of Allah.” — Quran 2:2",
            "“It does not matter how slowly you go as long as you do not stop.” — Confucius"
        ]
    };

    // ==================== DETECT CURRENT PAGE ====================
    function detectCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop().replace('.html', '') || 'index';
        // Return matching key, fallback to 'index'
        return quotesByPage[filename] ? filename : 'index';
    }

    const currentPage = detectCurrentPage();
    const pageQuotes = quotesByPage[currentPage];

    // ==================== DOM ELEMENTS ====================
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    const stars = document.querySelectorAll('#preloaderStars .star');
    const progressBar = document.getElementById('preloaderBar');
    const percentageText = document.getElementById('preloaderPercentage');
    const quoteElement = document.getElementById('preloaderQuote');

    // ==================== STATE ====================
    let progress = 0;
    let complete = false;
    const TOTAL_DURATION = 5000;        // 5 seconds
    let startTime = null;
    let animationFrameId = null;
    let quoteIndex = 0;                 // 0 = Islamic, 1 = general

    // ==================== FUNCTIONS ====================
    function updateStars() {
        if (!stars.length) return;
        const litCount = Math.floor(progress / 20);   // 0,1,2,3,4,5
        stars.forEach((star, index) => {
            star.classList.toggle('lit', index < litCount);
        });
    }

    function updateQuote() {
        if (!quoteElement || !pageQuotes) return;
        // Switch quote when progress passes 50% (2.5 seconds)
        const newIndex = progress < 50 ? 0 : 1;
        if (quoteIndex !== newIndex) {
            quoteIndex = newIndex;
            quoteElement.textContent = pageQuotes[quoteIndex];
        }
    }

    function updateUI() {
        if (progressBar) progressBar.style.width = progress + '%';
        if (percentageText) percentageText.textContent = Math.floor(progress) + '%';
        updateStars();
        updateQuote();
    }

    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        progress = Math.min(100, (elapsed / TOTAL_DURATION) * 100);
        updateUI();

        if (progress < 100) {
            animationFrameId = requestAnimationFrame(animate);
        } else {
            completeLoading();
        }
    }

    function completeLoading() {
        if (complete) return;
        complete = true;
        progress = 100;
        updateUI();

        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }

        // Fade out after a tiny pause so 100% is visible
        setTimeout(() => {
            preloader.style.transition = 'opacity 0.6s ease, visibility 0.6s ease';
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';

            const onTransitionEnd = () => {
                preloader.removeEventListener('transitionend', onTransitionEnd);
                if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
                preloader.style.display = 'none';
            };
            preloader.addEventListener('transitionend', onTransitionEnd);

            // Safety removal
            setTimeout(() => {
                if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
            }, 800);
        }, 300);
    }

    function init() {
        // Display first quote (Islamic)
        if (quoteElement && pageQuotes) {
            quoteElement.textContent = pageQuotes[0];
            quoteIndex = 0;
        }
        updateUI();
        animationFrameId = requestAnimationFrame(animate);
    }

    // ==================== START ====================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // If page loads faster than 5 seconds, wait for both
    let pageLoaded = false;
    window.addEventListener('load', () => {
        pageLoaded = true;
        if (progress >= 100) completeLoading();
    });

    // After 5 seconds, ensure completion
    setTimeout(() => {
        if (!complete) {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            progress = 100;
            updateUI();
            completeLoading();
        }
    }, TOTAL_DURATION + 200);

})();