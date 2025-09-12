<template>
    <div class="bg-gradient-to-r from-purple-500 to-purple-700 h-screen flex items-center justify-center p-5">
        <div class="bg-white w-full max-w-[400px] rounded-2xl px-5 py-10">
            <div class="flex items-center justify-center gap-2">
                <img :src="MainLogo" alt="Logo Wordify" class="w-[40px]" />
                <span class="font-semibold tracking-wide"> WORDIFY </span>
            </div>

            <div class="mt-5 text-center">
                <h1 class="text-2xl font-semibold">Welcome back</h1>
                <h2 class="text-sm text-gray-500">
                    Sign In to access your account and settings
                </h2>
            </div>

            <form @submit.prevent="handleLogin" class="space-y-5 mt-8">
                <div class="flex items-center gap-2 w-full p-2 border border-gray-200 rounded-lg">
                    <Mail class="w-5 h-5 text-gray-500" />
                    <input v-model="loginForm.email" type="email" class="w-full outline-none placeholder:text-sm"
                        placeholder="Enter your email" required :disabled="loading" />
                </div>

                <div class="flex items-center gap-2 w-full p-2 border border-gray-200 rounded-lg">
                    <Lock class="w-5 h-5 text-gray-500" />
                    <input v-model="loginForm.password" :type="showPassword ? 'text' : 'password'"
                        class="w-full outline-none placeholder:text-sm" placeholder="Enter your password" required
                        :disabled="loading" />
                    <button type="button" class="text-gray-500 hover:text-gray-700 cursor-pointer"
                        @click="togglePassword" :disabled="loading">
                        <Eye v-if="!showPassword" class="w-5 h-5" />
                        <EyeOff v-else class="w-5 h-5" />
                    </button>
                </div>

                <button type="submit" :disabled="loading"
                    class="bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 disabled:cursor-not-allowed cursor-pointer w-full p-2 text-white text-center rounded-lg flex items-center justify-center gap-2">
                    <div v-if="loading"
                        class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {{ loading ? 'Signing In...' : 'Sign In' }}
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import MainLogo from "../../assets/mainLogo.png";
import { Mail, Lock, Eye, EyeOff } from "lucide-vue-next";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import AuthApi from "../../api/authApi";

const router = useRouter();
const showPassword = ref(false);
const loading = ref(false);

const loginForm = ref({
    email: '',
    password: ''
});

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};

const handleLogin = async () => {
    if (loading.value) return;

    loading.value = true;

    try {
        const result = await AuthApi.login(loginForm.value);

        if (result.success) {
            router.push('/private/page/admin/dashboard');
        }
    } catch (error) {
        console.error('Login error:', error);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    if (AuthApi.isAuthenticated()) {
        router.push('/private/page/admin/dashboard');
    }
});
</script>