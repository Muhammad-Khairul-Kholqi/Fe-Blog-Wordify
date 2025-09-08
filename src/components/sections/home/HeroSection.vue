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
                <div class="flex justify-center">
                    <RouterLink 
                        v-motion="{ ...animation.rightToLeft, ...animation.hoverScale }"
                        to="/blog" 
                        class="border border-gray-200 py-2 px-5 rounded-full flex items-center justify-center gap-2 group"
                    >
                        <span class="text-sm sm:text-base">Start reading</span>
                        <div class="flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-700 h-8 w-8 rounded-full overflow-hidden relative">
                            <ArrowUpRight class="w-5 h-5 text-white transform transition-all duration-300 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-0" />
                            <ArrowUpRight class="w-5 h-5 text-white absolute transform translate-x-[-10px] translate-y-[10px] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                        </div>
                    </RouterLink>
                </div>
            </div>

            <div 
                ref="statsRef"
                v-motion="animation.createDelayedAnimation(animation.slideUp, 1800)"
                class="mt-8 sm:mt-10 flex justify-center"
            >
                <div class="flex flex-col sm:flex-row gap-8 sm:gap-20 lg:gap-25 items-center">
                    <div 
                        v-for="(stat, index) in statistics" 
                        :key="stat.label"
                        v-motion="{ ...animation.createDelayedAnimation(animation.slideUp, 1800 + (index * 150)), ...animation.hoverLift }"
                        class="text-center cursor-default"
                    >
                        <h3 
                            class="font-semibold text-5xl sm:text-5xl text-gray-900"
                        >
                            {{ stat.displayValue }}
                        </h3>
                        <h4 
                            v-motion="animation.createDelayedAnimation(animation.slideUp, 2200 + (index * 150))"
                            class="text-xs sm:text-sm text-gray-600 mt-1 tracking-wider"
                        >
                            {{ stat.label }}
                        </h4>
                    </div>
                </div>
            </div>

            <div 
                v-motion="animation.createDelayedAnimation(animation.bottomToTopDelayed, 2000)"
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
    import { ref, onMounted, onUnmounted } from "vue";
    import * as animation from '../../molecules/animation'; 
    import MainLogo from "../../../assets/mainLogo.png"

    const statsRef = ref(null)

    const statistics = ref([
        {
            value: 75,
            targetValue: "75",
            displayValue: "0",
            label: "BLOGS"
        },
        {
            value: 100000,
            targetValue: "100K",
            displayValue: "0",
            label: "LIKES"
        },
        {
            value: 25,
            targetValue: "25",
            displayValue: "0",
            label: "CATEGORIES"
        }
    ]);

    const animateCounter = (stat, index) => {
        const duration = 2000 
        const delay = 500
        const startTime = Date.now() + delay
        
        const animate = () => {
            const now = Date.now()
            if (now < startTime) {
                requestAnimationFrame(animate)
                return
            }
            
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            
            const easedProgress = 1 - Math.pow(1 - progress, 3)
            
            const currentValue = Math.floor(stat.value * easedProgress)
            
            if (stat.targetValue.includes('K')) {
                stat.displayValue = currentValue >= 1000 ? Math.floor(currentValue/1000) + 'K' : currentValue.toString()
            } else {
                stat.displayValue = currentValue.toString()
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate)
            } else {
                stat.displayValue = stat.targetValue 
            }
        }
        
        requestAnimationFrame(animate)
    }

    let observer = null

    onMounted(() => {
        if (statsRef.value) {
            observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            statistics.value.forEach((stat, index) => {
                                animateCounter(stat, index)
                            })
                            observer.disconnect() 
                        }
                    })
                },
                { threshold: 0.5 }
            )
            observer.observe(statsRef.value)
        }
    })

    onUnmounted(() => {
        if (observer) {
            observer.disconnect()
        }
    })
</script>