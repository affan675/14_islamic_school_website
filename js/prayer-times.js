/**
 * Ideal Learning Academy – Prayer Times (API with Fallback)
 * ------------------------------------------------------------
 * Fetches prayer times from Aladhan API for Springfield, IL.
 * If the API fails or returns empty, uses static fallback times.
 * Populates #prayerTimesWidget on index.html.
 */

(function () {
    'use strict';

    const widget = document.getElementById('prayerTimesWidget');
    if (!widget) return;

    // Coordinates for Springfield, IL (mock)
    const latitude = 39.7817;
    const longitude = -89.6501;
    const method = 2; // Islamic Society of North America (ISNA)
    const apiURL = `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=${method}`;

    // Fallback static times (approximate)
    const fallback = {
        Fajr: '5:23 AM',
        Dhuhr: '12:45 PM',
        Asr: '4:10 PM',
        Maghrib: '7:02 PM',
        Isha: '8:30 PM'
    };

    function renderTimes(timings) {
        const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
        const icons = {
            Fajr: 'fa-cloud-moon',
            Dhuhr: 'fa-sun',
            Asr: 'fa-cloud-sun',
            Maghrib: 'fa-cloud-sun-rain',
            Isha: 'fa-moon'
        };
        let html = '';
        prayers.forEach(p => {
            const time = timings[p] || fallback[p];
            html += `<div class="prayer-card">
                <i class="fa-solid ${icons[p]}"></i>
                <span class="prayer-name">${p}</span>
                <span class="prayer-time">${time}</span>
            </div>`;
        });
        widget.innerHTML = html;
    }

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            if (data && data.data && data.data.timings) {
                renderTimes(data.data.timings);
            } else {
                throw new Error('Invalid API response');
            }
        })
        .catch(() => {
            console.warn('Prayer times API failed, using fallback.');
            renderTimes(fallback);
        });
})();