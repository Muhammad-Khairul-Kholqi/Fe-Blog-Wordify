<template>
    <div class="p-3 sm:p-5 border border-gray-200 rounded-2xl">
        <div class="flex flex-col sm:flex-row gap-3">
            <div class="flex-1 sm:max-w-none border border-gray-200 p-2 rounded-lg flex items-center gap-2">
                <Search class="w-5 h-5 text-gray-500 flex-shrink-0" />
                <input type="text" v-model="searchQuery" @input="handleSearch" class="w-full px-2 outline-none"
                    placeholder="Search category...">
            </div>
            <button @click="openCreateModal"
                class="w-full sm:w-auto sm:min-w-[140px] p-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-white cursor-pointer transition-colors duration-200">
                <span class="hidden sm:inline">Add Category</span>
                <span class="sm:hidden">Add</span>
            </button>
        </div>

        <div v-if="loading" class="flex justify-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
        </div>

        <div v-else class="relative overflow-x-auto mt-5">
            <table class="w-full text-sm text-left">
                <thead class="text-xs sm:text-sm uppercase bg-gray-100">
                    <tr class="bg-gray-50">
                        <th class="px-3 sm:px-6 py-3">No</th>
                        <th class="px-3 sm:px-6 py-3">Category Name</th>
                        <th class="px-3 sm:px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(category, index) in categories" :key="category.id"
                        class="hover:bg-gray-50 bg-white border-b border-gray-200">
                        <td class="px-3 sm:px-6 py-4 align-top text-gray-600">
                            {{ getItemNumber(index) }}
                        </td>
                        <td class="px-3 sm:px-6 py-4 align-top font-medium text-gray-600">
                            {{ category.name }}
                        </td>
                        <td class="px-3 sm:px-6 py-4 align-top">
                            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                                <button @click="openEditModal(category)"
                                    class="text-blue-500 hover:text-blue-600 hover:underline cursor-pointer text-xs sm:text-sm transition-colors">
                                    Edit
                                </button>
                                <button @click="openDeleteModal(category)"
                                    class="text-red-500 hover:text-red-600 hover:underline cursor-pointer text-xs sm:text-sm transition-colors">
                                    Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div v-if="categories.length === 0" class="text-center py-8 text-gray-500">
                <div class="flex flex-col items-center">
                    <svg class="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <p class="text-lg font-medium text-gray-900 mb-2">No categories found</p>
                    <p class="text-gray-500">
                        {{ searchQuery ? 'No categories match your search criteria.' : 'Get started by creating your first category.' }}
                    </p>
                    <button v-if="!searchQuery" @click="openCreateModal"
                        class="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                        Add Category
                    </button>
                </div>
            </div>
        </div>

        <Pagination :current-page="currentPage" :total-items="totalItems" :per-page="perPage"
            @pageChanged="handlePageChange" />

        <CategoryFormModal :is-visible="showFormModal" :category="selectedCategory" :loading="modalLoading"
            @close="closeFormModal" @submit="handleFormSubmit" />

        <DeleteConfirmationModal :is-visible="showDeleteModal" :category="selectedCategory" :loading="modalLoading"
            @close="closeDeleteModal" @delete="handleDelete" />
    </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Search } from 'lucide-vue-next'
import Pagination from '../../../components/molecules/Pagination.vue'
import CategoryFormModal from "../../../components/sections/category/CategoryFormModal.vue"
import DeleteConfirmationModal from "../../../components/sections/category/DeleteConfirmationModal.vue"
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../../api/categoryApi'

const route = useRoute()
const router = useRouter()

const categories = ref([])
const loading = ref(false)
const modalLoading = ref(false)
const searchQuery = ref('')
const currentPage = ref(1)
const totalItems = ref(0)
const perPage = 5

const showFormModal = ref(false)
const showDeleteModal = ref(false)
const selectedCategory = ref(null)

const getItemNumber = (index) => {
    return (currentPage.value - 1) * perPage + index + 1
}

let searchTimeout = null
const handleSearch = () => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
        currentPage.value = 1
        updateUrlAndFetch()
    }, 500)
}

const initializeFromUrl = () => {
    currentPage.value = parseInt(route.query.page) || 1
    searchQuery.value = route.query.search || ''
}

const updateUrlAndFetch = async () => {
    const query = {}

    if (currentPage.value > 1) {
        query.page = currentPage.value
    }

    if (searchQuery.value.trim()) {
        query.search = searchQuery.value.trim()
    }

    await router.replace({ query })

    await fetchCategories()
}

const fetchCategories = async () => {
    try {
        loading.value = true
        console.log('Fetching categories...')

        const params = {
            page: currentPage.value,
            per_page: perPage
        }

        if (searchQuery.value.trim()) {
            params.search = searchQuery.value.trim()
        }

        const response = await getCategories()
        console.log('Categories fetched:', response)
        let filteredData = response

        if (searchQuery.value.trim()) {
            filteredData = response.filter(category =>
                category.name.toLowerCase().includes(searchQuery.value.toLowerCase())
            )
        }

        totalItems.value = filteredData.length
        const start = (currentPage.value - 1) * perPage
        const end = start + perPage
        categories.value = filteredData.slice(start, end)

        console.log('Categories after processing:', categories.value)

    } catch (error) {
        console.error('Error fetching categories:', error)
        categories.value = []
        totalItems.value = 0
    } finally {
        loading.value = false
    }
}

const handlePageChange = (page) => {
    currentPage.value = page
    updateUrlAndFetch()
}

const openCreateModal = () => {
    console.log('Opening create modal')
    selectedCategory.value = null
    showFormModal.value = true
}

const openEditModal = (category) => {
    console.log('Opening edit modal for category:', category)
    selectedCategory.value = { ...category }
    showFormModal.value = true
}

const openDeleteModal = (category) => {
    console.log('Opening delete modal for category:', category)
    selectedCategory.value = category
    showDeleteModal.value = true
}

const closeFormModal = () => {
    console.log('Closing form modal')
    showFormModal.value = false
    selectedCategory.value = null
}

const closeDeleteModal = () => {
    console.log('Closing delete modal')
    showDeleteModal.value = false
    selectedCategory.value = null
}

const handleFormSubmit = async (formData) => {
    console.log('Form submitted with data:', formData)
    try {
        modalLoading.value = true
        let result

        if (selectedCategory.value) {
            console.log('Updating category:', selectedCategory.value.id)
            result = await updateCategory(selectedCategory.value.id, formData)
        } else {
            console.log('Creating new category')
            result = await createCategory(formData)
        }

        console.log('Operation result:', result)

        if (result.success) {
            closeFormModal()

            if (!selectedCategory.value) {
                currentPage.value = 1
            }

            await updateUrlAndFetch()
        }

    } catch (error) {
        console.error('Error submitting form:', error)
    } finally {
        modalLoading.value = false
    }
}

const handleDelete = async (categoryId) => {
    console.log('Deleting category ID:', categoryId)
    try {
        modalLoading.value = true

        const result = await deleteCategory(categoryId)
        console.log('Delete result:', result)

        if (result.success) {
            closeDeleteModal()

            const remainingItems = totalItems.value - 1
            const maxPage = Math.ceil(remainingItems / perPage)
            if (currentPage.value > maxPage && maxPage > 0) {
                currentPage.value = maxPage
            }

            await updateUrlAndFetch()
        }

    } catch (error) {
        console.error('Error deleting category:', error)
    } finally {
        modalLoading.value = false
    }
}

watch(() => route.query, () => {
    initializeFromUrl()
    fetchCategories()
}, { immediate: false })

onMounted(() => {
    console.log('Categories component mounted')
    initializeFromUrl()
    fetchCategories()
})
</script>