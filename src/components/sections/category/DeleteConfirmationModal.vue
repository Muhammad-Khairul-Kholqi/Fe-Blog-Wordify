<template>
    <Teleport to="body">
        <div v-if="isVisible"
            class="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
            <div class="bg-white rounded-lg p-6 w-full max-w-md transform transition-all duration-300 scale-100">
                <div class="flex items-center justify-center mb-6">
                    <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                        <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                </div>

                <div class="text-center mb-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">
                        Delete Category
                    </h3>
                    <p class="text-gray-600 mb-4">
                        Are you sure you want to delete this category?
                    </p>
                </div>

                <div class="flex flex-col sm:flex-row gap-3 justify-end">
                    <button type="button" @click="closeModal" :disabled="loading"
                        class="w-full sm:w-auto px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed order-2 sm:order-1 cursor-pointer">
                        Cancel
                    </button>
                    <button type="button" @click="handleDelete" :disabled="loading"
                        class="w-full sm:w-auto px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 order-1 sm:order-2 cursor-pointer">
                        <div v-if="loading"
                            class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        {{ loading ? 'Deleting...' : 'Delete Category' }}
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { watch, nextTick } from 'vue'

const props = defineProps({
    isVisible: {
        type: Boolean,
        default: false
    },
    category: {
        type: Object,
        default: null
    },
    loading: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['close', 'delete'])

const closeModal = () => {
    if (!props.loading) {
        emit('close')
    }
}

const handleDelete = () => {
    if (props.category) {
        emit('delete', props.category.id)
    }
}

const handleKeydown = (event) => {
    if (event.key === 'Escape' && props.isVisible && !props.loading) {
        closeModal()
    }
}

watch(() => props.isVisible, (isVisible) => {
    if (isVisible) {
        nextTick(() => {
            const cancelButton = document.querySelector('[data-focus="cancel"]')
            if (cancelButton) {
                cancelButton.focus()
            }
        })
    }
})

document.addEventListener('keydown', handleKeydown)

import { onUnmounted } from 'vue'
onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
})
</script>