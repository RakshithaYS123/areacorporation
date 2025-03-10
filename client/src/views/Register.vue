<template>
    <div class="register-container">
        <div class="register-content">
            <div class="register-card">
                <div class="register-header">
                    <div class="logo-container">
                        <div class="logo"></div>
                    </div>
                    <h2 class="register-title">Create Your Account</h2>
                    <p class="register-subtitle">Fill in your details to get started</p>
                </div>

                <div v-if="error" class="error-message">
                    <span class="error-icon">!</span>
                    <span>{{ error }}</span>
                </div>

                <form @submit.prevent="handleRegister" class="register-form">
                    <div class="form-section">
                        <div class="form-group account-type">
                            <label for="userType">Account Type</label>
                            <div class="radio-group">
                                <label class="radio-option" :class="{ active: userType === 'user' }">
                                    <input type="radio" name="userType" id="userTypeUser" value="user"
                                        v-model="userType">
                                    <span class="radio-icon"></span>
                                    <div>
                                        <span class="radio-label">Individual</span>
                                        <span class="radio-description">Personal account</span>
                                    </div>
                                </label>
                                <label class="radio-option" :class="{ active: userType === 'corporation' }">
                                    <input type="radio" name="userType" id="userTypeCorp" value="corporation"
                                        v-model="userType">
                                    <span class="radio-icon"></span>
                                    <div>
                                        <span class="radio-label">Corporation</span>
                                        <span class="radio-description">Business account</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="form-section">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="name">Full Name</label>
                                <div class="input-with-icon">
                                    <span class="input-icon">👤</span>
                                    <input type="text" id="name" v-model="name" required class="form-control"
                                        placeholder="John Doe" />
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="email">Email Address</label>
                                <div class="input-with-icon">
                                    <span class="input-icon">✉</span>
                                    <input type="email" id="email" v-model="email" required class="form-control"
                                        placeholder="your@email.com" />
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="password">Password</label>
                                <div class="input-with-icon">
                                    <span class="input-icon">🔒</span>
                                    <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password"
                                        required class="form-control" placeholder="Create a strong password" />
                                    <button type="button" class="password-toggle" @click="showPassword = !showPassword">
                                        {{ showPassword ? '👁️' : '👁️‍🗨️' }}
                                    </button>
                                </div>
                                <div class="password-strength" v-if="password">
                                    <div class="strength-meter">
                                        <div class="strength-segment" :class="{ active: password.length > 0 }"></div>
                                        <div class="strength-segment" :class="{ active: password.length >= 8 }"></div>
                                        <div class="strength-segment"
                                            :class="{ active: password.length >= 10 && /[A-Z]/.test(password) }"></div>
                                        <div class="strength-segment"
                                            :class="{ active: password.length >= 12 && /[A-Z]/.test(password) && /\d/.test(password) }">
                                        </div>
                                    </div>
                                    <span class="strength-text">{{ getPasswordStrength }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="phone">Phone Number</label>
                                <div class="input-with-icon">
                                    <span class="input-icon">📱</span>
                                    <input type="tel" id="phone" v-model="phone" required class="form-control"
                                        placeholder="+1 (555) 123-4567" />
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="address">Address</label>
                                <div class="input-with-icon textarea-container">
                                    <span class="input-icon">📍</span>
                                    <textarea id="address" v-model="address" required class="form-control textarea"
                                        placeholder="Your full address"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-section">
                        <div class="terms-privacy">
                            <label class="checkbox-container">
                                <input type="checkbox" v-model="acceptTerms" required>
                                <span class="checkmark"></span>
                                I agree to the <a href="#" class="text-link">Terms of Service</a> and <a href="#"
                                    class="text-link">Privacy Policy</a>
                            </label>
                        </div>

                        <div class="form-action">
                            <button type="submit" :disabled="loading || !acceptTerms" class="register-button">
                                <span v-if="loading" class="spinner"></span>
                                <span>{{ loading ? 'Creating Account...' : 'Create Account' }}</span>
                            </button>
                        </div>
                    </div>
                </form>

                <p class="login-link">
                    Already have an account? <router-link to="/login">Sign in</router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'ReGister',

    data() {
        return {
            userType: 'user',
            name: '',
            email: '',
            password: '',
            phone: '',
            address: '',
            error: '',
            loading: false,
            showPassword: false,
            acceptTerms: false
        };
    },
    computed: {
        getPasswordStrength() {
            if (!this.password) return '';
            if (this.password.length < 8) return 'Weak';
            if (this.password.length >= 8 && this.password.length < 10) return 'Fair';
            if (this.password.length >= 10 && /[A-Z]/.test(this.password)) return 'Good';
            if (this.password.length >= 12 && /[A-Z]/.test(this.password) && /\d/.test(this.password)) return 'Strong';
            return 'Fair';
        }
    },
    methods: {
        ...mapActions(['register']),
        async handleRegister() {
            this.loading = true;
            this.error = '';

            try {
                const userData = {
                    userType: this.userType,
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    phone: this.phone,
                    address: this.address
                };

                const result = await this.register(userData);

                if (result.success) {
                    this.$router.push(result.userType === 'user' ? '/user-dashboard' : '/corporation-dashboard');
                } else {
                    this.error = result.error;
                }
            } catch (err) {
                this.error = 'An error occurred during registration';
                console.error(err);
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>

<style scoped>
.register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #f0f7ff 0%, #e6f2ff 50%, #daeaff 100%);
    padding: 40px 20px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    position: relative;
    overflow: hidden;
}

.register-container::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 60%;
    height: 100%;
    background: linear-gradient(135deg, rgba(74, 144, 226, 0.05) 0%, rgba(132, 90, 223, 0.05) 100%);
    clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%);
    z-index: 0;
}

.register-content {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 800px;
}

.register-card {
    width: 100%;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.08);
    padding: 40px;
    transition: transform 0.3s ease;
}

.register-header {
    text-align: center;
    margin-bottom: 30px;
}

.logo-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.logo {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #4a90e2, #845adf);
    border-radius: 12px;
}

.register-title {
    font-size: 28px;
    font-weight: 700;
    color: #1a202c;
    margin-bottom: 8px;
}

.register-subtitle {
    color: #718096;
    font-size: 16px;
}

.register-form {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.form-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #f0f4f8;
}

.form-section:last-of-type {
    border-bottom: none;
}

.form-row {
    display: flex;
    gap: 20px;
    width: 100%;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
}

label {
    font-size: 14px;
    font-weight: 600;
    color: #4a5568;
}

.account-type {
    margin-bottom: 10px;
}

.radio-group {
    display: flex;
    gap: 15px;
}

.radio-option {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 15px;
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    cursor: pointer;
    flex: 1;
    transition: all 0.2s;
}

.radio-option.active {
    border-color: #4a90e2;
    background-color: #f0f7ff;
}

.radio-option input {
    position: absolute;
    opacity: 0;
}

.radio-icon {
    position: relative;
    width: 20px;
    height: 20px;
    border: 2px solid #cbd5e0;
    border-radius: 50%;
    transition: all 0.2s;
}

.radio-option.active .radio-icon {
    border-color: #4a90e2;
}

.radio-option.active .radio-icon::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #4a90e2;
    border-radius: 50%;
}

.radio-label {
    display: block;
    font-weight: 600;
    color: #2d3748;
    font-size: 15px;
}

.radio-description {
    display: block;
    font-size: 13px;
    color: #718096;
}

.form-control {
    height: 50px;
    width: 100%;
    padding: 0 16px 0 40px;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 500;
    transition: all 0.2s;
    background-color: #f8fafc;
    color: #1e293b;
}

.form-control:focus {
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.15);
    outline: none;
    background-color: #fff;
}

.form-control::placeholder {
    color: #a0aec0;
}

.textarea {
    height: 100px;
    padding: 12px 16px 12px 40px;
    resize: vertical;
}

.textarea-container .input-icon {
    top: 14px;
    transform: none;
}

.input-with-icon {
    position: relative;
}

.input-icon {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
    font-size: 16px;
}

.password-toggle {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    font-size: 16px;
    padding: 0;
}

.password-strength {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 8px;
}

.strength-meter {
    display: flex;
    gap: 4px;
    flex: 1;
}

.strength-segment {
    height: 4px;
    flex: 1;
    background-color: #e2e8f0;
    border-radius: 2px;
    transition: background-color 0.2s;
}

.strength-segment.active:nth-child(1) {
    background-color: #fc8181;
}

.strength-segment.active:nth-child(2) {
    background-color: #f6ad55;
}

.strength-segment.active:nth-child(3) {
    background-color: #68d391;
}

.strength-segment.active:nth-child(4) {
    background-color: #38a169;
}

.strength-text {
    font-size: 12px;
    font-weight: 500;
    width: 50px;
    text-align: right;
}

.terms-privacy {
    margin-bottom: 10px;
}

.checkbox-container {
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 28px;
    cursor: pointer;
    color: #4a5568;
    font-weight: 500;
    font-size: 14px;
}

.checkbox-container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 18px;
    width: 18px;
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
}

.checkbox-container:hover input~.checkmark {
    background-color: #f1f5f9;
}

.checkbox-container input:checked~.checkmark {
    background-color: #4a90e2;
    border-color: #4a90e2;
}

.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

.checkbox-container input:checked~.checkmark:after {
    display: block;
}

.checkbox-container .checkmark:after {
    left: 6px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}

.text-link {
    color: #4a90e2;
    text-decoration: none;
    font-weight: 600;
}

.text-link:hover {
    text-decoration: underline;
}

.error-message {
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: #fff5f5;
    color: #e53e3e;
    padding: 12px 16px;
    border-radius: 10px;
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: 500;
    border-left: 4px solid #e53e3e;
}

.error-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    background-color: #e53e3e;
    color: white;
    border-radius: 50%;
    font-weight: bold;
}

.register-button {
    height: 54px;
    width: 100%;
    background: linear-gradient(135deg, #4a90e2, #845adf);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.register-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(74, 144, 226, 0.25);
}

.register-button:active {
    transform: translateY(0);
}

.register-button:disabled {
    background: linear-gradient(135deg, #a0aec0, #cbd5e0);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    opacity: 0.8;
}

.spinner {
    display: inline-block;
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.login-link {
    margin-top: 30px;
    text-align: center;
    font-size: 15px;
    color: #4a5568;
}

.login-link a {
    color: #4a90e2;
    text-decoration: none;
    font-weight: 600;
}

.login-link a:hover {
    text-decoration: underline;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .register-card {
        padding: 30px 20px;
    }

    .register-title {
        font-size: 24px;
    }

    .radio-group {
        flex-direction: column;
    }
}
</style>