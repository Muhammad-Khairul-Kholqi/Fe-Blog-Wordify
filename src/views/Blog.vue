<template>
  <div class="flex justify-center p-5">
    <div class="w-full max-w-[1300px]">
      <div class="bg-[#F0F0F0]/40 p-5 rounded-2xl">
        <div class="flex items-center gap-3">
            <div class="flex items-center justify-center w-10 h-10 bg-purple-500 rounded-full">
                <Search class="w-5 h-5 text-white" />
            </div>
            <span class="text-xl font-semibold">Search Blog</span>
        </div>
        <p class="text-gray-600 mt-2">Search and read the blog you want</p>

        <div class="flex flex-col md:flex-row w-full items-center gap-3 mt-5">
            <div class="flex items-center w-full md:max-w-[40%] bg-white rounded-lg px-4 py-2 border border-gray-200">
                <Search class="w-5 h-5 text-gray-500 mr-2" />
                <input
                    type="text"
                    v-model="searchQuery"
                    placeholder="Search blog..."
                    class="w-full outline-none bg-transparent text-gray-700"
                />
            </div>

            <div class="relative w-full md:max-w-[20%]">
                <button
                    @click="toggleDropdown('category')"
                    class="flex items-center justify-between w-full px-4 py-2 bg-white rounded-lg text-gray-700 border border-gray-200 cursor-pointer"
                >
                    <span>{{ selectedCategory }}</span>
                    <ChevronDown
                        class="w-5 h-5 transition-transform duration-300"
                        :class="{ 'rotate-180': openDropdown === 'category' }"
                    />
                </button>
                <div
                    v-if="openDropdown === 'category'"
                    class="absolute left-0 mt-2 w-full bg-white rounded-lg shadow z-10"
                >
                    <div
                        v-for="cat in categories"
                        :key="cat"
                        @click="selectCategory(cat)"
                        class="px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                    >
                    {{ cat }}
                    </div>
                </div>
            </div>

            <div class="relative w-full md:max-w-[20%]">
                <button
                    @click="toggleDropdown('sort')"
                    class="flex items-center justify-between w-full px-4 py-2 bg-white rounded-lg border border-gray-200 cursor-pointer text-gray-700"
                >
                    <span>{{ selectedSort }}</span>
                    <ChevronDown
                        class="w-5 h-5 transition-transform duration-300"
                        :class="{ 'rotate-180': openDropdown === 'sort' }"
                    />
                </button>
                <div
                    v-if="openDropdown === 'sort'"
                    class="absolute left-0 mt-2 w-full bg-white rounded-lg shadow z-10"
                >
                    <div
                        v-for="s in sortOptions"
                        :key="s"
                        @click="selectSort(s)"
                        class="px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                    >
                    {{ s }}
                    </div>
                </div>
            </div>

            <button
                @click="resetFilters"
                class="w-full md:max-w-[20%] bg-purple-500 hover:bg-purple-600 text-white rounded-lg px-4 py-2 cursor-pointer"
            >
                Reset
            </button>
        </div>
      </div>

      <div class="mt-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
                v-for="blog in paginatedBlogs" 
                :key="blog.title"
                class="group cursor-pointer"
            >
                <img 
                    :src="blog.image" 
                    :alt="blog.title"
                    class="w-full h-[250px] object-cover rounded-xl group-hover:scale-105 duration-300"
                >

                <div class="flex items-center gap-2 mt-3">
                    <span class="text-purple-500 font-medium">{{ blog.category }}</span>
                    <div class="bg-purple-500 p-1 rounded-full"></div>
                    <span class="text-purple-500 font-medium">{{ blog.readTime }} min read</span>
                </div>

                <h1 class="mt-3 text-xl font-semibold group-hover:underline duration-300 line-clamp-2">{{ blog.title }}</h1>

                <p class="text-gray-500 font-medium mt-2 text-sm line-clamp-3">{{ blog.description }}</p>

                <div class="flex items-center gap-3 mt-3 text-gray-600">
                    <div class="flex items-center gap-2">
                        <User class="w-4 h-4" />
                        <span class="font-medium text-sm">{{ blog.author }}</span>
                    </div>

                    <div class="flex items-center gap-2">
                        <Calendar class="w-4 h-4" />
                        <span class="font-medium text-sm">{{ blog.date }}</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div class="flex justify-center items-center gap-2 mt-10">
        <button 
            @click="goToFirstPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
            Previous
        </button>

        <template v-for="item in paginationItems" :key="item">
            <button 
                v-if="item !== '...'"
                @click="goToPage(item)"
                :class="{
                    'bg-purple-500 text-white': item === currentPage,
                    'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50': item !== currentPage
                }"
                class="px-4 py-2 rounded-lg min-w-[40px] cursor-pointer"
            >
                {{ item }}
            </button>
            <span 
                v-else
                class="px-4 py-2 text-gray-500"
            >
                ...
            </span>
        </template>

        <button 
            @click="goToLastPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
            Next
        </button>
      </div>

      <div class="text-center text-gray-600 mt-4 text-sm">
        Showing {{ startIndex + 1 }}-{{ Math.min(endIndex, filteredBlogs.length) }} of {{ filteredBlogs.length }} blogs
      </div>
    </div>
  </div>
</template>

<script setup>
    import { ref, computed, watch } from "vue"
    import { Search, ChevronDown, User, Calendar } from "lucide-vue-next"
    import { RouterLink, useRoute, useRouter } from "vue-router"

    const route = useRoute()
    const router = useRouter()

    const searchQuery = ref("")
    const categories = ["All", "Technology", "Lifestyle", "Business", "Design"]
    const sortOptions = ["Terbaru", "Terlama"]

    const selectedCategory = ref("Category")
    const selectedSort = ref("Sort")
    const openDropdown = ref(null)

    const currentPage = ref(parseInt(route.query.page) || 1)
    const itemsPerPage = 9

    const blogData = ref([
        {
            title: "7 Critical business tools every designer needs!",
            description: "Discover a list of the most important business tools for designers to scale their brand in 2023 and beyond.",
            category: "Design",
            readTime: 5,
            author: "Khairul Kholqi",
            date: "19 Jun, 2023",
            image: "https://cdn.dribbble.com/userupload/44290125/file/c59ea156647cbab7df945e5ad30c932e.png?format=webp&resize=640x480&vertical=center"
        },
        {
            title: "The Future of Web Development: Trends to Watch in 2024",
            description: "Explore the latest trends shaping the future of web development and how they impact modern businesses.",
            category: "Technology",
            readTime: 8,
            author: "Sarah Johnson",
            date: "15 Aug, 2023",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=640&h=480&fit=crop"
        },
        {
            title: "10 Simple Habits for a Healthier Lifestyle",
            description: "Transform your daily routine with these easy-to-implement healthy habits that will boost your energy and wellbeing.",
            category: "Lifestyle",
            readTime: 6,
            author: "Mike Chen",
            date: "22 Jul, 2023",
            image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=640&h=480&fit=crop"
        },
        {
            title: "Complete Guide to Startup Funding in 2023",
            description: "Everything you need to know about raising capital for your startup, from seed funding to Series A and beyond.",
            category: "Business",
            readTime: 12,
            author: "Alex Rodriguez",
            date: "05 Sep, 2023",
            image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=640&h=480&fit=crop"
        },
        {
            title: "How AI is Revolutionizing Modern Industries",
            description: "Discover how artificial intelligence is transforming various industries and what it means for the future of work.",
            category: "Technology",
            readTime: 10,
            author: "Dr. Emily Watson",
            date: "12 Aug, 2023",
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=640&h=480&fit=crop"
        },
        {
            title: "The Art of Minimalist Living: Less is More",
            description: "Learn how adopting a minimalist lifestyle can lead to greater happiness, productivity, and financial freedom.",
            category: "Lifestyle",
            readTime: 7,
            author: "Jessica Park",
            date: "28 Jun, 2023",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=640&h=480&fit=crop"
        },
        {
            title: "Essential UX Design Principles Every Designer Should Know",
            description: "Master the fundamental principles of user experience design that will make your products more intuitive and user-friendly.",
            category: "Design",
            readTime: 9,
            author: "David Kim",
            date: "14 Jul, 2023",
            image: "https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=640&h=480&fit=crop"
        },
        {
            title: "Maximizing Productivity While Working From Home",
            description: "Proven strategies and tips to stay productive, motivated, and maintain work-life balance in a remote work environment.",
            category: "Business",
            readTime: 6,
            author: "Lisa Thompson",
            date: "03 Aug, 2023",
            image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=640&h=480&fit=crop"
        },
        {
            title: "Sustainable Fashion: Building an Eco-Friendly Wardrobe",
            description: "Explore sustainable fashion trends and learn how to build a stylish, environmentally conscious wardrobe.",
            category: "Lifestyle",
            readTime: 8,
            author: "Emma Wilson",
            date: "25 Jun, 2023",
            image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=640&h=480&fit=crop"
        },
        {
            title: "Cybersecurity Best Practices for Small Businesses",
            description: "Protect your business from cyber threats with these essential security measures and best practices.",
            category: "Technology",
            readTime: 11,
            author: "Robert Martinez",
            date: "18 Jul, 2023",
            image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=640&h=480&fit=crop"
        },
        {
            title: "Machine Learning Fundamentals for Beginners",
            description: "Start your journey into machine learning with this comprehensive guide covering the basics and practical applications.",
            category: "Technology",
            readTime: 15,
            author: "John Smith",
            date: "10 Sep, 2023",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=640&h=480&fit=crop"
        },
        {
            title: "Digital Marketing Strategies That Actually Work",
            description: "Proven digital marketing tactics that will help you grow your business and reach your target audience effectively.",
            category: "Business",
            readTime: 9,
            author: "Maria Garcia",
            date: "02 Oct, 2023",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=640&h=480&fit=crop"
        },
        {
            title: "Creative Photography Techniques for Social Media",
            description: "Elevate your social media presence with these creative photography tips and techniques that will make your content stand out.",
            category: "Design",
            readTime: 7,
            author: "Tom Wilson",
            date: "15 Sep, 2023",
            image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=640&h=480&fit=crop"
        },
        {
            title: "Mental Health and Wellness in the Digital Age",
            description: "Navigate the challenges of modern life and maintain your mental health with practical tips for digital wellness.",
            category: "Lifestyle",
            readTime: 10,
            author: "Dr. Sarah Lee",
            date: "20 Sep, 2023",
            image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=640&h=480&fit=crop"
        }
    ])

    const filteredBlogs = computed(() => {
        let filtered = blogData.value

        if (searchQuery.value) {
            filtered = filtered.filter(blog => 
                blog.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                blog.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                blog.category.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                blog.author.toLowerCase().includes(searchQuery.value.toLowerCase())
            )
        }

        if (selectedCategory.value && selectedCategory.value !== "Category" && selectedCategory.value !== "All") {
            filtered = filtered.filter(blog => blog.category === selectedCategory.value)
        }

        if (selectedSort.value === "Terbaru") {
            filtered = filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
        } else if (selectedSort.value === "Terlama") {
            filtered = filtered.sort((a, b) => new Date(a.date) - new Date(b.date))
        }

        return filtered
    })

    const totalPages = computed(() => Math.ceil(filteredBlogs.value.length / itemsPerPage))
    const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
    const endIndex = computed(() => startIndex.value + itemsPerPage)
    const paginatedBlogs = computed(() => filteredBlogs.value.slice(startIndex.value, endIndex.value))

    const paginationItems = computed(() => {
        const items = []
        const current = currentPage.value
        const total = totalPages.value

        if (total <= 7) {
            for (let i = 1; i <= total; i++) {
                items.push(i)
            }
        } else {
            items.push(1)

            if (current <= 4) {
                for (let i = 2; i <= 5; i++) {
                    items.push(i)
                }
                items.push('...')
                items.push(total)
            } else if (current >= total - 3) {
                items.push('...')
                for (let i = total - 4; i <= total; i++) {
                    items.push(i)
                }
            } else { 
                items.push('...')
                for (let i = current - 2; i <= current + 2; i++) {
                    items.push(i)
                }
                items.push('...')
                items.push(total)
            }
        }

        return items
    })

    const toggleDropdown = (type) => {
        openDropdown.value = openDropdown.value === type ? null : type
    }

    const selectCategory = (cat) => {
        selectedCategory.value = cat
        openDropdown.value = null
        currentPage.value = 1
        router.push({ query: { ...route.query, page: 1 } })
    }

    const selectSort = (s) => {
        selectedSort.value = s
        openDropdown.value = null
        currentPage.value = 1
        router.push({ query: { ...route.query, page: 1 } })
    }

    const resetFilters = () => {
        searchQuery.value = ""
        selectedCategory.value = "Category"
        selectedSort.value = "Sort"
        currentPage.value = 1
        router.push({ query: { ...route.query, page: 1 } })
    }

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages.value) {
            currentPage.value = page
            router.push({ query: { ...route.query, page: page } })
        }
    }

    const goToFirstPage = () => {
        goToPage(1)
    }

    const goToLastPage = () => {
        goToPage(totalPages.value)
    }

    watch(() => route.query.page, (newPage) => {
        currentPage.value = parseInt(newPage) || 1
    })

    watch([searchQuery, selectedCategory, selectedSort], () => {
        currentPage.value = 1
        router.push({ query: { ...route.query, page: 1 } })
    })
</script>

<style scoped>
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>