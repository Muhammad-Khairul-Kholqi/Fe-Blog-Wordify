<template>
  <div>
    <Navbar />
    <main class="mt-[80px]">
      <router-view />
    </main>
    <MainFooter />
  </div>
</template>

<script setup>
  import Navbar from "../components/global/Navbar.vue"
  import MainFooter from "../components/global/MainFooter.vue"
</script>
