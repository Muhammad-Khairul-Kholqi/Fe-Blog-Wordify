<template>
    <div class="flex justify-center p-3 sm:p-5 mt-5">
        <div class="w-full max-w-[1300px] bg-[#F0F0F0]/40 p-4 sm:p-6 lg:p-8 rounded-2xl">
            <div class="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10">
                <div 
                    v-motion="animation.createDelayedAnimation(animation.slideLeft, 200)"
                    class="w-full lg:w-1/2 order-2 lg:order-1"
                >
                    <img 
                        v-motion="animation.createDelayedAnimation(animation.scaleIn, 700)"
                        :src="AboutIllustration"
                        alt="About Illustration"
                        class="w-full max-w-[500px] lg:max-w-[600px] mx-auto"
                    >
                </div>

                <div 
                    class="w-full lg:w-1/2 space-y-4 lg:space-y-5 order-1 lg:order-2 text-center lg:text-left"
                >
                    <h1 
                        v-motion="animation.createDelayedAnimation(animation.fadeIn, 600)"
                        class="text-gray-700 tracking-wider font-medium text-sm sm:text-base"
                    >
                        ABOUT WORDIFY
                    </h1>
                    
                    <h2 
                        v-motion="animation.createDelayedAnimation(animation.slideUp, 800)"
                        class="bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight"
                    >
                        Your space to explore <br class="hidden sm:block">stories and ideas
                    </h2>
                    
                    <p 
                        v-motion="animation.createDelayedAnimation(animation.slideUp, 1000)"
                        class="text-gray-700 text-sm sm:text-base leading-relaxed px-2 lg:px-0"
                    >
                        Wordify is a blog that brings together writings from a wide range of topics — 
                        from practical tips and everyday experiences to creative inspiration. 
                        We believe every word has meaning and every story deserves to be shared. 
                        Here, you'll discover fresh ideas, new perspectives, and stories that both entertain and inspire.
                    </p>
                    
                    <div 
                        v-motion="animation.createDelayedAnimation(animation.slideUp, 1200)"
                        class="mt-6 lg:mt-7 flex justify-center lg:justify-start"
                    >
                        <RouterLink 
                            v-motion="{ ...animation.createDelayedAnimation(animation.scaleIn, 1400), ...animation.hoverScale }"
                            to="/blog"
                            class="bg-gradient-to-r from-purple-500 to-purple-700 px-5 py-2 rounded-md text-white inline-flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/25"
                        >
                            <span class="text-center font-medium">Get started</span>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { RouterLink } from "vue-router"
    import AboutIllustration from "../../../assets/aboutIllustration.png"
    import * as animation from '../../molecules/animation'
</script>