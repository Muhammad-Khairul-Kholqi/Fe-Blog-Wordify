<template>
    <div class="flex h-screen relative">
        <Sidebar :open="sidebarOpen" @close="sidebarOpen = false" />

        <div v-if="sidebarOpen" class="fixed inset-0 bg-black/50 z-30 md:hidden" @click="sidebarOpen = false"></div>

        <div class="flex-1 flex flex-col relative z-10">
            <Header @toggleSidebar="sidebarOpen = true" />
            <main class="p-6 overflow-y-auto">
                <router-view />
            </main>
        </div>
    </div>
</template>

<script setup>
    import { ref } from "vue"
    import Sidebar from "../components/global/Sidebar.vue"
    import Header from "../components/global/Header.vue"

    const sidebarOpen = ref(false)
</script>
