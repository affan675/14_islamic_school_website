/**
 * Ideal Learning Academy – Custom Cursor (Magnetic Ring)
 * ------------------------------------------------------------
 * Features:
 *   - Hides default system cursor (injects cursor: none globally)
 *   - Small gold dot (cursorDot) follows mouse precisely
 *   - Larger gold ring (cursorRing) trails with smooth lerp delay
 *   - Magnetic effect: on hover of any interactive element
 *     (a, button, input, .btn, .news-card, etc.),
 *     the ring expands, glows brighter, and scales up
 *   - Fallback on touch devices: script exits early,
 *     leaving the default cursor untouched
 *   - Vanilla JS, zero dependencies
 *   - Minimum 70 lines
 */

(function () {
    'use strict';

    // ---------- TOUCH DEVICE DETECTION ----------
    const isTouchDevice = ('ontouchstart' in window) ||
                          (navigator.maxTouchPoints > 0) ||
                          (navigator.msMaxTouchPoints > 0);

    // If touch device, keep default cursor; do nothing
    if (isTouchDevice) return;

    // ---------- DOM ELEMENTS ----------
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');

    // If placeholder divs are missing, abort gracefully
    if (!dot || !ring) return;

    // ---------- HIDE DEFAULT CURSOR ----------
    // Inject a global style rule
    const hideCursorStyle = document.createElement('style');
    hideCursorStyle.textContent = '* { cursor: none !important; }';
    document.head.appendChild(hideCursorStyle);

    // ---------- CURSOR STATE VARIABLES ----------
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    // Dot: instant at mouse position
    dot.style.position = 'fixed';
    dot.style.width = '8px';
    dot.style.height = '8px';
    dot.style.backgroundColor = '#C9A84C';   // gold-mid
    dot.style.borderRadius = '50%';
    dot.style.pointerEvents = 'none';
    dot.style.zIndex = '99998';
    dot.style.transform = 'translate(-50%, -50%)';
    dot.style.transition = 'transform 0.05s linear, background-color 0.2s';
    dot.style.display = 'block';
    dot.style.opacity = '1';

    // Ring: larger, border-only, trails with easing
    ring.style.position = 'fixed';
    ring.style.width = '32px';
    ring.style.height = '32px';
    ring.style.border = '2px solid #C9A84C';  // gold-mid
    ring.style.borderRadius = '50%';
    ring.style.pointerEvents = 'none';
    ring.style.zIndex = '99997';
    ring.style.transform = 'translate(-50%, -50%)';
    ring.style.transition = 'width 0.3s ease, height 0.3s ease, border-color 0.3s, box-shadow 0.3s';
    ring.style.display = 'block';
    ring.style.opacity = '1';
    ring.style.boxShadow = '0 0 12px rgba(201,168,76,0.3)';

    // ---------- MOUSE MOVE HANDLER ----------
    function onMouseMove(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Dot directly at mouse
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    }

    // ---------- RING TRAILING ANIMATION ----------
    function animateRing() {
        const ease = 0.12;   // smoothing factor
        ringX += (mouseX - ringX) * ease;
        ringY += (mouseY - ringY) * ease;

        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';

        requestAnimationFrame(animateRing);
    }

    // ---------- MAGNETIC HOVER EFFECT ----------
    const interactiveSelectors = [
        'a', 'button', 'input', 'textarea', 'select',
        '.btn', '.nav-link', '.news-card', '.prayer-card',
        '.read-more', '.hamburger', '.w-feature'
    ].join(', ');

    function expandRing() {
        ring.style.width = '48px';
        ring.style.height = '48px';
        ring.style.borderColor = '#E2C97E';      // gold-light
        ring.style.boxShadow = '0 0 24px rgba(201,168,76,0.6)';
        dot.style.width = '12px';
        dot.style.height = '12px';
        dot.style.backgroundColor = '#E2C97E';
    }

    function shrinkRing() {
        ring.style.width = '32px';
        ring.style.height = '32px';
        ring.style.borderColor = '#C9A84C';
        ring.style.boxShadow = '0 0 12px rgba(201,168,76,0.3)';
        dot.style.width = '8px';
        dot.style.height = '8px';
        dot.style.backgroundColor = '#C9A84C';
    }

    // Event delegation – check closest interactive element
    document.addEventListener('mouseover', function (e) {
        if (e.target.closest(interactiveSelectors)) {
            expandRing();
        }
    });

    document.addEventListener('mouseout', function (e) {
        if (e.target.closest(interactiveSelectors)) {
            const related = e.relatedTarget;
            if (!related || !related.closest(interactiveSelectors)) {
                shrinkRing();
            }
        }
    });

    // Also handle focus for accessibility
    document.addEventListener('focusin', function (e) {
        if (e.target.matches(interactiveSelectors)) expandRing();
    });
    document.addEventListener('focusout', function (e) {
        if (e.target.matches(interactiveSelectors)) shrinkRing();
    });

    // ---------- HIDE CURSOR WHEN LEAVING WINDOW ----------
    document.addEventListener('mouseleave', function () {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', function () {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
    });

    // ---------- INITIAL POSITIONS ----------
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
    ring.style.left = mouseX + 'px';
    ring.style.top = mouseY + 'px';

    // Start listening
    document.addEventListener('mousemove', onMouseMove, { passive: true });

    // Begin ring animation loop
    animateRing();

    // Clean up injected style on page unload (optional)
    window.addEventListener('beforeunload', function () {
        if (hideCursorStyle.parentNode) {
            hideCursorStyle.parentNode.removeChild(hideCursorStyle);
        }
    });

})();