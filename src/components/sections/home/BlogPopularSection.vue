<template>
    <div class="flex justify-center p-5 mt-5">
        <div class="w-full max-w-[1300px]">
            <section class="py-24">
                <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div
                        class="flex justify-center flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between gap-8">

                        <div class="w-full flex justify-between flex-col lg:w-2/5">
                            <div class="block lg:text-left text-center">
                                <h2 v-motion="animation.createDelayedAnimation(animation.slideLeft, 100)"
                                    class="text-4xl font-bold text-gray-900 leading-[3.25rem] mb-5">
                                    Our Popular <span class="text-purple-600">Blogs</span>
                                </h2>
                                <p v-motion="animation.createDelayedAnimation(animation.slideLeft, 250)"
                                    class="text-gray-500 mb-10 max-lg:max-w-xl max-lg:mx-auto">
                                    Discover our most popular blogs filled with insights, inspiration, and the latest
                                    trends loved by our readers.
                                </p>
                                <RouterLink v-motion="animation.createDelayedAnimation(animation.slideLeft, 350)"
                                    to="/blog"
                                    class="cursor-pointer border border-gray-200 rounded-full py-3.5 px-7 w-52 lg:mx-0 mx-auto flex justify-center text-gray-900 font-semibold transition-all duration-300 hover:bg-gray-50">
                                    View All
                                </RouterLink>
                            </div>

                            <div class="flex items-center lg:justify-start justify-center lg:mt-0 mt-8 gap-8 mb-4">
                                <button v-motion="animation.createDelayedAnimation(animation.slideUp, 450)"
                                    @click="prevSlide"
                                    class="group flex justify-center items-center border border-solid border-indigo-600 w-11 h-11 transition-all duration-500 rounded-full hover:bg-indigo-600 cursor-pointer">
                                    <ChevronLeft class="h-6 w-6 text-indigo-600 group-hover:text-white" />
                                </button>
                                <button v-motion="animation.createDelayedAnimation(animation.slideUp, 450)"
                                    @click="nextSlide"
                                    class="group flex justify-center items-center border border-solid border-indigo-600 w-11 h-11 transition-all duration-500 rounded-full hover:bg-indigo-600 cursor-pointer">
                                    <ChevronRight class="h-6 w-6 text-indigo-600 group-hover:text-white" />
                                </button>
                            </div>
                        </div>

                        <div class="w-full lg:w-3/5"
                            v-motion="animation.createDelayedAnimation(animation.slideRight, 1000)">
                            <div class="relative overflow-hidden">
                                <div class="flex transition-transform duration-500 ease-in-out"
                                    :style="{ transform: `translateX(-${currentSlide * slideWidth}%)` }">
                                    <RouterLink to="" v-for="(blog, index) in blogs" :key="index"
                                        :class="['flex-shrink-0 px-2 sm:px-4 group', slidesPerView === 1 ? 'w-full' : 'w-1/2']">
                                        <div class="flex items-center mb-5 relative">
                                            <img :src="blog.image" :alt="blog.alt"
                                                class="rounded-2xl w-full object-cover h-48">
                                            <div
                                                class="absolute bottom-0 left-0 bg-white rounded-tr-lg px-2 py-1 flex items-center gap-1">
                                                <div class="flex items-center gap-3">
                                                    <div class="flex items-center gap-2">
                                                        <Eye class="w-4 h-4 text-gray-600" />
                                                        <span
                                                            class="text-sm text-gray-600 font-medium">{{blog.views}}</span>
                                                    </div>

                                                    <span class="text-gray-600">|</span>

                                                    <div class="flex items-center gap-2">
                                                        <Eye class="w-4 h-4 text-gray-600" />
                                                        <span class="text-sm text-gray-600 font-medium">{{ blog.likes
                                                            }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <h3
                                            class="text-xl text-gray-900 font-medium leading-8 mb-2 group-hover:text-indigo-600">
                                            {{ blog.title }}
                                        </h3>
                                        <p class="text-gray-500 leading-6 transition-all duration-500 mb-5">
                                            {{ blog.description }}
                                        </p>
                                        <RouterLink to=""
                                            class="cursor-pointer flex items-center gap-2 text-indigo-700 font-semibold group">
                                            Read more
                                            <ArrowRight class="group-hover:translate-x-2 duration-300 w-5 h-5 mt-0.5" />
                                        </RouterLink>
                                    </RouterLink>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, onUnmounted, computed } from 'vue'
    import { ChevronLeft, ChevronRight, Eye, ArrowRight } from 'lucide-vue-next'
    import * as animation from '../../molecules/animation'; 
    import { RouterLink } from 'vue-router';

    const currentSlide = ref(0)
    const slidesPerView = ref(2)

    const blogs = ref([
        {
            image: 'https://pagedone.io/asset/uploads/1696244059.png',
            alt: 'blogs tailwind section',
            title: 'Clever ways to invest in product to organize your portfolio',
            description: 'Discover smart investment strategies to streamline and organize your portfolio.',
            views: '1.2k',
            likes: '2.4K'
        },
        {
            image: 'https://pagedone.io/asset/uploads/1696244074.png',
            alt: 'blogs tailwind section',
            title: 'How to grow your profit through systematic investment with us',
            description: 'Unlock the power of systematic investment with us and watch your profits soar.',
            views: '2.8k',
            likes: '2.4K'
        },
        {
            image: 'https://pagedone.io/asset/uploads/1696244059.png',
            alt: 'blogs tailwind section',
            title: 'Clever ways to invest in product to organize your portfolio',
            description: 'Discover smart investment strategies to streamline and organize your portfolio.',
            views: '956',
            likes: '2.4K'
        },
        {
            image: 'https://pagedone.io/asset/uploads/1696244074.png',
            alt: 'blogs tailwind section',
            title: 'How to grow your profit through systematic investment with us',
            description: 'Unlock the power of systematic investment with us and watch your profits soar.',
            views: '3.4k',
            likes: '2.4K'
        }
    ])

    const totalSlides = computed(() => {
        return Math.ceil(blogs.value.length / slidesPerView.value)
    })

    const slideWidth = computed(() => {
        return 100 / slidesPerView.value
    })

    const nextSlide = () => {
        if (currentSlide.value < totalSlides.value - 1) {
            currentSlide.value++
        } else {
            currentSlide.value = 0 
        }
    }

    const prevSlide = () => {
        if (currentSlide.value > 0) {
            currentSlide.value--
        } else {
            currentSlide.value = totalSlides.value - 1 
        }
    }

    const updateSlidesPerView = () => {
        const width = window.innerWidth
        if (width < 568) {
            slidesPerView.value = 1
        } else {
            slidesPerView.value = 2
        }
        currentSlide.value = 0
    }

    onMounted(() => {
        updateSlidesPerView()
        window.addEventListener('resize', updateSlidesPerView)
    })

    onUnmounted(() => {
        window.removeEventListener('resize', updateSlidesPerView)
    })
</script>