<template>
  <nav class="fixed top-0 left-0 right-0 z-50">
    <div class="flex justify-center p-5 border-b border-gray-200">
      <div class="w-full max-w-[1300px]">
        <div class="flex items-center justify-between">
          <RouterLink to="/" class="tracking-wider font-semibold">
            WORDIFY
          </RouterLink>

          <ul class="hidden md:flex items-center gap-5">
            <li v-for="item in navItems" :key="item.name">
              <RouterLink 
                :to="item.path" 
                class="font-medium text-gray-700 hover:text-black transition-colors duration-200"
              >
                {{ item.name }}
              </RouterLink>
            </li>
          </ul>   

          <button 
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors z-50 relative"
          >
            <Menu v-if="!isMobileMenuOpen" :size="25" />
            <X v-else :size="24" />
          </button>
        </div>
      </div>
    </div>

    <div 
      v-if="isMobileMenuOpen"
      class="fixed inset-0 bg-black/40 z-40 md:hidden"
      @click="closeMobileMenu"></div>

    <div 
      class="fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden"
      :class="isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <div class="flex items-center justify-between p-5 border-b border-gray-200">
        <span class="font-semibold text-lg">Menu</span>
        <button 
          @click="closeMobileMenu"
          class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X :size="20" />
        </button>
      </div>

      <ul class="flex flex-col p-5 gap-2">
        <li v-for="item in navItems" :key="item.name">
          <RouterLink 
            :to="item.path" 
            @click="closeMobileMenu"
            class="flex items-center gap-3 py-3 px-4 font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-colors duration-200"
          >
            <component :is="item.icon" :size="20" />
            {{ item.name }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Menu, X, Home, User, BookOpen, Mail } from 'lucide-vue-next'

const isMobileMenuOpen = ref(false)

const navItems = ref([
  {
    name: 'Home',
    path: '/',
    icon: Home
  },
  {
    name: 'About',
    path: '/about',
    icon: User
  },
  {
    name: 'Blog',
    path: '/blog',
    icon: BookOpen
  },
  {
    name: 'Contact',
    path: '/contact',
    icon: Mail
  }
])

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>