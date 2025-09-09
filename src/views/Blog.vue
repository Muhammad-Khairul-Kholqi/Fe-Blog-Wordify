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
                    <div
                        class="flex items-center w-full md:max-w-[40%] bg-white rounded-lg px-4 py-2 border border-gray-200">
                        <Search class="w-5 h-5 text-gray-500 mr-2" />
                        <input type="text" placeholder="Search blog..." v-model="searchQuery"
                            class="w-full outline-none bg-transparent text-gray-700" />
                    </div>

                    <div class="relative w-full md:max-w-[20%]">
                        <button @click="toggleCategory"
                            class="flex items-center justify-between w-full px-4 py-2 bg-white rounded-lg text-gray-700 border border-gray-200 cursor-pointer">
                            <span>{{ selectedCategory || "Category" }}</span>
                            <ChevronDown class="w-5 h-5" />
                        </button>
                        <div v-if="isCategoryOpen"
                            class="absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                            <ul class="max-h-60 overflow-y-auto">
                                <li @click="selectCategory('')" class="px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                                    All Categories
                                </li>
                                <li v-for="cat in dummyCategories" :key="cat" @click="selectCategory(cat)"
                                    class="px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                                    {{ cat }}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="relative w-full md:max-w-[20%]">
                        <button @click="toggleSort"
                            class="flex items-center justify-between w-full px-4 py-2 bg-white rounded-lg border border-gray-200 cursor-pointer text-gray-700">
                            <span>{{ selectedSortLabel }}</span>
                            <ChevronDown class="w-5 h-5" />
                        </button>
                        <div v-if="isSortOpen"
                            class="absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                            <ul class="max-h-60 overflow-y-auto">
                                <li @click="selectSort('')" class="px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                                    Default
                                </li>
                                <li v-for="sort in dummySortOptions" :key="sort.value" @click="selectSort(sort.value)"
                                    class="px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                                    {{ sort.label }}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <button @click="resetFilters"
                        class="w-full md:max-w-[20%] bg-purple-500 hover:bg-purple-600 text-white rounded-lg px-4 py-2 cursor-pointer">
                        Reset
                    </button>
                </div>
            </div>

            <div class="mt-10">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="blog in paginatedBlogs" :key="blog.id" class="group cursor-pointer">
                        <img :src="blog.image" :alt="blog.title"
                            class="w-full h-[250px] object-cover rounded-xl group-hover:scale-105 duration-300">

                        <div class="flex items-center gap-2 mt-3">
                            <span class="text-gray-500 text-sm font-medium">{{ blog.category }}</span>
                            <div class="bg-gray-500 text-sm p-0.5 mt-1 rounded-full"></div>
                            <span class="text-gray-500 text-sm font-medium">{{ blog.readTime }} min read</span>
                        </div>

                        <h1 class="mt-3 text-xl font-semibold group-hover:underline duration-300 line-clamp-2">
                            {{ blog.title }}
                        </h1>

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
                <button @click="goToFirstPage" :disabled="currentPage === 1"
                    class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                    Previous
                </button>

                <template v-for="item in paginationItems" :key="item">
                    <button @click="goToPage(item)" :class="{
                        'bg-purple-500 text-white': item === currentPage,
                        'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50': item !== currentPage
                    }" class="px-4 py-2 rounded-lg min-w-[40px] cursor-pointer">
                        {{ item }}
                    </button>
                </template>

                <button @click="goToLastPage" :disabled="currentPage === totalPages"
                    class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                    Next
                </button>
            </div>

            <div class="text-center text-gray-600 mt-4 text-sm">
                Showing {{ startIndex + 1 }}-{{ Math.min(endIndex, filteredBlogs.length) }} of {{ filteredBlogs.length
                }} blogs
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed } from "vue"
    import { Search, User, Calendar, ChevronDown } from "lucide-vue-next"
    import { useRoute, useRouter } from "vue-router"

    const route = useRoute()
    const router = useRouter()

    const currentPage = ref(parseInt(route.query.page) || 1)
    const itemsPerPage = 9
    const totalBlogs = 50

    const searchQuery = ref("")
    const selectedCategory = ref("")
    const selectedSort = ref("")
    const isCategoryOpen = ref(false)
    const isSortOpen = ref(false)

    const dummyCategories = ["Design", "Development", "Marketing", "Business", "Technology"]
    const dummySortOptions = [
        { label: "Newest", value: "newest" },
        { label: "Oldest", value: "oldest" },
        { label: "Most Popular", value: "popular" },
        { label: "Shortest Read", value: "short" },
        { label: "Longest Read", value: "long" }
    ]

    const dummyBlog = {
        title: "7 Critical business tools every designer needs!",
        description: "Discover a list of the most important business tools for designers to scale their brand in 2023 and beyond.",
        category: "Design",
        readTime: 5,
        author: "Khairul Kholqi",
        date: "19 Jun, 2023",
        image: "https://cdn.dribbble.com/userupload/44290125/file/c59ea156647cbab7df945e5ad30c932e.png?format=webp&resize=640x480&vertical=center"
    }

    const blogs = computed(() => {
        return Array.from({ length: totalBlogs }, (_, index) => ({
            ...dummyBlog,
            id: index + 1,
            title: `${dummyBlog.title} #${index + 1}`,
            category: dummyCategories[index % dummyCategories.length],
            readTime: (index % 8) + 3,
            date: `2023-06-${(index % 28) + 1}`
        }))
    })

    const filteredBlogs = computed(() => {
        let result = blogs.value

        if (searchQuery.value) {
            result = result.filter(blog =>
                blog.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                blog.description.toLowerCase().includes(searchQuery.value.toLowerCase())
            )
        }

        if (selectedCategory.value) {
            result = result.filter(blog => blog.category === selectedCategory.value)
        }

        if (selectedSort.value === "newest") {
            result = [...result].sort((a, b) => new Date(b.date) - new Date(a.date))
        } else if (selectedSort.value === "oldest") {
            result = [...result].sort((a, b) => new Date(a.date) - new Date(b.date))
        } else if (selectedSort.value === "popular") {
            result = [...result].sort((a, b) => b.readTime - a.readTime)
        } else if (selectedSort.value === "short") {
            result = [...result].sort((a, b) => a.readTime - b.readTime)
        } else if (selectedSort.value === "long") {
            result = [...result].sort((a, b) => b.readTime - a.readTime)
        }

        return result
    })

    const totalPages = computed(() => Math.ceil(filteredBlogs.value.length / itemsPerPage))
    const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
    const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, filteredBlogs.value.length))

    const paginatedBlogs = computed(() => {
        return filteredBlogs.value.slice(startIndex.value, endIndex.value)
    })

    const paginationItems = computed(() => {
        const current = currentPage.value
        const total = totalPages.value
        const items = []
        let start, end

        if (current <= 3) {
            start = 1
            end = Math.min(3, total)
        } else {
            const group = Math.ceil(current / 3)
            start = (group - 1) * 3 + 1
            end = Math.min(group * 3, total)
        }

        for (let i = start; i <= end; i++) {
            items.push(i)
        }

        return items
    })

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages.value) {
            currentPage.value = page
            router.push({ query: { ...route.query, page: page } })
        }
    }
    const goToFirstPage = () => { if (currentPage.value > 1) goToPage(currentPage.value - 1) }
    const goToLastPage = () => { if (currentPage.value < totalPages.value) goToPage(currentPage.value + 1) }

    const resetFilters = () => {
        searchQuery.value = ""
        selectedCategory.value = ""
        selectedSort.value = ""
    }

    const toggleCategory = () => {
        isCategoryOpen.value = !isCategoryOpen.value
        isSortOpen.value = false
    }
    const toggleSort = () => {
        isSortOpen.value = !isSortOpen.value
        isCategoryOpen.value = false
    }
    const selectCategory = (cat) => {
        selectedCategory.value = cat
        isCategoryOpen.value = false
    }
    const selectSort = (sort) => {
        selectedSort.value = sort
        isSortOpen.value = false
    }
    const selectedSortLabel = computed(() => {
        if (!selectedSort.value) return "Sort"
        return dummySortOptions.find(opt => opt.value === selectedSort.value)?.label || "Sort"
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
