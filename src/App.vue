<script setup lang="ts">
import { useAuthStore } from './stores/auth'
import { computed, ref, onMounted, onUnmounted } from 'vue'

const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user)
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const handleLogout = () => {
  authStore.logout()
}

// Handle scroll events for navbar appearance
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

// Close mobile menu when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const navbar = document.getElementById('navbarNav')
  const toggler = document.querySelector('.navbar-toggler')
  
  if (navbar && toggler && !navbar.contains(event.target as Node) && !toggler.contains(event.target as Node)) {
    if (isMobileMenuOpen.value) {
      isMobileMenuOpen.value = false
      // Close Bootstrap navbar
      const bsCollapse = document.getElementById('navbarNav')
      if (bsCollapse && bsCollapse.classList.contains('show')) {
        (document.querySelector('.navbar-toggler') as HTMLElement)?.click()
      }
    }
  }
}

// Toggle mobile menu state
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', handleClickOutside)
  handleScroll() // Check initial scroll position
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <nav class="navbar navbar-expand-lg" :class="{ 'navbar-scrolled': isScrolled }">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <div class="brand-container">
          <div class="brand-icon-wrapper">
            <i class="fas fa-graduation-cap brand-icon"></i>
          </div>
          <span class="brand-text">EduStream</span>
        </div>
      </router-link>
      
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="toggleMobileMenu"
      >
        <span class="toggler-icon"></span>
        <span class="toggler-icon"></span>
        <span class="toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">
              <i class="fas fa-home"></i>
              <span>Home</span>
            </router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <router-link class="nav-link" to="/news">
              <i class="fas fa-book-open"></i>
              <span>Courses</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">
              <i class="fas fa-info-circle"></i>
              <span>About</span>
            </router-link>
          </li>
          
          <template v-if="isAuthenticated">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle user-dropdown"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div class="user-avatar">
                  {{ user?.name.charAt(0).toUpperCase() }}
                </div>
                <span>{{ user?.name }}</span>
              </a>
              <ul class="dropdown-menu">
                <li>
                  <router-link class="dropdown-item" to="/profile">
                    <i class="fas fa-user"></i>
                    Profile
                  </router-link>
                </li>
                <li>
                  <a class="dropdown-item logout-item" href="#" @click.prevent="handleLogout">
                    <i class="fas fa-sign-out-alt"></i>
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </template>
          
          <template v-else>
            <li class="nav-item auth-buttons">
              <router-link class="nav-link login-btn" to="/login">
                <i class="fas fa-sign-in-alt"></i>
                <span>Login</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link register-btn" to="/register">
                <i class="fas fa-user-plus"></i>
                <span>Register</span>
              </router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container main-content-container">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
@import 'bootstrap/dist/css/bootstrap.min.css';

:root {
  --primary-color: #4b2e83; /* Educational purple */
  --secondary-color: #00a8e8; /* Bright blue */
  --accent-color: #ff7f50; /* Coral for highlights */
  --background-color: #f8f9fa;
  --text-color: #333333;
  --card-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  --navbar-height: 70px;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow-x: hidden;
}

.main-content-container {
  min-height: calc(100vh - var(--navbar-height));
  box-sizing: border-box;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

/* Modern Navbar Styles */
.navbar {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  height: var(--navbar-height);
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 1030;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);
}

.navbar-scrolled {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.navbar .container {
  height: 100%;
  display: flex;
  align-items: center;
}

/* Brand Styling */
.brand-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 168, 232, 0.2);
}

.brand-icon {
  font-size: 1.5rem;
  color: white;
}

.brand-text {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.5px;
}

/* Navigation Links */
.navbar-nav {
  gap: 0.5rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem !important;
  color: var(--text-color) !important;
  font-weight: 500;
  border-radius: 10px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link i {
  font-size: 1.1rem;
  transition: transform 0.3s ease;
  min-width: 20px;
  text-align: center;
}

.nav-link:hover,
.nav-link:focus {
  background-color: rgba(75, 46, 131, 0.08);
  color: var(--primary-color) !important;
  transform: translateY(-2px);
}

.nav-link:hover i,
.nav-link:focus i {
  transform: scale(1.1);
}

.nav-link.router-link-active {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white !important;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(75, 46, 131, 0.3);
}

.nav-link.router-link-active i {
  color: white;
}

/* Custom Hamburger Menu */
.navbar-toggler {
  border: none;
  padding: 0.5rem;
  width: 44px;
  height: 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 10px;
  background-color: rgba(75, 46, 131, 0.08);
  transition: all 0.3s ease;
}

.navbar-toggler:focus {
  box-shadow: 0 0 0 0.25rem rgba(75, 46, 131, 0.2);
}

.toggler-icon {
  display: block;
  width: 22px;
  height: 2px;
  background-color: var(--primary-color);
  transition: all 0.3s ease;
  border-radius: 2px;
}

.navbar-toggler[aria-expanded="true"] .toggler-icon:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.navbar-toggler[aria-expanded="true"] .toggler-icon:nth-child(2) {
  opacity: 0;
}

.navbar-toggler[aria-expanded="true"] .toggler-icon:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Dropdown Menu */
.dropdown-menu {
  border: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 0.75rem;
  margin-top: 0.75rem;
  min-width: 200px;
  border: 1px solid rgba(0, 0, 0, 0.03);
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-weight: 500;
  color: var(--text-color);
}

.dropdown-item:hover,
.dropdown-item:focus {
  background-color: rgba(75, 46, 131, 0.08);
  color: var(--primary-color);
}

.dropdown-item i {
  font-size: 1rem;
  min-width: 18px;
  text-align: center;
}

.logout-item {
  color: #e74c3c;
}

.logout-item:hover,
.logout-item:focus {
  background-color: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

.logout-item i {
  color: #e74c3c;
}

/* User Avatar */
.user-dropdown {
  padding: 0.5rem 1rem !important;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
}

/* Auth Buttons */
.login-btn, .register-btn {
  padding: 0.6rem 1.25rem !important;
}

.login-btn {
  background-color: rgba(75, 46, 131, 0.08);
  color: var(--primary-color) !important;
}

.login-btn:hover {
  background-color: rgba(75, 46, 131, 0.15);
}

.register-btn {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white !important;
  box-shadow: 0 4px 15px rgba(75, 46, 131, 0.3);
}

.register-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(75, 46, 131, 0.4);
}

/* Page Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #e9ecef;
}

::-webkit-scrollbar-thumb {
  background: var(--secondary-color);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--primary-color);
}

/* Responsive Adjustments */
@media (max-width: 991.98px) {
  .navbar-collapse {
    background: white;
    padding: 1.25rem;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    margin-top: 1rem;
    border: 1px solid rgba(0, 0, 0, 0.03);
    max-height: calc(100vh - var(--navbar-height) - 2rem);
    overflow-y: auto;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    width: calc(100% - 2rem);
    margin-left: 1rem;
    margin-right: 1rem;
  }

  .navbar-nav {
    gap: 0.75rem;
  }

  .nav-link {
    padding: 0.75rem 1rem !important;
  }

  .nav-link.router-link-active {
    background: rgba(75, 46, 131, 0.08);
    color: var(--primary-color) !important;
    box-shadow: none;
  }

  .nav-link.router-link-active i {
    color: var(--primary-color);
  }

  .dropdown-menu {
    box-shadow: none;
    background: rgba(75, 46, 131, 0.03);
    border: none;
    margin-top: 0.5rem;
    padding: 0.5rem;
  }

  .user-dropdown {
    justify-content: flex-start;
  }

  .auth-buttons {
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
  }

  .login-btn, .register-btn {
    margin-top: 0.5rem;
  }
}

@media (max-width: 575.98px) {
  .brand-icon-wrapper {
    width: 36px;
    height: 36px;
  }

  .brand-icon {
    font-size: 1.3rem;
  }

  .brand-text {
    font-size: 1.3rem;
  }

  .navbar-toggler {
    width: 40px;
    height: 40px;
  }
}
</style>
