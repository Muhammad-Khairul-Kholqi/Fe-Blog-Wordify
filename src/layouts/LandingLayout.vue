<template>
  <div>
    <Navbar />
    <main class="mt-[80px]">
      <router-view />
    </main>
  </div>
</template>

<script setup>
  import Navbar from "../components/global/Navbar.vue"
</script>
