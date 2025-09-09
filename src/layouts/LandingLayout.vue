<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-1 mt-[80px]">
      <router-view />
    </main>
    <MainFooter />
  </div>
</template>

<script setup>
  import Navbar from "../components/global/Navbar.vue"
  import MainFooter from "../components/global/MainFooter.vue"
</script>
