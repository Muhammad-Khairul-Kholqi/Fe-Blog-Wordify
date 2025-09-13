<template>
    <!-- Portal modal ke body agar tidak terkena parent z-index -->
    <Teleport to="body">
        <div v-if="isVisible"
            class="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
            <div class="bg-white rounded-lg p-6 w-full max-w-md transform transition-all duration-300 scale-100">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-lg font-semibold text-gray-900">
                        {{ isEditMode ? 'Edit Category' : 'Add New Category' }}
                    </h3>
                    <button @click="closeModal"
                        class="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                        <X />
                    </button>
                </div>

                <form @submit.prevent="handleSubmit">
                    <div class="mb-6">
                        <label for="categoryName" class="block text-sm font-medium text-gray-700 mb-2">
                            Category Name <span class="text-red-500">*</span>
                        </label>
                        <input id="categoryName" type="text" v-model="form.name" :class="[
                            'w-full px-3 py-2 border rounded-lg outline-none transition-all duration-200',
                            errors.name
                                ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-transparent'
                                : 'border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                        ]" placeholder="Enter category name" :disabled="loading" maxlength="100">
                        <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
                        <p class="mt-1 text-xs text-gray-500">{{ form.name.length }}/100 characters</p>
                    </div>

                    <div class="flex gap-3 justify-end">
                        <button type="button" @click="closeModal" :disabled="loading"
                            class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                            Cancel
                        </button>
                        <button type="submit" :disabled="loading || !isFormValid"
                            class="px-4 py-2 text-white bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer">
                            <div v-if="loading"
                                class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin">
                            </div>
                            {{ loading ? 'Saving...' : (isEditMode ? 'Update Category' : 'Create Category') }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { ref, reactive, computed, watch, nextTick } from 'vue'
import { X } from 'lucide-vue-next'

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

const emit = defineEmits(['close', 'submit'])

const form = reactive({
    name: ''
})

const errors = reactive({
    name: ''
})

const resetForm = () => {
    form.name = ''
    errors.name = ''
}

const isEditMode = computed(() => props.category !== null)

const isFormValid = computed(() => {
    return form.name.trim().length > 0 && !errors.name
})

const validateForm = () => {
    errors.name = ''

    if (!form.name.trim()) {
        errors.name = 'Category name is required'
        return false
    }

    if (form.name.trim().length < 2) {
        errors.name = 'Category name must be at least 2 characters'
        return false
    }

    if (form.name.trim().length > 100) {
        errors.name = 'Category name must not exceed 100 characters'
        return false
    }

    const namePattern = /^[a-zA-Z0-9\s\-_]+$/
    if (!namePattern.test(form.name.trim())) {
        errors.name = 'Category name can only contain letters, numbers, spaces, hyphens, and underscores'
        return false
    }

    return true
}

watch(() => form.name, () => {
    if (form.name.trim()) {
        validateForm()
    } else {
        errors.name = ''
    }
})

watch(() => props.category, (newCategory) => {
    if (newCategory) {
        form.name = newCategory.name || ''
    } else {
        resetForm()
    }
}, { immediate: true })

watch(() => props.isVisible, (isVisible) => {
    if (isVisible) {
        nextTick(() => {
            const input = document.getElementById('categoryName')
            if (input) {
                input.focus()
            }
        })
    } else {
        resetForm()
    }
})

const closeModal = () => {
    if (!props.loading) {
        emit('close')
    }
}

const handleSubmit = () => {
    if (!validateForm()) {
        return
    }

    const submitData = {
        name: form.name.trim()
    }

    if (isEditMode.value) {
        submitData.id = props.category.id
    }

    emit('submit', submitData)
}

const handleKeydown = (event) => {
    if (event.key === 'Escape' && props.isVisible) {
        closeModal()
    }
}

document.addEventListener('keydown', handleKeydown)

import { onUnmounted } from 'vue'
onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
})
</script>