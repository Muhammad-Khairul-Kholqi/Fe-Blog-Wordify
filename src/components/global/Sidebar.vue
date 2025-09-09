<template>
    <aside :class="[
        'fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200',
        open ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0 md:static md:shadow-none'
    ]">
        <div class="flex items-center justify-between p-4 border-b border-gray-200">
            <div class="flex items-center justify-center gap-2">
                <img :src="MainLogo" alt="Logo Wordify" class="w-[31px]" />
                <span class="font-semibold tracking-wide">WORDIFY</span>
            </div>
            <button class="md:hidden text-gray-600" @click="$emit('close')">
                <X class="w-6 h-6" />
            </button>
        </div>

        <nav class="p-4 space-y-2 border-b border-gray-200">
            <RouterLink to="/private/page/admin/dashboard"
                class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100">
                <LayoutDashboard class="w-4 h-4" />
                <span>Dashboard</span>
            </RouterLink>
            <RouterLink to="/private/page/admin/users"
                class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100">
                <Users class="w-4 h-4" />
                <span>Users</span>
            </RouterLink>
            <RouterLink to="/private/page/admin/settings"
                class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100">
                <Settings class="w-4 h-4" />
                <span>Settings</span>
            </RouterLink>
        </nav>

        <div class="p-4">
            <RouterLink to="/private/page/admin/settings"
                class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100">
                <Settings class="w-4 h-4" />
                <span>Settings</span>
            </RouterLink>
        </div>
    </aside>
</template>

<script setup>
    import { RouterLink } from "vue-router"
    import { X, LayoutDashboard, Users, Settings } from "lucide-vue-next"
    import MainLogo from "../../assets/mainLogo.png";

    defineProps({
        open: { type: Boolean, required: true }
    })
</script>
