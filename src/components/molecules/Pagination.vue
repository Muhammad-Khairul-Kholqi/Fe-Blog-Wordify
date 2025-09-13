<template>
    <div class="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
        <div class="text-sm text-gray-700">
            Showing {{ startItem }} to {{ endItem }} of {{ totalItems }} results
        </div>

        <nav class="flex items-center space-x-1" v-if="totalPages > 1">
            <button @click="goToPage(currentPage - 1)" :disabled="currentPage <= 1"
                class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                Previous
            </button>

            <button @click="goToPage(currentPage + 1)" :disabled="currentPage >= totalPages"
                class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                Next
            </button>
        </nav>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps({
    currentPage: {
        type: Number,
        required: true
    },
    totalItems: {
        type: Number,
        required: true
    },
    perPage: {
        type: Number,
        default: 5
    },
    maxVisiblePages: {
        type: Number,
        default: 5
    }
})

const emit = defineEmits(['pageChanged'])

const router = useRouter()
const route = useRoute()

const totalPages = computed(() => Math.ceil(props.totalItems / props.perPage))
const startItem = computed(() => (props.currentPage - 1) * props.perPage + 1)
const endItem = computed(() => Math.min(props.currentPage * props.perPage, props.totalItems))

const goToPage = (page) => {
    if (page < 1 || page > totalPages.value || page === props.currentPage) {
        return
    }

    const query = { ...route.query, page }
    if (page === 1) {
        delete query.page
    }

    router.push({ query })
    emit('pageChanged', page)
}
</script>