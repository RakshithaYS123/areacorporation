<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link to="/" class="navbar-brand">Area Corporation System</router-link>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <template v-if="!isAuthenticated">
              <li class="nav-item">
                <router-link to="/register" class="nav-link">Register</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/login" class="nav-link">Login</router-link>
              </li>
            </template>
            <li v-if="isAuthenticated" class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                Dashboard
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link v-if="userType === 'user'" to="/user-dashboard" class="dropdown-item">User
                  Dashboard</router-link>
                <router-link v-if="userType === 'corporation'" to="/corporation-dashboard"
                  class="dropdown-item">Corporation
                  Dashboard</router-link>
                <div class="dropdown-divider"></div>
                <a href="#" class="dropdown-item" @click="handleLogout">Logout</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container mt-4">
      <router-view></router-view>
    </div>

    <footer class="text-center py-4 bg-light mt-auto">
      &copy; 2025 Area Corporation System
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters(['isAuthenticated', 'userType'])
  },
  methods: {
    ...mapActions(['logout']),
    handleLogout() {
      this.logout();
      this.$router.push('/');
    }
  }
};
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.min.css';

body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  flex: 1;
}

footer {
  background-color: #f8f9fa;
  padding: 1rem 0;
  text-align: center;
}
</style>