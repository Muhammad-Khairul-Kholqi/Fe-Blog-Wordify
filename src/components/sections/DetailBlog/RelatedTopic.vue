<template>
    <div class="w-full md:max-w-[30%]">
        <h1 class="font-semibold text-xl">Related topics</h1>
        <div class="mt-5 space-y-5">
            <div class="group">
                <RouterLink to="">
                    <img src="https://cdn.dribbble.com/userupload/44290125/file/c59ea156647cbab7df945e5ad30c932e.png?format=webp&resize=640x480&vertical=center"
                        alt="" class="w-full h-[170px] object-cover rounded-xl">
                    <div class="flex items-center gap-2 text-gray-500 font-medium mt-2">
                        <h4>Technology</h4>
                        <h4>|</h4>
                        <h4>23 August, 2025</h4>
                    </div>
                    <h1 class="text-lg font-semibold mt-2 group-hover:text-purple-500 transition-colors duration-200">
                        7 Critical business tools every designer needs! #1
                    </h1>
                </RouterLink>
            </div>

            <div class="group">
                <RouterLink to="">
                    <img src="https://cdn.dribbble.com/userupload/44290125/file/c59ea156647cbab7df945e5ad30c932e.png?format=webp&resize=640x480&vertical=center"
                        alt="" class="w-full h-[170px] object-cover rounded-xl">
                    <div class="flex items-center gap-2 text-gray-500 font-medium mt-2">
                        <h4>Technology</h4>
                        <h4>|</h4>
                        <h4>23 August, 2025</h4>
                    </div>
                    <h1 class="text-lg font-semibold mt-2 group-hover:text-purple-500 transition-colors duration-200">
                        7 Critical business tools every designer needs! #1
                    </h1>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { RouterLink } from 'vue-router';
</script>