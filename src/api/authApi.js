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
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

apiClient.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response ?.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.href = '/private/page/login'
        }
        return Promise.reject(error)
    }
)

class AuthApi {
    static async login(credentials) {
        try {
            const response = await apiClient.post('/api/auth/login', credentials)

            if (response.data.token && response.data.user) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('user', JSON.stringify(response.data.user))

                await Swal.fire({
                    icon: 'success',
                    title: 'Login Successful!',
                    text: response.data.message || 'Welcome back!',
                    timer: 2000,
                    showConfirmButton: false,
                    toast: true,
                    position: 'top-end'
                })

                return {
                    success: true,
                    data: response.data
                }
            }
        } catch (error) {
            const errorMessage = error.response ?.data ?.error || 'Login failed. Please try again.'

            await Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: errorMessage,
                confirmButtonColor: '#8B5CF6'
            })

            return {
                success: false,
                error: errorMessage
            }
        }
    }

    static async getProfile() {
        try {
            const response = await apiClient.get('/api/auth/profile')
            return {
                success: true,
                data: response.data
            }
        } catch (error) {
            const errorMessage = error.response ?.data ?.error || 'Failed to get profile data'

            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
                confirmButtonColor: '#8B5CF6'
            })

            return {
                success: false,
                error: errorMessage
            }
        }
    }

    static async updateProfile(profileData) {
        try {
            const response = await apiClient.put('/api/auth/profile', profileData)

            localStorage.setItem('user', JSON.stringify(response.data))

            await Swal.fire({
                icon: 'success',
                title: 'Profile Updated!',
                text: 'Your profile has been updated successfully.',
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
            const errorMessage = error.response ?.data ?.error || 'Failed to update profile'

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

    static async changePassword(passwordData) {
        try {
            const response = await apiClient.put('/api/auth/change-password', passwordData)

            await Swal.fire({
                icon: 'success',
                title: 'Password Changed!',
                text: response.data.message || 'Password has been changed successfully.',
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
            const errorMessage = error.response ?.data ?.error || 'Failed to change password'

            await Swal.fire({
                icon: 'error',
                title: 'Change Password Failed',
                text: errorMessage,
                confirmButtonColor: '#8B5CF6'
            })

            return {
                success: false,
                error: errorMessage
            }
        }
    }

    static async logout() {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'Do you want to logout?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#8B5CF6',
                cancelButtonColor: '#6B7280',
                confirmButtonText: 'Yes, logout',
                cancelButtonText: 'Cancel'
            })

            if (result.isConfirmed) {
                localStorage.removeItem('token')
                localStorage.removeItem('user')

                await Swal.fire({
                    icon: 'success',
                    title: 'Logged Out!',
                    text: 'You have been logged out successfully.',
                    timer: 1500,
                    showConfirmButton: false,
                    toast: true,
                    position: 'top-end'
                })

                window.location.href = '/private/page/login'

                return {
                    success: true
                }
            }

            return {
                success: false,
                cancelled: true
            }
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Logout Failed',
                text: 'Something went wrong during logout.',
                confirmButtonColor: '#8B5CF6'
            })

            return {
                success: false,
                error: 'Logout failed'
            }
        }
    }

    static isAuthenticated() {
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('user')
        return !!(token && user)
    }

    static getCurrentUser() {
        try {
            const user = localStorage.getItem('user')
            return user ? JSON.parse(user) : null
        } catch (error) {
            return null
        }
    }

    static getToken() {
        return localStorage.getItem('token')
    }
}

export default AuthApi