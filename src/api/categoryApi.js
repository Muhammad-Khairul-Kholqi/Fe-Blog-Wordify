import axios from 'axios'
import Swal from 'sweetalert2'

const API_BASE_URL =
    import.meta.env.VITE_URL_API_PUBLIC

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken') ||
            localStorage.getItem('token') ||
            localStorage.getItem('access_token') ||
            sessionStorage.getItem('authToken') ||
            sessionStorage.getItem('token')

        console.log('Auth token found:', token ? 'Yes' : 'No')

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
            console.log('Authorization header set:', config.headers.Authorization)
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response ?.status === 401) {
            console.error('Unauthorized! Token might be invalid or expired')
        }
        return Promise.reject(error)
    }
)

export const getCategories = async (params = {}) => {
    try {
        const response = await apiClient.get('/api/category', {
            params
        })
        console.log('Get categories response:', response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching categories:', error)
        throw error
    }
}

export const createCategory = async (data) => {
    try {
        console.log('Creating category with data:', data)
        const response = await apiClient.post('/api/category', data)
        console.log('Create category response:', response.data)

        await Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Category created successfully',
            timer: 2000,
            showConfirmButton: false,
            toast: true,
            position: 'top-end'
        })

        return {
            success: true,
            data: response.data
        }
    } catch (error) {
        console.error('Error creating category:', error)
        console.error('Error response:', error.response)

        const errorMessage = error.response ?.data ?.error ||
            error.response ?.data ?.message ||
            'Failed to create category'

        await Swal.fire({
            icon: 'error',
            title: 'Create Failed',
            text: errorMessage,
            confirmButtonColor: '#8B5CF6'
        })

        return {
            success: false,
            error: errorMessage
        }
    }
}

export const updateCategory = async (id, data) => {
    try {
        console.log('Updating category ID:', id, 'with data:', data)
        const response = await apiClient.put(`/api/category/${id}`, data)
        console.log('Update category response:', response.data)

        await Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Category updated successfully',
            timer: 2000,
            showConfirmButton: false,
            toast: true,
            position: 'top-end'
        })

        return {
            success: true,
            data: response.data
        }
    } catch (error) {
        console.error('Error updating category:', error)
        console.error('Error response:', error.response)

        const errorMessage = error.response ?.data ?.error ||
            error.response ?.data ?.message ||
            'Failed to update category'

        await Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: errorMessage,
            confirmButtonColor: '#8B5CF6'
        })

        return {
            success: false,
            error: errorMessage
        }
    }
}

export const deleteCategory = async (id) => {
    try {
        console.log('Deleting category ID:', id)

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this category?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        })

        if (!result.isConfirmed) {
            return {
                success: false,
                cancelled: true
            }
        }

        const response = await apiClient.delete(`/api/category/${id}`)
        console.log('Delete category response:', response.data)

        await Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Category has been deleted successfully',
            timer: 2000,
            showConfirmButton: false,
            toast: true,
            position: 'top-end'
        })

        return {
            success: true,
            data: response.data
        }
    } catch (error) {
        console.error('Error deleting category:', error)
        console.error('Error response:', error.response)

        const errorMessage = error.response ?.data ?.error ||
            error.response ?.data ?.message ||
            'Failed to delete category'

        await Swal.fire({
            icon: 'error',
            title: 'Delete Failed',
            text: errorMessage,
            confirmButtonColor: '#8B5CF6'
        })

        return {
            success: false,
            error: errorMessage
        }
    }
}