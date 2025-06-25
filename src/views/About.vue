<template>
  <div class="container about-container py-4">
    <!-- Title Section - similar to Home page hero -->
    <div class="row justify-content-center mb-4 mb-lg-5">
      <div class="col-12 col-md-10 text-center">
        <p class="lead page-subtitle">
          Learn more about our mission, values, and how we bring you the best learning experience.
        </p>
      </div>
    </div>

    <!-- Main Content Row - directly under .container (or after hero) -->
    <div class="row g-4 align-items-stretch">
      <div class="col-12 col-md-6 d-flex mb-4 mb-md-0">
        <div class="about-card flex-fill">
          <h3 class="section-title">Our Mission</h3>
          <p class="section-text">
            EduStream is dedicated to providing high-quality educational content from around the world. Our mission is to keep you engaged with interactive courses and comprehensive learning materials.
          </p>
          <ul class="features-list">
            <li class="feature-item"><i class="fas fa-check-circle"></i> Expert Instructors</li>
            <li class="feature-item"><i class="fas fa-check-circle"></i> Interactive Lessons</li>
            <li class="feature-item"><i class="fas fa-check-circle"></i> Community Learning</li>
          </ul>
        </div>
      </div>

      <div class="col-12 col-md-6 d-flex flex-column gap-3">
        <div class="welcome-card flex-fill">
          <h3 class="section-title">Welcome Message</h3>
          <div class="form-group mb-3">
            <label for="firstName" class="form-label">First Name</label>
            <input
              type="text"
              class="form-control"
              id="firstName"
              v-model="firstName"
              placeholder="Enter your first name"
            >
          </div>
          <div class="form-group mb-3">
            <label for="lastName" class="form-label">Last Name</label>
            <input
              type="text"
              class="form-control"
              id="lastName"
              v-model="lastName"
              placeholder="Enter your last name"
            >
          </div>
          <div v-if="fullName" class="welcome-message">
            <i class="fas fa-user-circle"></i>
            <span>Welcome, {{ fullName }}! Ready to start learning?</span>
          </div>
        </div>
        <div class="view-preference-card flex-fill">
          <h3 class="section-title">Choose Your Learning Environment</h3>
          <div class="view-options mb-3">
            <div class="view-option">
              <input
                class="form-check-input"
                type="radio"
                name="viewPreference"
                id="mountain"
                value="mountain"
                v-model="selectedView"
              >
              <label class="form-check-label" for="mountain">
                <i class="fas fa-laptop"></i>
                Desktop Learning
              </label>
            </div>
            <div class="view-option">
              <input
                class="form-check-input"
                type="radio"
                name="viewPreference"
                id="ocean"
                value="ocean"
                v-model="selectedView"
              >
              <label class="form-check-label" for="ocean">
                <i class="fas fa-mobile-alt"></i>
                Mobile Learning
              </label>
            </div>
          </div>
          <div class="selected-view-container" v-if="selectedView">
            <img
              :src="selectedView === 'mountain' ? 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60' : 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=60'"
              :alt="selectedView + ' view'"
              class="view-image img-fluid"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const firstName = ref('')
const lastName = ref('')
const selectedView = ref('')

const fullName = computed(() => {
  if (firstName.value && lastName.value) {
    return `${firstName.value} ${lastName.value}`
  }
  return ''
})
</script>

<style scoped>
.about-container {
  min-height: calc(100vh - var(--navbar-height)); /* From Home page */
  background-color: var(--background-color); /* Use variable for consistency */
  padding-bottom: 2rem; /* Ensure bottom padding */
}

/* Styles for the new title section */
.page-title {
  color: var(--primary-color);
  font-weight: 700; /* Match home hero */
  margin-bottom: 1rem; /* Match home hero */
}

.page-subtitle {
  color: #555; /* Slightly darker than default lead for better contrast */
  font-size: 1.15rem; /* Match home hero lead */
  margin-bottom: 0; /* No extra margin if it's the last element in its col */
}


.about-card,
.welcome-card,
.view-preference-card {
  background: white;
  padding: 2rem; /* Match Home page .content-card padding */
  border-radius: 10px;
  box-shadow: var(--card-shadow);
  transition: transform 0.3s ease;
  width: 100%; /* Fill the parent col-md-6 */
  display: flex;
  flex-direction: column;
}

.about-card:hover,
.welcome-card:hover,
.view-preference-card:hover {
  transform: translateY(-5px);
}

.section-title {
  color: var(--primary-color);
  font-weight: 700; /* Match Home page .section-title */
  margin-bottom: 1.5rem; /* Match Home page .section-title */
}

.section-text {
  color: #666;
  line-height: 1.8; /* Match Home page .section-text */
  font-size: 1.1rem; /* Match Home page .section-text */
  margin-bottom: 1.5rem; /* Match Home page .section-text */
}

.features-list {
  list-style: none;
  padding-left: 0;
  margin-top: 1rem; /* Adjusted from 1.2rem */
  margin-bottom: 0; /* Ensure no extra bottom margin if it's the last element */
}

.feature-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem; /* Adjusted from 0.7rem */
  color: var(--primary-color);
  font-size: 1.05rem; /* Slightly larger for readability */
}

.feature-item i {
  color: var(--secondary-color);
  margin-right: 0.7rem;
  font-size: 1.1rem;
  width: 20px; /* For alignment */
  text-align: center;
}

.form-group {
  margin-bottom: 1.25rem; /* Slightly increased */
}

.form-label {
  color: var(--primary-color);
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.form-control {
  border: 1px solid #ced4da; /* Standard Bootstrap border color */
  border-radius: 6px;
  padding: 0.7rem 1rem;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.form-control:focus {
  border-color: var(--secondary-color);
  box-shadow: 0 0 0 0.2rem rgba(52, 152, 219, 0.25);
}

.welcome-message {
  background-color: rgba(var(--secondary-color-rgb, 52, 152, 219), 0.1); /* Softer welcome message bg */
  color: var(--secondary-color); /* Text color to match theme */
  border: 1px solid var(--secondary-color);
  padding: 0.75rem 1rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  margin-top: 1rem; /* Adjusted from 0.7rem */
  font-weight: 500;
}

.welcome-message i {
  font-size: 1.3rem;
  margin-right: 0.7rem;
}

.view-options {
  display: flex;
  gap: 1.5rem; /* Increased gap */
  margin-bottom: 1.25rem; /* Consistent margin */
}

.view-option {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.view-option .form-check-input {
  margin-right: 0.6rem; /* Space between radio and label */
  cursor: pointer;
}
.view-option .form-check-label {
  cursor: pointer;
  font-weight: 500;
  color: var(--text-color);
}
.view-option .form-check-label i {
  margin-right: 0.4rem;
  color: var(--secondary-color);
}


.selected-view-container {
  margin-top: 1rem; /* Adjusted */
  text-align: center;
}

.view-image {
  border-radius: 10px;
  box-shadow: var(--card-shadow);
  object-fit: cover; /* If you want to control aspect ratio better */
  max-height: 250px; /* Example max height for the view image */
}

/* Responsive Adjustments */
@media (max-width: 767.98px) { /* Bootstrap's sm breakpoint */
  .about-card,
  .welcome-card,
  .view-preference-card {
    padding: 1.5rem; /* Consistent padding */
  }

  .page-title {
      font-size: 2.25rem; /* Adjust for md screens */
  }
  .page-subtitle {
      font-size: 1.1rem;
  }

  .view-options {
    gap: 1rem; /* Slightly reduced gap */
    flex-direction: column;
    align-items: flex-start; /* Align items to the start in column view */
  }

  .section-title {
    font-size: 1.5rem; /* Adjust for consistency */
  }

  .section-text {
    font-size: 1rem; /* Adjust for consistency */
  }
}

@media (max-width: 575.98px) { /* Bootstrap's xs breakpoint */
    .page-title {
        font-size: 1.8rem; /* Smaller for xs screens */
    }
    .page-subtitle {
        font-size: 1rem;
    }
     .about-card,
    .welcome-card,
    .view-preference-card {
        padding: 1rem;
    }
    .section-title {
      font-size: 1.3rem;
    }
}
</style>
