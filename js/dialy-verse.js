/**
 * Ideal Learning Academy – Daily Verse / Hadith
 * ------------------------------------------------------------
 * Displays a rotating Islamic verse or hadith in #dailyVerse.
 * Uses a static array and picks based on the day of the year.
 */

(function () {
    'use strict';

    const container = document.getElementById('dailyVerse');
    if (!container) return;

    const verses = [
        {
            text: 'وَمَن يَتَّقِ ٱللَّهَ يَجْعَل لَّهُۥ مَخْرَجًۭا',
            ref: 'Quran 65:2',
            translation: 'And whoever fears Allah – He will make for him a way out.'
        },
        {
            text: 'إِنَّ مَعَ ٱلْعُسْرِ يُسْرًۭا',
            ref: 'Quran 94:6',
            translation: 'Indeed, with hardship comes ease.'
        },
        {
            text: 'رَبِّ زِدْنِى عِلْمًۭا',
            ref: 'Quran 20:114',
            translation: 'My Lord, increase me in knowledge.'
        },
        {
            text: 'وَأَحْسِن كَمَآ أَحْسَنَ ٱللَّهُ إِلَيْكَ',
            ref: 'Quran 28:77',
            translation: 'And do good as Allah has done good to you.'
        },
        {
            text: 'اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ',
            ref: 'Hadith (Bukhari)',
            translation: 'O Allah, send peace and blessings upon Muhammad and his family.'
        }
    ];

    // Pick based on day of year
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const verse = verses[dayOfYear % verses.length];

    container.innerHTML = `
        <p class="arabic-text">${verse.text}</p>
        <p><em>"${verse.translation}"</em></p>
        <small>— ${verse.ref}</small>
    `;
})();