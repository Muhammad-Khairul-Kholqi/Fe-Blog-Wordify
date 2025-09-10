<template>
    <div class="flex justify-center p-5">
        <div class="w-full max-w-[1300px]">
            <img 
                src="https://cdn.dribbble.com/userupload/44290125/file/c59ea156647cbab7df945e5ad30c932e.png?format=webp&resize=640x480&vertical=center"
                alt="" 
                class="w-full h-[400px] object-cover"
            >

            <div class="w-full flex flex-col md:flex-row lg:items-start gap-10 mt-5">
                <Description />
                <RelatedTopic />
            </div>
        </div>
    </div>
</template>

<script setup>
    import Description from "../../components/sections/detailBlog/Description.vue"
    import RelatedTopic from "../../components/sections/detailBlog/RelatedTopic.vue"
</script>