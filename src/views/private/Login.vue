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

            <form action="" class="space-y-5 mt-8">
                <div class="flex items-center gap-2 w-full p-2 border border-gray-200 rounded-lg">
                    <Mail class="w-5 h-5 text-gray-500" />
                    <input type="email" class="w-full outline-none placeholder:text-sm" placeholder="Enter your email" />
                </div>

                <div class="flex items-center gap-2 w-full p-2 border border-gray-200 rounded-lg">
                    <Lock class="w-5 h-5 text-gray-500" />
                    <input :type="showPassword ? 'text' : 'password'" class="w-full outline-none placeholder:text-sm"
                        placeholder="Enter your password" />
                    <button type="button" class="text-gray-500 hover:text-gray-700 cursor-pointer" @click="togglePassword">
                        <Eye v-if="!showPassword" class="w-5 h-5" />
                        <EyeOff v-else class="w-5 h-5" />
                    </button>
                </div>

                <button
                    class="bg-purple-500 hover:bg-purple-600 cursor-pointer w-full p-2 text-white text-center rounded-lg">
                    Sign In
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
    import MainLogo from "../../assets/mainLogo.png";
    import { Mail, Lock, Eye, EyeOff } from "lucide-vue-next";
    import { ref } from "vue";

    const showPassword = ref(false);

    const togglePassword = () => {
        showPassword.value = !showPassword.value;
    };
</script>
