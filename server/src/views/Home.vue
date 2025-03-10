<template>
    <div class="app-container">
        <!-- Navbar -->
        <nav class="navbar">
            <div class="navbar-container">
                <div class="navbar-logo">
                    <router-link to="/" class="logo-link">
                        <span class="logo-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                        </span>
                        <span class="logo-text">Area Corp System</span>
                    </router-link>
                </div>
                <div class="navbar-links">
                    <router-link to="/about" class="nav-link">About</router-link>
                    <router-link to="/contact" class="nav-link">Contact</router-link>
                    <router-link to="/faq" class="nav-link">FAQ</router-link>
                    <router-link to="/login" class="nav-link login-link">Login</router-link>
                    <router-link to="/register" class="nav-link register-link">Register</router-link>
                </div>
                <div class="mobile-menu-toggle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </div>
            </div>
        </nav>

        <div class="home-container">
            <div class="hero-section">
                <div class="hero-content">
                    <h1 class="hero-title">Welcome to Area Corporation System</h1>
                    <p class="hero-subtitle">
                        Report area issues and get them resolved by the appropriate corporations.
                    </p>
                    <div class="hero-divider"></div>
                    <p class="hero-text">
                        Register as a user to report issues, or as a corporation to manage and resolve them.
                    </p>
                    <div class="hero-buttons">
                        <router-link to="/register" class="primary-button">
                            Register
                        </router-link>
                        <router-link to="/login" class="secondary-button">
                            Login
                        </router-link>
                    </div>
                </div>
                <div class="hero-image">
                    <div class="blob-shape"></div>
                </div>
            </div>

            <div class="section-title">Choose Your Role</div>

            <div class="features-section">
                <div class="feature-card user-card">
                    <div class="feature-icon user-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                    <div class="feature-content">
                        <h3 class="feature-title">For Users</h3>
                        <p class="feature-text">
                            Register as a user to report issues in your area. Upload images and provide details
                            about the issues that need attention.
                        </p>
                        <div class="feature-benefits">
                            <div class="feature-benefit-item">
                                <span class="benefit-icon">✓</span>
                                <span>Report local issues</span>
                            </div>
                            <div class="feature-benefit-item">
                                <span class="benefit-icon">✓</span>
                                <span>Upload images as evidence</span>
                            </div>
                            <div class="feature-benefit-item">
                                <span class="benefit-icon">✓</span>
                                <span>Track resolution progress</span>
                            </div>
                        </div>
                        <router-link to="/register?type=user" class="feature-button user-button">
                            Register as User
                        </router-link>
                    </div>
                </div>

                <div class="feature-card corp-card">
                    <div class="feature-icon corp-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                        </svg>
                    </div>
                    <div class="feature-content">
                        <h3 class="feature-title">For Corporations</h3>
                        <p class="feature-text">
                            Register as a corporation to receive notifications about area issues and manage their
                            resolution efficiently.
                        </p>
                        <div class="feature-benefits">
                            <div class="feature-benefit-item">
                                <span class="benefit-icon">✓</span>
                                <span>Receive issue notifications</span>
                            </div>
                            <div class="feature-benefit-item">
                                <span class="benefit-icon">✓</span>
                                <span>Manage resolution workflows</span>
                            </div>
                            <div class="feature-benefit-item">
                                <span class="benefit-icon">✓</span>
                                <span>Improve public relations</span>
                            </div>
                        </div>
                        <router-link to="/register?type=corporation" class="feature-button corp-button">
                            Register as Corporation
                        </router-link>
                    </div>
                </div>
            </div>

            <div class="benefits-section">
                <h2 class="benefits-title">Why Use Our Platform?</h2>
                <div class="benefits-grid">
                    <div class="benefit-item">
                        <div class="benefit-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                        </div>
                        <h4>Real-time Updates</h4>
                        <p>Get notified instantly when your reported issues are addressed</p>
                    </div>
                    <div class="benefit-item">
                        <div class="benefit-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <h4>Efficient Resolution</h4>
                        <p>Issues are routed directly to responsible corporations</p>
                    </div>
                    <div class="benefit-item">
                        <div class="benefit-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </div>
                        <h4>Track Progress</h4>
                        <p>Monitor the status of your reported issues in real-time</p>
                    </div>
                </div>
            </div>

            <footer class="footer">
                <div class="footer-content">
                    <div class="footer-logo">
                        <span class="logo-text">Area Corp System</span>
                        <p class="footer-tagline">Connecting communities with corporations for a better environment</p>
                    </div>
                    <div class="footer-links">
                        <div class="footer-column">
                            <h4>Company</h4>
                            <router-link to="/about" class="footer-link">About Us</router-link>
                            <router-link to="/contact" class="footer-link">Contact</router-link>
                            <router-link to="/careers" class="footer-link">Careers</router-link>
                        </div>
                        <div class="footer-column">
                            <h4>Legal</h4>
                            <router-link to="/terms" class="footer-link">Terms of Service</router-link>
                            <router-link to="/privacy" class="footer-link">Privacy Policy</router-link>
                        </div>
                        <div class="footer-column">
                            <h4>Help</h4>
                            <router-link to="/faq" class="footer-link">FAQ</router-link>
                            <router-link to="/support" class="footer-link">Support</router-link>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2025 Area Corporation System. All rights reserved.</p>
                </div>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomePage'
};
</script>

<style scoped>
/* Base Styles */
.app-container {
    min-height: 100vh;
    background-color: #f6f9fc;
}

/* Navbar Styles */
.navbar {
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
    position: sticky;
    top: 0;
    z-index: 100;
}

.navbar-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
}

.navbar-logo {
    display: flex;
    align-items: center;
}

.logo-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #2c3e50;
    font-weight: 700;
}

.logo-icon {
    display: inline-flex;
    margin-right: 12px;
    color: #5b86e5;
}

.logo-icon svg {
    width: 24px;
    height: 24px;
}

.logo-text {
    font-size: 18px;
}

.navbar-links {
    display: flex;
    align-items: center;
    gap: 24px;
}

.nav-link {
    color: #4a5568;
    text-decoration: none;
    font-weight: 500;
    font-size: 16px;
    transition: color 0.2s;
}

.nav-link:hover {
    color: #5b86e5;
}

.login-link {
    color: #5b86e5;
}

.register-link {
    background-color: #5b86e5;
    color: white;
    padding: 8px 16px;
    border-radius: 8px;
    transition: background-color 0.2s;
}

.register-link:hover {
    background-color: #4a75d4;
}

.mobile-menu-toggle {
    display: none;
    cursor: pointer;
}

.mobile-menu-toggle svg {
    width: 24px;
    height: 24px;
    color: #2c3e50;
}

/* Main Content */
.home-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
}

.hero-section {
    background: linear-gradient(135deg, #5b86e5 0%, #36d1dc 100%);
    border-radius: 20px;
    box-shadow: 0 12px 30px rgba(91, 134, 229, 0.2);
    padding: 60px 40px;
    margin-bottom: 60px;
    display: flex;
    position: relative;
    overflow: hidden;
}

.hero-content {
    flex: 1;
    z-index: 2;
    color: white;
    text-align: left;
}

.hero-image {
    flex: 1;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.blob-shape {
    position: absolute;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 70%);
    border-radius: 50%;
    animation: pulse 8s infinite ease-in-out;
}

@keyframes pulse {
    0% {
        transform: scale(0.8);
        opacity: 0.5;
    }

    50% {
        transform: scale(1.1);
        opacity: 0.8;
    }

    100% {
        transform: scale(0.8);
        opacity: 0.5;
    }
}

.hero-title {
    font-size: 42px;
    font-weight: 800;
    margin-bottom: 20px;
    color: white;
    line-height: 1.2;
}

.hero-subtitle {
    font-size: 22px;
    margin-bottom: 30px;
    max-width: 600px;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;
}

.hero-divider {
    height: 3px;
    background-color: rgba(255, 255, 255, 0.3);
    width: 80px;
    margin: 0 0 30px 0;
}

.hero-text {
    font-size: 18px;
    margin-bottom: 40px;
    max-width: 600px;
    color: rgba(255, 255, 255, 0.85);
}

.hero-buttons {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
}

.primary-button {
    background-color: #ffffff;
    color: #5b86e5;
    font-weight: 600;
    padding: 14px 32px;
    border-radius: 12px;
    font-size: 16px;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.primary-button:hover {
    background-color: #ffffff;
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.secondary-button {
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
    font-weight: 600;
    padding: 14px 32px;
    border-radius: 12px;
    font-size: 16px;
    text-decoration: none;
    transition: all 0.3s ease;
    backdrop-filter: blur(5px);
}

.secondary-button:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-3px);
}

.section-title {
    text-align: center;
    font-size: 28px;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 40px;
    position: relative;
}

.section-title:after {
    content: "";
    display: block;
    width: 60px;
    height: 3px;
    background: linear-gradient(to right, #5b86e5, #36d1dc);
    margin: 15px auto 0;
    border-radius: 2px;
}

/* Updated Features Section */
.features-section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    margin-bottom: 60px;
}

.feature-card {
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: all 0.4s ease;
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    padding-top: 30px;
}

.user-card {
    border-top: 4px solid #36d1dc;
}

.corp-card {
    border-top: 4px solid #ff5e62;
}

.feature-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12);
}

.feature-icon {
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin: 0 auto 20px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.user-icon {
    background: linear-gradient(135deg, #36d1dc 0%, #5b86e5 100%);
    color: white;
}

.corp-icon {
    background: linear-gradient(135deg, #ff9966 0%, #ff5e62 100%);
    color: white;
}

.feature-icon svg {
    width: 30px;
    height: 30px;
}

.feature-content {
    padding: 20px 30px 30px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.feature-title {
    font-size: 24px;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 16px;
    text-align: center;
}

.feature-text {
    font-size: 16px;
    color: #718096;
    margin-bottom: 20px;
    line-height: 1.7;
    text-align: center;
}

.feature-benefits {
    margin-bottom: 30px;
    flex-grow: 1;
}

.feature-benefit-item {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    color: #4a5568;
}

.benefit-icon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 10px;
    font-size: 12px;
    color: white;
}

.user-card .benefit-icon {
    background-color: #36d1dc;
}

.corp-card .benefit-icon {
    background-color: #ff5e62;
}

.feature-button {
    display: block;
    width: 100%;
    color: white;
    font-weight: 600;
    padding: 12px 24px;
    border-radius: 10px;
    font-size: 16px;
    text-decoration: none;
    transition: all 0.3s ease;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.user-button {
    background: linear-gradient(135deg, #5b86e5 0%, #36d1dc 100%);
}

.corp-button {
    background: linear-gradient(135deg, #ff9966 0%, #ff5e62 100%);
}

.feature-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

/* Benefits Section */
.benefits-section {
    background-color: white;
    padding: 50px 40px;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
    margin-bottom: 60px;
}

.benefits-title {
    text-align: center;
    font-size: 24px;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 40px;
}

.benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
}

.benefit-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.benefit-icon {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    background: linear-gradient(135deg, #5b86e5 0%, #36d1dc 100%);
    color: white;
}

.benefit-icon svg {
    width: 30px;
    height: 30px;
}

.benefit-item h4 {
    font-size: 20px;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 10px;
}

.benefit-item p {
    color: #718096;
    line-height: 1.6;
}

/* Footer Styles */
.footer {
    background-color: white;
    border-radius: 16px 16px 0 0;
    padding: 60px 40px 20px;
    box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.05);
}

.footer-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 40px;
}

.footer-logo {
    flex: 1;
    min-width: 250px;
    margin-bottom: 30px;
}

.footer-logo .logo-text {
    font-size: 20px;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 12px;
    display: block;
}

.footer-tagline {
    color: #718096;
    max-width: 300px;
    font-size: 14px;
    line-height: 1.6;
}

.footer-links {
    flex: 2;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.footer-column {
    min-width: 150px;
    margin-bottom: 30px;
}

.footer-column h4 {
    font-size: 16px;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 16px;
}

.footer-link {
    display: block;
    margin-bottom: 10px;
    color: #718096;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.2s;
}

.footer-link:hover {
    color: #5b86e5;
}

.footer-bottom {
    text-align: center;
    padding-top: 20px;
    border-top: 1px solid #e2e8f0;
    color: #a0aec0;
    font-size: 14px;
}

/* Responsive Styles */
@media (max-width: 900px) {
    .hero-section {
        flex-direction: column;
        padding: 40px 20px;
    }

    .hero-content {
        text-align: center;
    }

    .hero-divider {
        margin: 0 auto 30px;
    }

    .hero-text {
        margin-left: auto;
        margin-right: auto;
    }

    .hero-buttons {
        justify-content: center;
    }

    .hero-image {
        margin-top: 40px;
    }

    .blob-shape {
        width: 250px;
        height: 250px;
    }

    .features-section {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .navbar-links {
        display: none;
        /* Hide links on mobile */
    }

    .mobile-menu-toggle {
        display: block;
        /* Show menu toggle on mobile */
    }

    .hero-title {
        font-size: 32px;
    }

    .hero-subtitle {
        font-size: 18px;
    }

    .section-title {
        font-size: 24px;
    }

    .footer-content {
        flex-direction: column;
    }

    .footer-links {
        flex-direction: column;
    }
}

@media (max-width: 550px) {
    .hero-buttons {
        flex-direction: column;
        width: 100%;
    }

    .primary-button,
    .secondary-button {
        width: 100%;
        text-align: center;
    }
}
</style>