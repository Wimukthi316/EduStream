import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface NewsItem {
  id: number
  title: string
  content: string
  author: string
  authorId: number
  date: string
  category: string
  likes: number
  likedBy: number[] // Array of user IDs who liked this post
  imageUrl?: string // For existing dummy images
  image?: string // For new local images
}

// Local storage key
const STORAGE_KEY = 'news_items'

// Predefined course categories
export const COURSE_CATEGORIES = [
  'Web Development',
  'Mobile Development',
  'Data Science',
  'Machine Learning',
  'Artificial Intelligence',
  'Cloud Computing',
  'DevOps',
  'Cybersecurity',
  'Database Management',
  'Programming Languages',
  'Software Engineering',
  'UI/UX Design',
  'Game Development',
  'Blockchain',
  'Digital Marketing',
  'Business Analytics',
  'Project Management',
  'IT & Networking',
  'Computer Science',
  'Mathematics'
] as const

// Helper functions for local storage
const getStoredNews = (): NewsItem[] => {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

const saveToStorage = (news: NewsItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(news))
}

// Mock data for demonstration
const mockNews: NewsItem[] = [
  {
    id: 1,
    title: 'Breaking: Major Tech Innovation',
    content: 'A revolutionary breakthrough in quantum computing has been achieved, promising unprecedented computational power.',
    author: 'John Doe',
    authorId: 1,
    date: '2024-03-15',
    category: 'Technology',
    likes: 42,
    likedBy: [],
    imageUrl: 'https://picsum.photos/800/400'
  },
  {
    id: 2,
    title: 'Global Climate Summit Results',
    content: 'World leaders have agreed on new climate action targets to combat global warming.',
    author: 'Jane Smith',
    authorId: 2,
    date: '2024-03-14',
    category: 'Environment',
    likes: 35,
    likedBy: [],
    imageUrl: 'https://picsum.photos/800/401'
  },
  {
    id: 3,
    title: 'Economic Recovery Plan Announced',
    content: 'Government unveils comprehensive economic recovery plan to boost post-pandemic growth.',
    author: 'Mike Johnson',
    authorId: 3,
    date: '2024-03-13',
    category: 'Business',
    likes: 28,
    likedBy: [],
    imageUrl: 'https://picsum.photos/800/402'
  },
  {
    id: 4,
    title: 'New Medical Breakthrough',
    content: 'Scientists discover promising new treatment for rare genetic disorders.',
    author: 'Sarah Williams',
    authorId: 4,
    date: '2024-03-12',
    category: 'Health',
    likes: 56,
    likedBy: [],
    imageUrl: 'https://picsum.photos/800/403'
  },
  {
    id: 5,
    title: 'Sports Championship Results',
    content: 'Underdog team makes historic victory in championship finals.',
    author: 'Tom Brown',
    authorId: 5,
    date: '2024-03-11',
    category: 'Sports',
    likes: 89,
    likedBy: [],
    imageUrl: 'https://picsum.photos/800/404'
  },
  {
    id: 6,
    title: 'Education System Reform',
    content: 'Major changes announced for national education curriculum.',
    author: 'Lisa Chen',
    authorId: 6,
    date: '2024-03-10',
    category: 'Education',
    likes: 31,
    likedBy: [],
    imageUrl: 'https://picsum.photos/800/405'
  },
  {
    id: 7,
    title: 'Entertainment Industry News',
    content: 'Award-winning director announces new blockbuster project.',
    author: 'David Miller',
    authorId: 7,
    date: '2024-03-09',
    category: 'Entertainment',
    likes: 47,
    likedBy: [],
    imageUrl: 'https://picsum.photos/800/406'
  },
  {
    id: 8,
    title: 'Space Exploration Milestone',
    content: 'NASA successfully launches new Mars mission.',
    author: 'Emma Wilson',
    authorId: 8,
    date: '2024-03-08',
    category: 'Science',
    likes: 63,
    likedBy: [],
    imageUrl: 'https://picsum.photos/800/407'
  },
  {
    id: 9,
    title: 'Political Summit Update',
    content: 'International leaders meet to discuss global security concerns.',
    author: 'Robert Taylor',
    authorId: 9,
    date: '2024-03-07',
    category: 'Politics',
    likes: 39,
    likedBy: [],
    imageUrl: 'https://picsum.photos/800/408'
  },
  {
    id: 10,
    title: 'Cultural Festival Success',
    content: 'Annual cultural festival draws record attendance.',
    author: 'Maria Garcia',
    authorId: 10,
    date: '2024-03-06',
    category: 'Culture',
    likes: 52,
    likedBy: [],
    imageUrl: 'https://picsum.photos/800/409'
  },
  {
    id: 11,
    title: 'Technology Trends 2024',
    content: 'Experts predict major technology trends for the coming year.',
    author: 'Alex Thompson',
    authorId: 11,
    date: '2024-03-05',
    category: 'Technology',
    likes: 45,
    likedBy: [],
    imageUrl: 'https://picsum.photos/800/410'
  },
  {
    id: 12,
    title: 'Environmental Conservation',
    content: 'New wildlife sanctuary established to protect endangered species.',
    author: 'Rachel Green',
    authorId: 12,
    date: '2024-03-04',
    category: 'Environment',
    likes: 67,
    likedBy: [],
    imageUrl: 'https://picsum.photos/800/411'
  }
]

export const useNewsStore = defineStore('news', () => {
  const news = ref<NewsItem[]>(getStoredNews())
  const searchQuery = ref('')
  const selectedCategory = ref('')
  const selectedDate = ref('')
  const currentPage = ref(1)
  const itemsPerPage = ref(6)
  const isLoading = ref(false)
  const showSuccessMessage = ref(false)
  const successMessage = ref('')

  const categories = computed(() => {
    // Return predefined categories instead of extracting from news
    return COURSE_CATEGORIES
  })

  const dates = computed(() => {
    const dates = new Set(news.value.map(item => item.date))
    return Array.from(dates).sort().reverse()
  })

  const filteredNews = computed(() => {
    return news.value.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          item.content.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesCategory = !selectedCategory.value || item.category === selectedCategory.value
      const matchesDate = !selectedDate.value || item.date === selectedDate.value
      return matchesSearch && matchesCategory && matchesDate
    })
  })

  const totalPages = computed(() => {
    return Math.ceil(filteredNews.value.length / itemsPerPage.value)
  })

  const paginatedNews = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredNews.value.slice(start, end)
  })

  function setSearchQuery(query: string) {
    searchQuery.value = query
    currentPage.value = 1
  }

  function setCategory(category: string) {
    selectedCategory.value = category
    currentPage.value = 1
  }

  function setDate(date: string) {
    selectedDate.value = date
    currentPage.value = 1
  }

  function setPage(page: number) {
    currentPage.value = page
  }

  function hasUserLiked(newsId: number, userId: number | undefined): boolean {
    if (!userId) return false
    const newsItem = news.value.find(item => item.id === newsId)
    return newsItem ? newsItem.likedBy.includes(userId) : false
  }

  async function fetchNews() {
    isLoading.value = true
    try {
      // Load from local storage
      news.value = getStoredNews()
      isLoading.value = false
    } catch (error) {
      console.error('Error fetching news:', error)
      isLoading.value = false
      throw error
    }
  }

  async function addNews(newsItem: Omit<NewsItem, 'id'>) {
    try {
      // Validate category
      if (!COURSE_CATEGORIES.includes(newsItem.category as any)) {
        throw new Error('Invalid course category')
      }

      // Generate new ID (max existing ID + 1)
      const newId = news.value.length > 0 
        ? Math.max(...news.value.map(item => item.id)) + 1 
        : 1

      const newNewsItem: NewsItem = {
        ...newsItem,
        id: newId,
        likes: 0,
        likedBy: []
      }

      news.value.push(newNewsItem)
      saveToStorage(news.value)
      showSuccess('Course added successfully!')
      return newNewsItem
    } catch (error) {
      console.error('Error adding news:', error)
      throw error
    }
  }

  async function editNews(id: number, updatedNews: Partial<NewsItem>, userId: number) {
    try {
      const index = news.value.findIndex(item => item.id === id)
      if (index === -1) {
        throw new Error('Course not found')
      }

      const newsItem = news.value[index]
      if (newsItem.authorId !== userId) {
        throw new Error('You are not authorized to edit this course')
      }

      // Validate category if it's being updated
      if (updatedNews.category && !COURSE_CATEGORIES.includes(updatedNews.category as any)) {
        throw new Error('Invalid course category')
      }

      news.value[index] = {
        ...newsItem,
        ...updatedNews
      }
      saveToStorage(news.value)
      showSuccess('Course updated successfully!')
      return news.value[index]
    } catch (error) {
      console.error('Error editing news:', error)
      throw error
    }
  }

  async function deleteNews(id: number, userId: number) {
    try {
      const index = news.value.findIndex(item => item.id === id)
      if (index === -1) {
        throw new Error('Course not found')
      }

      const newsItem = news.value[index]
      if (newsItem.authorId !== userId) {
        throw new Error('You are not authorized to delete this course')
      }

      news.value = news.value.filter(item => item.id !== id)
      saveToStorage(news.value)
      showSuccess('Course deleted successfully!')
    } catch (error) {
      console.error('Error deleting news:', error)
      throw error
    }
  }

  function likeNews(newsId: number, userId: number) {
    try {
      const index = news.value.findIndex(item => item.id === newsId)
      if (index === -1) {
        throw new Error('Course not found')
      }

      const newsItem = news.value[index]
      const hasLiked = newsItem.likedBy.includes(userId)

      if (hasLiked) {
        newsItem.likes--
        newsItem.likedBy = newsItem.likedBy.filter(id => id !== userId)
      } else {
        newsItem.likes++
        newsItem.likedBy.push(userId)
      }

      saveToStorage(news.value)
    } catch (error) {
      console.error('Error liking news:', error)
      throw error
    }
  }

  function showSuccess(message: string) {
    successMessage.value = message
    showSuccessMessage.value = true
    setTimeout(() => {
      showSuccessMessage.value = false
    }, 3000)
  }

  return {
    news,
    searchQuery,
    selectedCategory,
    selectedDate,
    currentPage,
    itemsPerPage,
    isLoading,
    showSuccessMessage,
    successMessage,
    categories,
    dates,
    filteredNews,
    totalPages,
    paginatedNews,
    setSearchQuery,
    setCategory,
    setDate,
    setPage,
    hasUserLiked,
    fetchNews,
    addNews,
    editNews,
    deleteNews,
    likeNews
  }
}) 