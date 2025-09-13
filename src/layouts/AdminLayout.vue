<template>
    <div class="flex h-screen relative">
        <Sidebar :open="sidebarOpen" @close="sidebarOpen = false" />

        <div v-if="sidebarOpen" class="fixed inset-0 z-[45] md:hidden" @click="sidebarOpen = false"></div>

        <div class="flex-1 flex flex-col min-w-0 relative z-10">
            <Header @toggleSidebar="sidebarOpen = true" />
            <main class="overflow-auto">
                <div class="p-6">
                    <div class="mx-auto">
                        <router-view />
                    </div>
                </div>
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
