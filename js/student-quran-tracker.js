/**
 * Ideal Learning Academy – Quran Tracker (Juz Checklist)
 * ------------------------------------------------------------
 * Stores completed Juz in localStorage.
 * Renders a grid of 30 checkboxes.
 * Saves state on change.
 * Progress text now correctly shows e.g. “5 / 30 Juz completed”.
 */

var QuranTracker = (function () {
    'use strict';

    const STORAGE_KEY = 'ila_quran_juz';
    const TOTAL_JUZ = 30;

    function getCompletedJuz() {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }

    function saveCompletedJuz(juzList) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(juzList));
    }

    function render() {
        const container = document.getElementById('quranTrackerContainer');
        if (!container) return;

        const completed = getCompletedJuz();
        let html = '<h2>Juz Progress</h2><div class="juz-grid">';
        for (let i = 1; i <= TOTAL_JUZ; i++) {
            const checked = completed.includes(i) ? 'checked' : '';
            html += `<label class="juz-item">
                <input type="checkbox" class="juz-checkbox" data-juz="${i}" ${checked}>
                <span>Juz ${i}</span>
            </label>`;
        }
        // Fixed line: using backticks to evaluate ${...}
        html += `</div><p id="progressText">${completed.length} / ${TOTAL_JUZ} Juz completed</p>`;
        container.innerHTML = html;

        // Attach event listeners
        document.querySelectorAll('.juz-checkbox').forEach(cb => {
            cb.addEventListener('change', function () {
                const juz = parseInt(this.dataset.juz, 10);
                let completedList = getCompletedJuz();
                if (this.checked) {
                    if (!completedList.includes(juz)) completedList.push(juz);
                } else {
                    completedList = completedList.filter(j => j !== juz);
                }
                saveCompletedJuz(completedList);
                render(); // re‑render to update progress text
            });
        });
    }

    function init() {
        render();
    }

    return { init };
})();