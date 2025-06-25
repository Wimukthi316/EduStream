<template>
  <div class="home-page-wrapper">
    <!-- Hero Section with 3D elements and particles -->
    <div class="hero-section">
      <div class="particles-container">
        <div v-for="i in 20" :key="i" class="particle"></div>
      </div>
      <div class="container position-relative">
        <div class="row align-items-center min-vh-80">
          <div class="col-lg-6 hero-content" data-aos="fade-right">
            <div class="badge-container mb-4">
              <span class="badge">New courses available</span>
            </div>
            <h1 class="hero-title">Elevate Your Skills with <span class="gradient-text">EduStream</span></h1>
            <p class="hero-subtitle">
              Discover interactive learning experiences crafted by industry experts to help you master new skills and advance your career.
            </p>
            <div class="stats-container">
              <div class="stat-item">
                <span class="stat-number">500+</span>
                <span class="stat-label">Courses</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-number">50k+</span>
                <span class="stat-label">Students</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-number">4.8</span>
                <span class="stat-label">Rating</span>
              </div>
            </div>
          </div>
          <div class="col-lg-6 hero-image-container" data-aos="fade-left" data-aos-delay="200">
            <div class="hero-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&auto=format&fit=crop&q=60" 
                alt="Student learning online" 
                class="hero-image"
              />
              <div class="floating-card card-1">
                <i class="fas fa-graduation-cap"></i>
                <span>Learn at your pace</span>
              </div>
              <div class="floating-card card-2">
                <i class="fas fa-certificate"></i>
                <span>Get certified</span>
              </div>
              <div class="shape shape-1"></div>
              <div class="shape shape-2"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ffffff" fill-opacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>

    <!-- Featured Categories Section -->
    <div id="featured" class="featured-section py-5">
      <div class="container">
        <div class="section-header text-center mb-5" data-aos="fade-up">
          <span class="section-subtitle">Explore by category</span>
          <h2 class="section-title">Find Your Perfect Learning Path</h2>
          <p class="section-description">
            Browse our most popular categories and find the perfect course to enhance your skills
          </p>
        </div>

        <div class="category-cards" data-aos="fade-up" data-aos-delay="100">
          <div class="category-card" @mouseenter="hoverCard = 1" @mouseleave="hoverCard = null" :class="{ 'is-hovered': hoverCard === 1 }">
            <div class="category-icon">
              <i class="fas fa-code"></i>
            </div>
            <h3 class="category-title">Programming</h3>
            <p class="category-description">Learn web development, mobile apps, and software engineering</p>
           
          </div>

          <div class="category-card" @mouseenter="hoverCard = 2" @mouseleave="hoverCard = null" :class="{ 'is-hovered': hoverCard === 2 }">
            <div class="category-icon">
              <i class="fas fa-chart-line"></i>
            </div>
            <h3 class="category-title">Data Science</h3>
            <p class="category-description">Master data analysis, machine learning, and visualization</p>
           
          </div>

          <div class="category-card" @mouseenter="hoverCard = 3" @mouseleave="hoverCard = null" :class="{ 'is-hovered': hoverCard === 3 }">
            <div class="category-icon">
              <i class="fas fa-paint-brush"></i>
            </div>
            <h3 class="category-title">Design</h3>
            <p class="category-description">Create stunning UI/UX, graphics, and digital art</p>
           
          </div>

          <div class="category-card" @mouseenter="hoverCard = 4" @mouseleave="hoverCard = null" :class="{ 'is-hovered': hoverCard === 4 }">
            <div class="category-icon">
              <i class="fas fa-bullhorn"></i>
            </div>
            <h3 class="category-title">Marketing</h3>
            <p class="category-description">Develop digital marketing, SEO, and social media skills</p>
           
          </div>
        </div>
      </div>
    </div>

        <!-- Testimonials Section -->
    <div class="testimonials-section py-5">
      <div class="container">
        <div class="section-header text-center mb-5" data-aos="fade-up">
          <span class="section-subtitle">Testimonials</span>
          <h2 class="section-title">What Our Students Say</h2>
          <p class="section-description">
            Hear from our community of learners about their experience with EduStream
          </p>
        </div>

        <div class="testimonials-container" data-aos="fade-up" data-aos-delay="100">
          <div class="testimonial-card">
            <div class="testimonial-rating">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </div>
            <p class="testimonial-text">
              "EduStream completely transformed my career. The courses are well-structured, and the instructors are incredibly knowledgeable. I went from knowing nothing about web development to landing a job as a frontend developer in just 6 months!"
            </p>
            <div class="testimonial-author">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60" 
                alt="Sarah Johnson" 
                class="testimonial-avatar"
              />
              <div class="testimonial-info">
                <h4 class="testimonial-name">Sarah Johnson</h4>
                <p class="testimonial-position">Frontend Developer at TechCorp</p>
              </div>
            </div>
          </div>

          <div class="testimonial-card">
            <div class="testimonial-rating">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </div>
            <p class="testimonial-text">
              "The Data Science course exceeded my expectations. The practical projects and real-world datasets made learning complex concepts much easier. The support from instructors and the community is outstanding. Highly recommended!"
            </p>
            <div class="testimonial-author">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60" 
                alt="David Chen" 
                class="testimonial-avatar"
              />
              <div class="testimonial-info">
                <h4 class="testimonial-name">David Chen</h4>
                <p class="testimonial-position">Data Analyst at FinTech Solutions</p>
              </div>
            </div>
          </div>

          <div class="testimonial-card">
            <div class="testimonial-rating">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star-half-alt"></i>
            </div>
            <p class="testimonial-text">
              "As a busy professional, I needed a flexible learning platform that would allow me to upskill at my own pace. EduStream delivered exactly that. The mobile app is fantastic, and I can learn during my commute or whenever I have free time."
            </p>
            <div class="testimonial-author">
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop&q=60" 
                alt="Michelle Rodriguez" 
                class="testimonial-avatar"
              />
              <div class="testimonial-info">
                <h4 class="testimonial-name">Michelle Rodriguez</h4>
                <p class="testimonial-position">Marketing Manager at Global Brands</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="cta-section py-5">
      <div class="container">
        <div class="cta-container" data-aos="zoom-in">
          <div class="cta-content">
            <h2 class="cta-title">Ready to Start Your Learning Journey?</h2>
            <p class="cta-description">
              Join thousands of students already learning on EduStream. Get started today with a free trial.
            </p>
            <div class="cta-buttons">
              <router-link to="/register" class="btn btn-lg btn-primary">
                Explore Courses
                <i class="fas fa-arrow-right ms-2"></i>
              </router-link>
            </div>
          </div>
          <div class="cta-image-container">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60" 
              alt="Students learning" 
              class="cta-image"
            />
            <div class="cta-shape shape-1"></div>
            <div class="cta-shape shape-2"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// State for interactive elements
const hoverCard = ref<number | null>(null);

// AOS (Animate on Scroll) initialization
onMounted(() => {
  // If you're using AOS library, initialize it here
  // AOS.init({
  //   duration: 800,
  //   easing: 'ease-in-out',
  //   once: true
  // });

  // Initialize particles animation
  initParticles();
});

// Function to animate particles
const initParticles = () => {
  const particles = document.querySelectorAll('.particle');
  particles.forEach((particle: Element) => {
    const p = particle as HTMLElement;
    // Random position
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${Math.random() * 100}%`;
    
    // Random size
    const size = Math.random() * 20 + 5;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    
    // Random animation duration
    p.style.animationDuration = `${Math.random() * 10 + 5}s`;
    
    // Random delay
    p.style.animationDelay = `${Math.random() * 5}s`;
  });
};
</script>

<style scoped>
/* Base Styles */
:root {
  --primary-color: #4b2e83;
  --primary-light: rgba(75, 46, 131, 0.1);
  --secondary-color: #00a8e8;
  --accent-color: #ff7f50;
  --text-color: #333333;
  --text-light: #6c757d;
  --background-color: #f8f9fa;
  --white: #ffffff;
  --card-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  --card-shadow-hover: 0 15px 35px rgba(0, 0, 0, 0.12);
  --gradient-primary: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  --gradient-accent: linear-gradient(135deg, var(--secondary-color), var(--accent-color));
  --border-radius-sm: 8px;
  --border-radius-md: 12px;
  --border-radius-lg: 20px;
  --border-radius-xl: 30px;
  --transition: all 0.3s ease;
}

.home-page-wrapper {
  background-color: var(--background-color);
  overflow-x: hidden;
  position: relative;
}

/* Typography */
.gradient-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.section-subtitle {
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--secondary-color);
  display: block;
  margin-bottom: 1rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text-color);
}

.section-description {
  font-size: 1.1rem;
  color: var(--text-light);
  max-width: 700px;
  margin: 0 auto;
}

/* Buttons */
.btn {
  border-radius: var(--border-radius-xl);
  padding: 0.75rem 1.75rem;
  font-weight: 600;
  transition: var(--transition);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-primary {
  background: white;
  border: none;
  color: black;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.btn-primary:hover {
  /* Remove transform and shadow effects */
  transform: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.btn-outline {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--text-color);
}

.btn-outline:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
}

.btn-outline-primary {
  background: transparent;
  border: 2px solid var(--secondary-color);
  color: var(--secondary-color);
}

.btn-outline-primary:hover {
  background: var(--secondary-color);
  color: var(--white);
  transform: translateY(-3px);
}

/* Hero Section */
.hero-section {
  position: relative;
  background: linear-gradient(135deg, #4b2e83 0%, #00a8e8 100%);
  padding: 6rem 0 8rem;
  overflow: hidden;
}

.min-vh-80 {
  min-height: 80vh;
}

.hero-content {
  position: relative;
  z-index: 2;
}

.badge-container {
  margin-bottom: 1.5rem;
}

.badge {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: var(--border-radius-xl);
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: white;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: white;
  margin-bottom: 2rem;
  line-height: 1.6;
  opacity: 0.9;
}

.hero-cta-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.hero-cta {
  padding: 1rem 2rem;
}

.stats-container {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.stat-divider {
  width: 1px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.2);
}

.hero-image-container {
  position: relative;
}

.hero-image-wrapper {
  position: relative;
  z-index: 2;
}

.hero-image {
  width: 100%;
  height: auto;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--card-shadow);
  transition: var(--transition);
}

.floating-card {
  position: absolute;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius-md);
  padding: 1rem;
  box-shadow: var(--card-shadow);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  z-index: 3;
}

.floating-card i {
  font-size: 1.5rem;
  color: var(--secondary-color);
}

.floating-card span {
  font-weight: 600;
  color: var(--primary-color);
}

.card-1 {
  top: 10%;
  left: -5%;
  animation: float 6s ease-in-out infinite;
}

.card-2 {
  bottom: 15%;
  right: -5%;
  animation: float 6s ease-in-out infinite 2s;
}

.shape {
  position: absolute;
  border-radius: 50%;
  z-index: 1;
}

.shape-1 {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, rgba(75, 46, 131, 0.2), rgba(0, 168, 232, 0.2));
  top: -50px;
  right: -50px;
  animation: rotate 20s linear infinite;
}

.shape-2 {
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, rgba(255, 127, 80, 0.2), rgba(0, 168, 232, 0.2));
  bottom: -30px;
  left: 10%;
  animation: rotate 15s linear infinite reverse;
}

.hero-wave {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  line-height: 0;
}

.particles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.particle {
  position: absolute;
  background: linear-gradient(135deg, rgba(75, 46, 131, 0.2), rgba(0, 168, 232, 0.2));
  border-radius: 50%;
  animation: float 10s ease-in-out infinite;
}

/* Featured Categories Section */
.featured-section {
  padding: 5rem 0;
}

.category-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
}

.category-card {
  background: var(--white);
  border-radius: var(--border-radius-md);
  padding: 2rem;
  box-shadow: var(--card-shadow);
  transition: var(--transition);
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.category-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--gradient-primary);
  opacity: 0;
  z-index: -1;
  transition: var(--transition);
}

.category-card:hover, .category-card.is-hovered {
  transform: translateY(-10px);
  box-shadow: var(--card-shadow-hover);
}

.category-card:hover::before, .category-card.is-hovered::before {
  opacity: 0.05;
}

.category-icon {
  width: 60px;
  height: 60px;
  background: var(--primary-light);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: var(--transition);
}

.category-card:hover .category-icon, .category-card.is-hovered .category-icon {
  background: var(--secondary-color);
}

.category-icon i {
  font-size: 1.5rem;
  color: var(--primary-color);
  transition: var(--transition);
}

.category-card:hover .category-icon i, .category-card.is-hovered .category-icon i {
  color: var(--white);
}

.category-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.category-description {
  font-size: 0.95rem;
  color: var(--text-light);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.category-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--secondary-color);
  font-weight: 600;
  text-decoration: none;
  transition: var(--transition);
}

.category-link:hover {
  color: var(--primary-color);
}

.category-link i {
  transition: var(--transition);
}

.category-card:hover .category-link i, .category-card.is-hovered .category-link i {
  transform: translateX(5px);
}

/* How It Works Section */
.how-it-works-section {
  padding: 5rem 0;
  background-color: var(--white);
}

.steps-container {
  margin-top: 3rem;
}

.step-item {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.step-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--primary-color);
  opacity: 0.2;
  line-height: 1;
}

.step-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--text-color);
}

.step-description {
  font-size: 0.95rem;
  color: var(--text-light);
  line-height: 1.6;
}

.video-container {
  position: relative;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--card-shadow);
}

.video-thumbnail {
  width: 100%;
  height: auto;
  display: block;
  transition: var(--transition);
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: var(--transition);
}

.play-button i {
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-left: 5px;
}

.play-button:hover {
  transform: translate(-50%, -50%) scale(1.1);
  background: var(--white);
}

.video-card {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius-md);
  padding: 1rem;
  display: flex;
  gap: 1.5rem;
  box-shadow: var(--card-shadow);
}

.video-stat {
  display: flex;
  flex-direction: column;
}

.video-number {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-color);
}

.video-label {
  font-size: 0.8rem;
  color: var(--text-light);
}

/* Popular Courses Section */
.popular-courses-section {
  padding: 5rem 0;
  background-color: var(--background-color);
}

.courses-slider {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
}

.course-card {
  background: var(--white);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: var(--card-shadow);
  transition: var(--transition);
}

.course-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--card-shadow-hover);
}

.course-image-container {
  position: relative;
}

.course-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.course-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: var(--accent-color);
  color: var(--white);
  padding: 0.25rem 0.75rem;
  border-radius: var(--border-radius-xl);
  font-size: 0.8rem;
  font-weight: 600;
}

.course-content {
  padding: 1.5rem;
}

.course-category {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.course-category i {
  color: var(--secondary-color);
}

.course-category span {
  font-size: 0.9rem;
  color: var(--text-light);
}

.course-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-color);
  line-height: 1.4;
  min-height: 3rem;
}

.course-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.course-rating, .course-students {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-light);
}

.course-rating i {
  color: #ffc107;
}

.course-details {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.course-detail {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-light);
}

.course-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.course-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-color);
}

/* Testimonials Section */
.testimonials-section {
  padding: 5rem 0;
  background-color: var(--white);
}

.testimonials-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
}

.testimonial-card {
  background: var(--white);
  border-radius: var(--border-radius-md);
  padding: 2rem;
  box-shadow: var(--card-shadow);
  transition: var(--transition);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.testimonial-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--card-shadow-hover);
}

.testimonial-rating {
  margin-bottom: 1.5rem;
}

.testimonial-rating i {
  color: #ffc107;
  margin-right: 0.25rem;
}

.testimonial-text {
  font-size: 1rem;
  color: var(--text-color);
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.testimonial-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.testimonial-name {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: var(--text-color);
}

.testimonial-position {
  font-size: 0.85rem;
  color: var(--text-light);
  margin: 0;
}

/* CTA Section */
.cta-section {
  padding: 5rem 0;
  background-color: var(--background-color);
}

.cta-container {
  background: var(--white);
  border-radius: var(--border-radius-lg);
  padding: 3rem;
  box-shadow: var(--card-shadow);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  position: relative;
  overflow: hidden;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text-color);
}

.cta-description {
  font-size: 1.1rem;
  color: var(--text-light);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.cta-image-container {
  position: relative;
}

.cta-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--border-radius-md);
}

.cta-shape {
  position: absolute;
  border-radius: 50%;
  z-index: 1;
}

.cta-shape.shape-1 {
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, rgba(75, 46, 131, 0.1), rgba(0, 168, 232, 0.1));
  top: -50px;
  right: -50px;
  animation: rotate 20s linear infinite;
}

.cta-shape.shape-2 {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, rgba(255, 127, 80, 0.1), rgba(0, 168, 232, 0.1));
  bottom: -30px;
  left: -30px;
  animation: rotate 15s linear infinite reverse;
}

/* Animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Responsive Adjustments */
@media (max-width: 1199.98px) {
  .hero-title {
    font-size: 3rem;
  }
  
  .section-title {
    font-size: 2.25rem;
  }
  
  .cta-container {
    padding: 2.5rem;
  }
}

@media (max-width: 991.98px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .cta-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .cta-title {
    font-size: 2rem;
  }
}

@media (max-width: 767.98px) {
  .hero-section {
    padding: 4rem 0 6rem;
  }
  
  .hero-title {
    font-size: 2.25rem;
  }
  
  .hero-cta-group {
    flex-direction: column;
    width: 100%;
  }
  
  .hero-cta-group .btn {
    width: 100%;
  }
  
  .stats-container {
    flex-wrap: wrap;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .step-item {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .step-number {
    font-size: 2rem;
  }
  
  .cta-container {
    padding: 2rem;
  }
  
  .cta-title {
    font-size: 1.75rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    width: 100%;
  }
  
  .cta-buttons .btn {
    width: 100%;
  }
}

@media (max-width: 575.98px) {
  .hero-section {
    padding: 3rem 0 5rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .section-subtitle {
    font-size: 0.9rem;
  }
  
  .category-cards, .courses-slider, .testimonials-container {
    grid-template-columns: 1fr;
  }
  
  .cta-container {
    padding: 1.5rem;
  }
  
  .cta-title {
    font-size: 1.5rem;
  }
}
</style>
