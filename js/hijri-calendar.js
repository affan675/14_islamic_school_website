/**
 * Ideal Learning Academy – Hijri Calendar
 * ------------------------------------------------------------
 * Displays the current Hijri date in an element with id="hijriDate".
 * Uses Intl.DateTimeFormat with Islamic calendar where supported,
 * otherwise falls back to a static approximate string.
 */

(function () {
    'use strict';

    const container = document.getElementById('hijriDate');
    if (!container) return;

    try {
        const today = new Date();
        const formatter = new Intl.DateTimeFormat('en-u-ca-islamic', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            weekday: 'long'
        });
        // Some browsers may throw if 'islamic' calendar not supported
        const hijriDateStr = formatter.format(today);
        container.innerHTML = `<i class="fa-solid fa-calendar-alt"></i> ${hijriDateStr}`;
    } catch (e) {
        // Fallback: approximate Hijri date (mock)
        container.innerHTML = '<i class="fa-solid fa-calendar-alt"></i> 5 Dhul-Hijjah 1447 AH (approx.)';
    }
})();