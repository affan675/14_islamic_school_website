/**
 * Ideal Learning Academy – Student Login Mock (v2)
 * ------------------------------------------------------------
 * Three mock student accounts (see credentials below).
 * Stores logged‑in student name in sessionStorage.
 *
 * ── CREDENTIALS ─────────────────────────────
 *   Username      Password      Student Name
 *   ───────────   ───────────   ─────────────
 *   student        islam         Abdullah Khan
 *   fatima         quran         Fatima Ahmed
 *   ahmad          ilm           Ahmad Hassan
 * ────────────────────────────────────────────
 */

const StudentAuth = (function () {
    'use strict';

    const STORAGE_KEY = 'ila_student_loggedIn';
    const NAME_KEY = 'ila_student_name';

    // Mock database – add more students here
    const STUDENTS = [
        { username: 'student', password: 'islam', name: 'Abdullah Khan' },
        { username: 'fatima',  password: 'quran', name: 'Fatima Ahmed' },
        { username: 'ahmad',   password: 'ilm',   name: 'Ahmad Hassan' }
    ];

    /**
     * Attempt login with given credentials.
     * @param {string} username
     * @param {string} password
     * @returns {boolean} true if credentials match a student
     */
    function login(username, password) {
        const student = STUDENTS.find(
            s => s.username === username && s.password === password
        );
        if (student) {
            sessionStorage.setItem(STORAGE_KEY, 'true');
            sessionStorage.setItem(NAME_KEY, student.name);
            return true;
        }
        return false;
    }

    /**
     * Logout – clears session and redirects to login page.
     */
    function logout() {
        sessionStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem(NAME_KEY);
        window.location.href = 'student-dashboard.html';
    }

    /**
     * Check if a student is logged in.
     * @returns {boolean}
     */
    function isLoggedIn() {
        return sessionStorage.getItem(STORAGE_KEY) === 'true';
    }

    /**
     * Returns the name of the currently logged‑in student.
     * @returns {string}
     */
    function getStudentName() {
        return sessionStorage.getItem(NAME_KEY) || 'Student';
    }

    /**
     * Redirect to login if not authenticated.
     * Call this on protected pages.
     */
    function protectPage() {
        if (!isLoggedIn()) {
            window.location.href = 'student-dashboard.html';
        }
    }

    // Public API
    return {
        login,
        logout,
        isLoggedIn,
        getStudentName,
        protectPage
    };

})();