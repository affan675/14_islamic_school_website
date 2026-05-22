/**
 * Ideal Learning Academy – Event Countdown (Next Jummah)
 * ------------------------------------------------------------
 * Counts down to the next Friday 1:00 PM (local time).
 * Displays remaining time in #eventCountdown.
 */

(function () {
    'use strict';

    const container = document.getElementById('eventCountdown');
    if (!container) return;

    function getNextJummah() {
        const now = new Date();
        const day = now.getDay(); // 5 = Friday
        let daysUntilFriday = (5 - day + 7) % 7;
        if (daysUntilFriday === 0) {
            // If today is Friday and before 1 PM, countdown to today 1 PM
            const today1pm = new Date(now);
            today1pm.setHours(13, 0, 0, 0);
            if (now < today1pm) {
                return today1pm;
            }
            // else next Friday
            daysUntilFriday = 7;
        }
        const nextFriday = new Date(now);
        nextFriday.setDate(now.getDate() + daysUntilFriday);
        nextFriday.setHours(13, 0, 0, 0);
        return nextFriday;
    }

    function formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    function updateCountdown() {
        const target = getNextJummah();
        const now = new Date();
        const remaining = target - now;
        if (remaining <= 0) {
            container.innerHTML = '<p>Jummah is happening now or just passed. May Allah accept.</p>';
            return;
        }
        container.innerHTML = `
            <div class="countdown-box">
                <h3><i class="fa-solid fa-mosque"></i> Next Jummah</h3>
                <div class="countdown-timer">${formatTime(remaining)}</div>
                <small>Friday 1:00 PM</small>
            </div>`;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
})();