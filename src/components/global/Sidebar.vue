<template>
    <aside :class="[
        'fixed inset-y-0 left-0 z-40 w-60 bg-white border-r border-gray-200 transform transition-transform duration-200',
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
            <RouterLink v-for="menu in menus" :key="menu.to" :to="menu.to" custom v-slot="{ href, navigate, isActive }">
                <a :href="href" @click="navigate" :class="[
                    'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                    isActive ? 'bg-purple-500 text-white' : 'hover:bg-gray-100'
                ]">
                    <component :is="menu.icon" class="w-4 h-4" />
                    <span>{{ menu.name }}</span>
                </a>
            </RouterLink>
        </nav>

        <div class="p-4">
            <button class="flex w-full items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-gray-100 text-red-600 cursor-pointer">
                <LogOut class="w-4 h-4" />
                <span>Log Out</span>
            </button>
        </div>
    </aside>
</template>


<script setup>
    import { RouterLink } from "vue-router"
    import { X, LayoutDashboard, Newspaper, Layers2, LogOut } from "lucide-vue-next"
    import MainLogo from "../../assets/mainLogo.png";

    defineProps({
        open: { type: Boolean, required: true }
    })

    const menus = [
        { name: "Dashboard", icon: LayoutDashboard, to: "/private/page/admin/dashboard" },
        { name: "Categories", icon: Layers2, to: "/private/page/admin/users" },
        { name: "Articles", icon: Newspaper, to: "/private/page/admin/settings" },
    ]
</script>
