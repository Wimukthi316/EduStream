<template>
  <div class="container py-4 courses-container">
    <!-- Success Message -->
    <div
      v-if="newsStore.showSuccessMessage"
      class="alert alert-success alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3"
      role="alert"
      style="z-index: 1050; max-width: 95%;"
    >
      {{ newsStore.successMessage }}
      <button
        type="button"
        class="btn-close"
        @click="newsStore.showSuccessMessage = false"
        aria-label="Close success message"
      ></button>
    </div>

    <!-- Search and Filter Section -->
    <div class="row mb-4 g-2 align-items-center">
      <div class="col-12 col-md-4">
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input
            type="text"
            class="form-control"
            placeholder="Search courses..."
            @input="handleSearch"
            :value="newsStore.searchQuery"
            aria-label="Search courses"
          >
        </div>
      </div>
      <div class="col-6 col-md-3">
        <select
          class="form-select"
          @change="handleCategoryChange"
          :value="newsStore.selectedCategory"
          aria-label="Filter by category"
          title="Filter by category"
        >
          <option value="">All Categories</option>
          <option
            v-for="category in newsStore.categories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </div>
      <div class="col-6 col-md-3">
        <select
          class="form-select"
          @change="handleDateChange"
          :value="newsStore.selectedDate"
          aria-label="Filter by date"
          title="Filter by date"
        >
          <option value="">All Dates</option>
          <option
            v-for="date in newsStore.dates"
            :key="date"
            :value="date"
          >
            {{ date }}
          </option>
        </select>
      </div>
      <div class="col-12 col-md-2 mt-2 mt-md-0">
        <button
          class="btn btn-primary w-100"
          @click="showAddNewsModal = true"
          v-if="authStore.isAuthenticated"
          aria-label="Add new course"
        >
          <i class="fas fa-plus me-1"></i>
          <span class="d-none d-md-inline">Add Course</span>
        </button>
      </div>
    </div>

    <!-- Courses Grid -->
    <div class="row g-3">
      <div
        v-for="item in newsStore.paginatedNews"
        :key="item.id"
        class="col-12 col-sm-6 col-lg-4 d-flex"
      >
        <div class="course-card h-100 d-flex flex-column">
          <img
            v-if="item.image"
            :src="item.image"
            class="course-image img-fluid"
            :alt="item.title"
            loading="lazy"
          >
          <div class="course-content flex-grow-1 d-flex flex-column">
            <h3 class="course-title">{{ item.title }}</h3>
            <p class="course-text flex-grow-1">{{ truncateContent(item.content, 120) }}</p>
            <div class="course-meta">
              <span class="author">
                <i class="fas fa-chalkboard-teacher" aria-hidden="true"></i>
                {{ item.author }}
              </span>
              <span class="date">
                <i class="fas fa-calendar" aria-hidden="true"></i>
                {{ formatDate(item.date) }}
              </span>
              <span class="category">
                <i class="fas fa-tag" aria-hidden="true"></i>
                {{ item.category }}
              </span>
            </div>
            <div class="course-actions mt-auto">
              <button
                class="btn btn-like"
                @click="handleLike(item.id)"
                :class="{ 'liked': newsStore.hasUserLiked(item.id, authStore.user?.id) }"
                :aria-pressed="newsStore.hasUserLiked(item.id, authStore.user?.id)"
                :title="newsStore.hasUserLiked(item.id, authStore.user?.id) ? 'Unlike' : 'Like'"
              >
                <i class="fas fa-heart" aria-hidden="true"></i>
                <span>{{ item.likes }}</span>
              </button>
              <div class="dropdown" v-if="authStore.isAuthenticated && authStore.user?.id === item.authorId">
                <button
                  class="btn btn-actions"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  aria-label="Open actions menu for this course"
                  title="More actions"
                >
                  <i class="fas fa-ellipsis-v" aria-hidden="true"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li>
                    <button
                      class="dropdown-item"
                      @click="openEditModal(item)"
                    >
                      <i class="fas fa-edit me-2" aria-hidden="true"></i>
                      Edit
                    </button>
                  </li>
                  <li>
                    <button
                      class="dropdown-item text-danger"
                      @click="handleDeleteNews(item.id)"
                    >
                      <i class="fas fa-trash me-2" aria-hidden="true"></i>
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!newsStore.isLoading && newsStore.filteredNews.length === 0" class="text-center py-5 empty-state">
      <i class="fas fa-graduation-cap fa-3x mb-3 text-muted" aria-hidden="true"></i>
      <h4 class="text-muted">No courses found</h4>
      <p class="text-muted">Try adjusting your search or filters.</p>
      <button
        class="btn btn-outline-primary mt-3"
        @click="resetFilters"
        v-if="newsStore.searchQuery || newsStore.selectedCategory || newsStore.selectedDate"
      >
        Reset All Filters
      </button>
    </div>

     <!-- Loading State (Optional) -->
    <div v-if="newsStore.isLoading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading courses...</span>
      </div>
      <p class="mt-2">Loading courses...</p>
    </div>


    <!-- Pagination -->
    <div class="pagination-container mt-4" v-if="!newsStore.isLoading && newsStore.totalPages > 1">
      <nav aria-label="Courses pagination">
        <ul class="pagination justify-content-center flex-wrap">
          <li
            class="page-item"
            :class="{ disabled: newsStore.currentPage === 1 }"
          >
            <button
              class="page-link"
              @click="handlePageChange(newsStore.currentPage - 1)"
              aria-label="Previous page"
            >
              «
            </button>
          </li>
          <li
            v-for="page in visiblePages"
            :key="page"
            class="page-item"
            :class="{
              active: newsStore.currentPage === page,
              disabled: page === '...'
            }"
          >
            <button
              class="page-link"
              @click="handlePageChange(page)"
              :disabled="page === '...'"
              :aria-current="newsStore.currentPage === page ? 'page' : undefined"
              :aria-label="page === '...' ? 'Gap in page numbers' : `Go to page ${page}`"
            >
              {{ page }}
            </button>
          </li>
          <li
            class="page-item"
            :class="{ disabled: newsStore.currentPage === newsStore.totalPages }"
          >
            <button
              class="page-link"
              @click="handlePageChange(newsStore.currentPage + 1)"
              aria-label="Next page"
            >
              »
            </button>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Add Course Modal -->
    <div v-if="showAddNewsModal" class="modal-overlay" @click.self="closeAddModal">
      <div class="modal-content-custom">
        <div class="modal-header">
          <h5 class="modal-title">Add New Course</h5>
          <button
            type="button"
            class="btn-close"
            @click="closeAddModal"
            aria-label="Close add course modal"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleAddNews">
            <div class="mb-3">
              <label for="newsTitle" class="form-label">Course Title</label>
              <input
                id="newsTitle"
                type="text"
                class="form-control"
                v-model="newNews.title"
                placeholder="Enter course title"
                required
              >
            </div>
            <div class="mb-3">
              <label for="newsContent" class="form-label">Description</label>
              <textarea
                id="newsContent"
                class="form-control"
                v-model="newNews.content"
                rows="4"
                placeholder="Enter course description"
                required
              ></textarea>
            </div>
            <div class="row g-2">
              <div class="col-md-6 mb-3">
                <label for="newsCategory" class="form-label">Category</label>
                <select
                  id="newsCategory"
                  class="form-select"
                  v-model="newNews.category"
                  required
                >
                  <option value="" disabled>Select a category</option>
                  <option
                    v-for="category in newsStore.categories"
                    :key="`add-${category}`"
                    :value="category"
                  >
                    {{ category }}
                  </option>
                </select>
              </div>
              <div class="col-md-6 mb-3">
                <label for="newsDate" class="form-label">Start Date</label>
                <input
                  id="newsDate"
                  type="date"
                  class="form-control"
                  v-model="newNews.date"
                  required
                >
              </div>
            </div>
            <div class="mb-3">
              <label for="newsImage" class="form-label">Course Image</label>
              <input
                id="newsImage"
                type="file"
                class="form-control"
                @change="handleImageUpload"
                accept="image/*"
              >
              <div v-if="newNews.image" class="mt-2">
                <img :src="newNews.image" class="preview-image" alt="Preview">
                <button type="button" class="btn btn-sm btn-danger mt-2" @click="removeImage">
                  Remove Image
                </button>
              </div>
            </div>
            <div class="d-flex justify-content-end gap-2">
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="closeAddModal"
              >
                Cancel
              </button>
              <button type="submit" class="btn btn-primary">
                Add Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Edit Course Modal -->
    <div v-if="showEditNewsModal" class="modal-overlay" @click.self="closeEditModal">
      <div class="modal-content-custom">
        <div class="modal-header">
          <h5 class="modal-title">Edit Course</h5>
          <button
            type="button"
            class="btn-close"
            @click="closeEditModal"
            aria-label="Close edit course modal"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleEditNews">
            <div class="mb-3">
              <label for="editTitle" class="form-label">Course Title</label>
              <input
                id="editTitle"
                type="text"
                class="form-control"
                v-model="editNews.title"
                required
              >
            </div>
            <div class="mb-3">
              <label for="editContent" class="form-label">Description</label>
              <textarea
                id="editContent"
                class="form-control"
                v-model="editNews.content"
                rows="4"
                required
              ></textarea>
            </div>
            <div class="row g-2">
              <div class="col-md-6 mb-3">
                <label for="editCategory" class="form-label">Category</label>
                <select
                  id="editCategory"
                  class="form-select"
                  v-model="editNews.category"
                  required
                >
                  <option value="" disabled>Select a category</option>
                  <option
                    v-for="category in newsStore.categories"
                    :key="`edit-${category}`"
                    :value="category"
                  >
                    {{ category }}
                  </option>
                </select>
              </div>
              <div class="col-md-6 mb-3">
                <label for="editDate" class="form-label">Start Date</label>
                <input
                  id="editDate"
                  type="date"
                  class="form-control"
                  v-model="editNews.date"
                  required
                >
              </div>
            </div>
            <div class="mb-3">
              <label for="editImage" class="form-label">Course Image</label>
              <input
                id="editImage"
                type="file"
                class="form-control"
                @change="handleEditImageUpload"
                accept="image/*"
              >
              <div v-if="editNews.image" class="mt-2">
                <img :src="editNews.image" class="preview-image" alt="Preview">
                <button type="button" class="btn btn-sm btn-danger mt-2" @click="removeEditImage">
                  Remove Image
                </button>
              </div>
            </div>
            <div class="d-flex justify-content-end gap-2">
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="closeEditModal"
              >
                Cancel
              </button>
              <button type="submit" class="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue' // Added onUnmounted
import { useNewsStore, type NewsItem, COURSE_CATEGORIES } from '../stores/news' // Adjust path if needed
import { useAuthStore } from '../stores/auth'   // Adjust path if needed

const newsStore = useNewsStore()
const authStore = useAuthStore()

const showAddNewsModal = ref(false)
const showEditNewsModal = ref(false)
const selectedNews = ref<NewsItem | null>(null)

interface NewsForm {
  title: string
  content: string
  category: string
  date: string
  image?: string
}

const newNews = ref<NewsForm>({
  title: '',
  content: '',
  category: '',
  date: new Date().toISOString().split('T')[0],
  image: undefined
})

const editNews = ref<NewsForm>({
  title: '',
  content: '',
  category: '',
  date: '',
  image: undefined
})

// Computed property for pagination with ellipsis
const visiblePages = computed(() => {
  const current = newsStore.currentPage
  const total = newsStore.totalPages
  const maxVisibleButtons = 5 // Includes first, last, current, and two surrounding/ellipsis
  const sideButtons = Math.floor((maxVisibleButtons - 3) / 2) // For current page and its direct neighbors

  if (total <= maxVisibleButtons + 2) { // Show all pages if total is small enough
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [1];

  if (current > sideButtons + 2) {
    pages.push('...');
  }

  let startPage = Math.max(2, current - sideButtons);
  let endPage = Math.min(total - 1, current + sideButtons);

  if (current <= sideButtons + 1) {
      endPage = Math.min(total - 1, maxVisibleButtons -1); // -1 for page 1, -1 for last page placeholder
  }
  if (current >= total - sideButtons) {
      startPage = Math.max(2, total - (maxVisibleButtons - 2)); // -1 for page 1, -1 for last page
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (current < total - sideButtons - 1) {
    pages.push('...');
  }

  pages.push(total);
  return pages;
})


const handleSearch = (event: Event) => {
  const target = event.target as HTMLInputElement
  newsStore.setSearchQuery(target.value)
}

const handleCategoryChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  newsStore.setCategory(target.value)
}

const handleDateChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  newsStore.setDate(target.value)
}

const handlePageChange = (page: number | string) => {
  if (typeof page !== 'number' || page < 1 || page > newsStore.totalPages) return
  newsStore.setPage(page as number) // Cast to number as we've checked
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const resetFilters = () => {
  newsStore.setSearchQuery('')
  newsStore.setCategory('')
  newsStore.setDate('')
  newsStore.setPage(1) // Reset to first page
}

const handleLike = (id: number) => {
  if (!authStore.user) {
    alert('Please login to like courses.') // Or use a more user-friendly notification
    return
  }
  newsStore.likeNews(id, authStore.user.id)
}

const handleAddNews = async () => {
  if (!authStore.isAuthenticated || !authStore.user) {
    alert('Please login to add courses.');
    return;
  }

  // Basic client-side validation
  if (!newNews.value.title.trim() || !newNews.value.content.trim() || !newNews.value.category || !newNews.value.date) {
    alert('Please fill in all required fields (Title, Description, Category, Start Date).');
    return;
  }

  try {
    await newsStore.addNews({
      ...newNews.value,
      author: authStore.user.name,
      authorId: authStore.user.id,
      likes: 0,
      likedBy: []
    });
    closeAddModal();
  } catch (error) {
    console.error("Error adding course:", error);
    alert("Failed to add course. Please try again.");
  }
}

const handleEditNews = async () => {
  if (!authStore.isAuthenticated || !authStore.user || !selectedNews.value) {
    alert('Authentication error or no course selected. Please try again.');
    return;
  }

  // Basic client-side validation
  if (!editNews.value.title.trim() || !editNews.value.content.trim() || !editNews.value.category || !editNews.value.date) {
    alert('Please fill in all required fields (Title, Description, Category, Start Date).');
    return;
  }

  try {
    const success = await newsStore.editNews(selectedNews.value.id, {
      ...editNews.value
    }, authStore.user.id);

    if (success) {
      closeEditModal();
    } else {
      alert('You can only edit your own courses or an error occurred!');
    }
  } catch (error) {
    console.error("Error editing course:", error);
    alert("Failed to edit course. Please try again.");
  }
}

const handleDeleteNews = async (id: number) => {
  if (!authStore.isAuthenticated || !authStore.user) {
    alert('Please login to delete courses.');
    return;
  }

  if (confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
    try {
      const success = await newsStore.deleteNews(id, authStore.user.id);
      if (!success) {
        alert('You can only delete your own courses or an error occurred!');
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete course. Please try again.");
    }
  }
}

const openEditModal = (news: NewsItem) => {
  if (!authStore.isAuthenticated || !authStore.user) {
    alert('Please login to edit courses.');
    return;
  }
  if (news.authorId !== authStore.user.id) {
    alert('You can only edit your own courses!');
    return;
  }

  selectedNews.value = news;
  editNews.value = {
    title: news.title,
    content: news.content,
    category: news.category,
    date: news.date,
    image: news.image
  };
  showEditNewsModal.value = true;
}

const truncateContent = (text: string, length: number) => {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '...' : text;
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A';
  try {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  } catch (e) {
    return dateString; // Fallback to original string if date is invalid
  }
}

const resetNewNewsForm = () => {
  newNews.value = {
    title: '',
    content: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    image: undefined
  };
}

const resetEditNewsForm = () => {
  editNews.value = {
    title: '',
    content: '',
    category: '',
    date: '',
    image: undefined
  };
  selectedNews.value = null;
}

const closeAddModal = () => {
  showAddNewsModal.value = false;
  resetNewNewsForm();
}

const closeEditModal = () => { // New function for Edit Modal
  showEditNewsModal.value = false;
  resetEditNewsForm();
}

const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      newNews.value.image = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const handleEditImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      editNews.value.image = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const removeImage = () => {
  newNews.value.image = undefined
}

const removeEditImage = () => {
  editNews.value.image = undefined
}

// Click outside listener
let clickOutsideHandler: ((event: MouseEvent) => void) | null = null;

onMounted(() => {
  // Fetch initial data if not already loaded by the store
  if (newsStore.news.length === 0) {
    newsStore.fetchNews(); // Assuming your store has a fetchNews method
  }

  clickOutsideHandler = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    // For Add News Modal - only if clicking directly on the overlay
    if (showAddNewsModal.value && target.classList.contains('modal-overlay')) {
      closeAddModal();
    }
  };
  document.addEventListener('click', clickOutsideHandler);
});

onUnmounted(() => {
  if (clickOutsideHandler) {
    document.removeEventListener('click', clickOutsideHandler);
  }
});
</script>

<style scoped>
/* Global CSS variables should be defined in :root, e.g., App.vue or main.css */
/* Using defaults here for resilience */

:root {
  --primary-color: #4b2e83; /* Educational purple */
  --secondary-color: #00a8e8; /* Bright blue */
  --accent-color: #ff7f  /* Educational purple */
  --secondary-color: #00a8e8; /* Bright blue */
  --accent-color: #ff7f50; /* Coral for highlights */
  --background-color: #f8f9fa;
  --text-color: #333333;
  --card-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  --card-shadow-hover: 0 10px 20px rgba(0, 0, 0, 0.12);
  --navbar-height: 70px; /* Assuming this is defined globally */
}

.courses-container {
  min-height: calc(100vh - var(--navbar-height, 70px));
  background-color: var(--background-color, #f8f9fa);
}

/* --- Search and Filter --- */
.search-box {
  position: relative;
}
.search-box i {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-color, #333333);
  opacity: 0.5;
  z-index: 1; /* Ensure icon is above input background */
}
.search-box input.form-control {
  padding-left: 2.75rem; /* Space for the icon */
}

.form-select, .form-control {
  border-radius: 8px;
  border: 1px solid #dee2e6; /* Standard Bootstrap border */
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  font-size: 0.95rem; /* Slightly smaller form controls */
}
.form-select:focus, .form-control:focus {
  border-color: var(--secondary-color, #00a8e8);
  box-shadow: 0 0 0 0.25rem rgba(0, 168, 232, 0.25);
}
.btn-primary {
  background: linear-gradient(135deg, var(--secondary-color, #00a8e8), var(--primary-color, #4b2e83));
  border: none;
  transition: opacity 0.2s, transform 0.2s;
}
.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}


/* --- Course Card --- */
.course-card {
  background: white;
  border-radius: 12px; /* Softer radius */
  overflow: hidden;
  box-shadow: var(--card-shadow, 0 4px 12px rgba(0, 0, 0, 0.08));
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #e9ecef; /* Subtle border */
}
.course-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--card-shadow-hover, 0 10px 20px rgba(0, 0, 0, 0.12));
}

.course-image {
  width: 100%;
  height: 200px; /* Increased height */
  object-fit: cover;
}

.course-content {
  padding: 1.25rem;
}

.course-title {
  font-size: 1.2rem; /* Slightly larger title */
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--text-color, #333333);
  line-height: 1.4;
  /* For text overflow */
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limit to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: calc(1.2rem * 1.4 * 2); /* Reserve space for 2 lines */
}

.course-text {
  color: #555; /* Slightly darker text */
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.9rem;
  line-height: 1.6; /* Improved line height */
  min-height: calc(0.9rem * 1.6 * 3); /* Reserve space for 3 lines */
}

.course-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem; /* Adjusted gap */
  font-size: 0.8rem;
  color: #6c757d; /* Bootstrap muted color */
  margin-bottom: 1rem;
  padding-top: 0.5rem;
  border-top: 1px solid #f1f1f1; /* Subtle separator */
}
.course-meta span {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}
.course-meta i {
  opacity: 0.7;
}

.course-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.75rem;
  /* border-top: 1px solid #e9ecef; Removed, meta has top border now */
}

.btn-like {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  border: 1px solid #ced4da;
  background: transparent; /* Cleaner look */
  color: #495057;
  transition: all 0.2s ease;
  font-size: 0.85rem;
}
.btn-like:hover, .btn-like.liked:hover {
  background: var(--accent-color, #ff7f50);
  color: white;
  border-color: var(--accent-color, #ff7f50);
  transform: scale(1.05);
}
.btn-like.liked {
  background: var(--accent-color, #ff7f50);
  color: white;
  border-color: var(--accent-color, #ff7f50);
}
.btn-like i { transition: transform 0.2s; }
.btn-like:hover i, .btn-like.liked i { transform: scale(1.1); }


.btn-actions {
  padding: 0.4rem;
  border-radius: 50%;
  border: 1px solid transparent; /* Transparent border initially */
  background: transparent;
  color: #6c757d;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}
.btn-actions:hover, .btn-actions:focus {
  background: rgba(0, 0, 0, 0.05);
  border-color: #dee2e6;
}
.dropdown-menu {
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef; /* Subtle border for dropdown */
  padding: 0.25rem 0;
}
.dropdown-item {
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.6rem; /* Increased gap */
}
.dropdown-item:active { /* Bootstrap active style */
  background-color: var(--secondary-color, #00a8e8);
  color: white;
}
.dropdown-item i { opacity: 0.8; }


/* --- Modals --- */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1040;
  padding: 1rem;
}

.modal-content-custom {
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  animation: modalFadeIn 0.3s ease-out;
  position: relative;
}

.modal-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary-color, #4b2e83);
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex-grow: 1;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  opacity: 0.6;
  cursor: pointer;
  transition: opacity 0.2s;
  padding: 0.5rem;
}

.btn-close:hover {
  opacity: 1;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Form styles */
.form-label {
  font-weight: 500;
  color: var(--text-color, #333333);
  margin-bottom: 0.5rem;
}

.form-control:focus,
.form-select:focus {
  border-color: var(--secondary-color, #00a8e8);
  box-shadow: 0 0 0 0.25rem rgba(0, 168, 232, 0.25);
}

/* Responsive adjustments for modals */
@media (max-width: 767.98px) {
  .modal-content-custom {
    max-width: 95vw;
  }
  
  .modal-header,
  .modal-body {
    padding: 1rem;
  }
  
  .modal-title {
    font-size: 1.1rem;
  }
}

/* --- Pagination --- */
.pagination-container { margin-top: 2.5rem; }
.page-link {
  color: var(--text-color, #333333);
  background-color: white;
  border: 1px solid #dee2e6;
  padding: 0.5rem 0.85rem;
  margin: 0 0.15rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  min-width: 38px;
  text-align: center;
  font-size: 0.9rem;
}
.page-link:hover {
  background-color: #e9ecef; /* Lighter hover */
  color: var(--primary-color, #4b2e83);
  border-color: #adb5bd;
}
.page-item.active .page-link {
  background: linear-gradient(135deg, var(--secondary-color, #00a8e8), var(--primary-color, #4b2e83));
  color: white;
  border-color: var(--primary-color, #4b2e83);
  box-shadow: 0 2px 5px rgba(75, 46, 131, 0.2);
}
.page-item.disabled .page-link {
  opacity: 0.6;
  pointer-events: none;
  background-color: #f8f9fa;
}

/* --- Empty State & Loading --- */
.empty-state { /* Renamed from .text-center.py-5 */
  background: #f8f9fa; /* Light background for emphasis */
  border-radius: 10px;
  padding: 3rem 1rem; /* More padding */
}
.empty-state i { opacity: 0.4; }
.empty-state .btn-outline-primary {
  border-color: var(--secondary-color, #00a8e8);
  color: var(--secondary-color, #00a8e8);
}
.empty-state .btn-outline-primary:hover {
  background-color: var(--secondary-color, #00a8e8);
  color: white;
}
.spinner-border {
  width: 3rem;
  height: 3rem;
  border-width: .3em;
}


/* Responsive adjustments */
@media (max-width: 767.98px) { /* md */
  .course-image { height: 180px; }
  .course-title { font-size: 1.1rem; min-height: calc(1.1rem * 1.4 * 2); }
  .course-text { font-size: 0.85rem; -webkit-line-clamp: 3; min-height: calc(0.85rem * 1.6 * 3); }
  .course-meta { font-size: 0.75rem; gap: 0.4rem 0.8rem; }
  .modal-content-custom, .custom-modal-dialog { max-width: 90vw; }
}

@media (max-width: 575.98px) { /* sm */
  .course-card { border-radius: 10px; }
  .course-image { height: 160px; }
  .course-content { padding: 1rem; }
  .course-title { font-size: 1rem; min-height: calc(1rem * 1.4 * 2); }
  .course-text { min-height: calc(0.85rem * 1.6 * 2); -webkit-line-clamp: 2; } /* Reduce lines on very small screens */
  .course-meta { flex-direction: column; align-items: flex-start; gap: 0.3rem; }
  .pagination .page-item { margin: 0 0.1rem; }
  .page-link { padding: 0.4rem 0.6rem; min-width: 32px; font-size: 0.85rem; }
  .search-box input.form-control, .form-select { font-size: 0.9rem; }
  .modal-header, .modal-body { padding: 1rem; }
  .modal-title { font-size: 1.1rem; }
}

/* Accessibility improvements */
:focus-visible { /* More specific to avoid overriding Bootstrap if present */
  outline: 2px solid var(--secondary-color, #00a8e8) !important;
  outline-offset: 2px !important;
  box-shadow: none !important; /* Remove default browser focus shadow if custom outline is there */
}

.preview-image {
  max-width: 200px;
  max-height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-top: 8px;
}
</style>
