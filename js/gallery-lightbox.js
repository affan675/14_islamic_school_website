/**
 * Ideal Learning Academy – Gallery Lightbox
 * ------------------------------------------------------------
 * Simple lightbox for gallery images.
 * Click on .gallery-item opens the image in a full‑screen overlay.
 * Click on the overlay or close button dismisses it.
 * Keyboard (Escape) also closes.
 * Minimum 50 lines.
 */

(function () {
    'use strict';

    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const closeBtn = document.querySelector('.lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-item[data-lightbox]');

    if (!lightbox || !lightboxImage || !galleryItems.length) return;

    // Open lightbox
    galleryItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const src = this.getAttribute('href');
            lightboxImage.setAttribute('src', src);
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // prevent scrolling
        });
    });

    // Close function
    function closeLightbox() {
        lightbox.style.display = 'none';
        lightboxImage.setAttribute('src', '');
        document.body.style.overflow = '';
    }

    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    // Click outside the image (the overlay itself)
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard support
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            closeLightbox();
        }
    });

})();