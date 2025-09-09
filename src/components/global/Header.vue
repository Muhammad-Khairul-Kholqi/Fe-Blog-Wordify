<template>
    <header class="flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3">
        <button class="md:hidden text-gray-600" @click="$emit('toggleSidebar')">
            <Menu class="w-6 h-6" />
        </button>

        <h1 class="text-lg font-semibold">Welcome back</h1>

        <RouterLink to="" class="flex items-center gap-2 text-gray-600 hover:bg-gray-100 p-2 rounded-md">
            <User class="w-5 h-5" />
            <span class="hidden sm:inline">Profile</span>
        </RouterLink>
    </header>
</template>

<script setup>
    import { Menu, User } from "lucide-vue-next"
    import { RouterLink } from "vue-router";
</script>
