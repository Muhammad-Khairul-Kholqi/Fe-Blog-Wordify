<template>
    <div class="flex justify-center p-5">
        <div class="w-full max-w-[1300px]">
            <div class="flex justify-center">
                <div class="flex items-center gap-2">
                    <img 
                        v-motion="animation.createDelayedAnimation(animation.slideLeft, 100)"
                        :src="MainLogo"
                        alt="Logo Wordify"
                        class="w-[40px]"
                    >
                    <span 
                        v-motion="animation.createDelayedAnimation(animation.slideRight, 100)"
                        class="font-semibold tracking-wide"
                    >
                        WORDIFY
                    </span>
                </div>
            </div>

            <div class="text-center mt-5">
                <h1 
                    v-motion="animation.bottomToTop"
                    class="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight"
                >
                    Find Inspiration from <br class="hidden sm:block">
                    Various <span v-motion="animation.centerScale" class="bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent font-bold">Interesting Topics</span>
                </h1>
                
                <div 
                    v-motion="animation.bottomToTopDelayed"
                    class="flex justify-center mt-4 sm:mt-5"
                >
                    <p class="text-center w-full max-w-[700px] text-sm sm:text-base text-gray-600 px-4">
                        Explore engaging articles that explore new ideas, experiences, and insights. From practical tips to inspiring stories, this blog is here to inspire and entertain every reader.
                    </p>
                </div>
            </div>

            <div 
                v-motion="animation.createDelayedAnimation(animation.slideUp, 1000)"
                class="mt-6 sm:mt-8 lg:mt-10 flex justify-center"
            >
                <div class="w-full max-w-[600px] px-4">
                    <div class="flex flex-col sm:flex-row gap-3 sm:gap-3 items-center justify-center">
                        <RouterLink 
                            v-motion="{ ...animation.rightToLeft, ...animation.hoverScale }"
                            to="" 
                            class="w-full sm:w-auto sm:max-w-[40%] border border-gray-200 py-2 px-5 rounded-full flex items-center justify-center gap-2 group"
                        >
                            <span class="text-sm sm:text-base">Start reading</span>
                            <div class="flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-700 h-8 w-8 rounded-full overflow-hidden relative">
                                <ArrowUpRight class="w-5 h-5 text-white transform transition-all duration-300 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-0" />
                                <ArrowUpRight class="w-5 h-5 text-white absolute transform translate-x-[-10px] translate-y-[10px] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                            </div>
                        </RouterLink>

                        <div 
                            v-motion="{ ...animation.leftToRight, ...animation.hoverGlow }"
                            class="w-full sm:max-w-[60%] border border-gray-200 px-4 sm:px-5 py-3 rounded-full flex items-center gap-2"
                        >
                            <Search 
                                v-motion="animation.rotateEntry"
                                class="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" 
                            />
                            <input 
                                v-motion="animation.fadeEntry"
                                type="text"
                                class="w-full outline-none text-sm sm:text-base"
                                placeholder="Search blog"
                            >
                        </div>
                    </div>
                </div>
            </div>

            <div 
                v-motion="animation.createDelayedAnimation(animation.slideUp, 1800)"
                class="mt-8 sm:mt-10 flex justify-center"
            >
                <div class="flex flex-col sm:flex-row gap-8 sm:gap-20 lg:gap-25 items-center">
                    <div 
                        v-for="(stat, index) in statistics" 
                        :key="stat.label"
                        v-motion="{ ...animation.createStatAnimation(index).container, ...animation.hoverLift }"
                        class="text-center cursor-default"
                    >
                        <h3 
                            v-motion="animation.createStatAnimation(index).number"
                            class="font-semibold text-5xl sm:text-5xl text-gray-900"
                        >
                            {{ stat.value }}
                        </h3>
                        <h4 
                            v-motion="animation.createStatAnimation(index).label"
                            class="text-xs sm:text-sm text-gray-600 mt-1 tracking-wider"
                        >
                            {{ stat.label }}
                        </h4>
                    </div>
                </div>
            </div>

            <div 
                v-motion="animation.createDelayedAnimation(animation.bottomToTopDelayed, 2500)"
                class="flex justify-center mt-10"
            >
                <Mouse class="w-8 h-8 text-gray-500 animate-bounce" />
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ArrowUpRight, Search, Mouse } from "lucide-vue-next";
    import { RouterLink } from "vue-router";
    import { ref } from "vue";
    import * as animation from '../../molecules/animation'; 
    import MainLogo from "../../../assets/mainLogo.png"

    const statistics = ref([
        {
            value: "75",
            label: "BLOGS"
        },
        {
            value: "100K",
            label: "LIKES"
        },
        {
            value: "25",
            label: "CATEGORIES"
        }
    ]);
</script>