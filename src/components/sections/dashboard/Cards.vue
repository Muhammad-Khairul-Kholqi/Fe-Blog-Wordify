<template>
    <div class="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 items-center gap-3">
        <div v-for="card in cards" :key="card.title" class="border border-gray-200 p-5 rounded-xl">
            <div class="flex justify-between items-center">
                <h1 class="font-semibold text-gray-600">{{ card.title }}</h1>
                <RouterLink :to="card.link">
                    <div class="px-3 py-1 border border-gray-200 text-center text-sm rounded-md hover:bg-gray-50">
                        See Details
                    </div>
                </RouterLink>
            </div>

            <div class="flex items-center gap-3 mt-5">
                <div class="flex items-center justify-center p-2 rounded-md border border-gray-200">
                    <component :is="card.icon" class="w-4 h-4" :class="card.color" />
                </div>
                <span class="font-semibold text-3xl">{{ card.value }}</span>
            </div>

            <p class="mt-2 text-sm text-gray-500">
                {{ card.description }}
            </p>
        </div>
    </div>
</template>

<script setup>
    import { RouterLink } from "vue-router"
    import { Heart, Eye, Newspaper, Layers2 } from "lucide-vue-next"

    const cards = [
        {
            title: "Likes",
            value: "250K",
            description: "This is the number of likes of all articles",
            icon: Heart,
            color: "text-red-600",
            link: "/private/page/admin/likes",
        },
        {
            title: "Views",
            value: "250K",
            description: "This is the number of views of all articles",
            icon: Eye,
            color: "text-blue-600",
            link: "/private/page/admin/views",
        },
        {
            title: "Articles",
            value: "250K",
            description: "This is the number of articles that have been created",
            icon: Newspaper,
            color: "text-green-600",
            link: "/private/page/admin/articles",
        },
        {
            title: "Categories",
            value: "250K",
            description: "This is the number of categories that have been created",
            icon: Layers2,
            color: "text-yellow-600",
            link: "/private/page/admin/categories",
        },
    ]
</script>
