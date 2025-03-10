<template>
    <div class="login-container">
        <div class="login-card">
            <div class="login-header">
                <div class="logo-container">
                    <div class="logo"></div>
                </div>
                <h2 class="login-title">Welcome Back</h2>
                <p class="login-subtitle">Enter your credentials to continue</p>
            </div>

            <div v-if="error" class="error-message">
                <span class="error-icon">!</span>
                <span>{{ error }}</span>
            </div>

            <form @submit.prevent="handleLogin" class="login-form">
                <div class="form-group">
                    <label for="userType">Account Type</label>
                    <div class="select-wrapper">
                        <select v-model="userType" id="userType" class="form-control">
                            <option value="user">Individual User</option>
                            <option value="corporation">Corporation</option>
                        </select>
                        <div class="select-arrow"></div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="email">Email Address</label>
                    <div class="input-with-icon">
                        <span class="input-icon">✉</span>
                        <input type="email" id="email" v-model="email" required class="form-control"
                            placeholder="your@email.com" />
                    </div>
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <div class="input-with-icon">
                        <span class="input-icon">🔒</span>
                        <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" required
                            class="form-control" placeholder="Enter your password" />
                        <button type="button" class="password-toggle" @click="showPassword = !showPassword">
                            {{ showPassword ? '👁️' : '👁️‍🗨️' }}
                        </button>
                    </div>
                </div>

                <div class="remember-forgot">
                    <label class="checkbox-container">
                        <input type="checkbox" v-model="rememberMe">
                        <span class="checkmark"></span>
                        Remember me
                    </label>
                    <router-link to="/forgot-password" class="forgot-link">Forgot password?</router-link>
                </div>

                <div class="form-action">
                    <button type="submit" :disabled="loading" class="login-button">
                        <span v-if="loading" class="spinner"></span>
                        <span>{{ loading ? 'Authenticating...' : 'Sign In' }}</span>
                    </button>
                </div>
            </form>

            <div class="social-login">
                <p class="social-divider"><span>Or continue with</span></p>
                <div class="social-buttons">
                    <button type="button" class="social-button google">G</button>
                    <button type="button" class="social-button apple">A</button>
                    <button type="button" class="social-button facebook">f</button>
                </div>
            </div>

            <p class="register-link">
                Don't have an account? <router-link to="/register">Create an account</router-link>
            </p>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'LoGin',

    data() {
        return {
            userType: 'user',
            email: '',
            password: '',
            error: '',
            loading: false,
            showPassword: false,
            rememberMe: false
        };
    },
    methods: {
        ...mapActions(['login']),
        async handleLogin() {
            this.loading = true;
            this.error = '';

            try {
                const loginData = {
                    email: this.email,
                    password: this.password,
                    userType: this.userType,
                    rememberMe: this.rememberMe
                };

                const result = await this.login(loginData);

                if (result.success) {
                    this.$router.push(result.userType === 'user' ? '/user-dashboard' : '/corporation-dashboard');
                } else {
                    this.error = result.error;
                }
            } catch (err) {
                this.error = 'An error occurred during login';
                console.error(err);
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f9fafb;
    padding: 20px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.login-card {
    width: 100%;
    max-width: 450px;
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
    padding: 40px;
    transition: transform 0.3s ease;
}

.login-card:hover {
    transform: translateY(-5px);
}

.login-header {
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

.login-title {
    font-size: 28px;
    font-weight: 700;
    color: #1a202c;
    margin-bottom: 8px;
}

.login-subtitle {
    color: #718096;
    font-size: 16px;
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

label {
    font-size: 14px;
    font-weight: 600;
    color: #4a5568;
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

.select-wrapper {
    position: relative;
}

.select-wrapper select {
    appearance: none;
    padding-right: 40px;
}

.select-arrow {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    width: 10px;
    height: 10px;
    border-right: 2px solid #94a3b8;
    border-bottom: 2px solid #94a3b8;
    transform: translateY(-50%) rotate(45deg);
    pointer-events: none;
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

.remember-forgot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: -10px;
    font-size: 14px;
}

.checkbox-container {
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 28px;
    cursor: pointer;
    color: #4a5568;
    font-weight: 500;
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

.forgot-link {
    color: #4a90e2;
    text-decoration: none;
    font-weight: 500;
}

.forgot-link:hover {
    text-decoration: underline;
}

.login-button {
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

.login-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(74, 144, 226, 0.25);
}

.login-button:active {
    transform: translateY(0);
}

.login-button:disabled {
    background: linear-gradient(135deg, #a0aec0, #cbd5e0);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
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

.social-login {
    margin-top: 30px;
}

.social-divider {
    display: flex;
    align-items: center;
    text-align: center;
    color: #a0aec0;
    font-size: 14px;
    margin-bottom: 20px;
}

.social-divider::before,
.social-divider::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #e2e8f0;
}

.social-divider span {
    padding: 0 16px;
}

.social-buttons {
    display: flex;
    justify-content: center;
    gap: 16px;
}

.social-button {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    border: 1px solid #e2e8f0;
    background-color: white;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
}

.social-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.google {
    color: #ea4335;
}

.apple {
    color: #000;
}

.facebook {
    color: #1877f2;
}

.register-link {
    margin-top: 30px;
    text-align: center;
    font-size: 15px;
    color: #4a5568;
}

.register-link a {
    color: #4a90e2;
    text-decoration: none;
    font-weight: 600;
}

.register-link a:hover {
    text-decoration: underline;
}

/* Responsive adjustments */
@media (max-width: 480px) {
    .login-card {
        padding: 30px 20px;
    }

    .login-title {
        font-size: 24px;
    }

    .form-control {
        height: 46px;
    }

    .login-button {
        height: 50px;
    }
}
</style>