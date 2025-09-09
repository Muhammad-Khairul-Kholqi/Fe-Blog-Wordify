<template>
    <footer class="flex py-10 px-5 mt-5 justify-center border-t border-gray-200">
        <div class="w-full max-w-[1300px]">
            <div class="flex items-center justify-center gap-2">
                <img :src="MainLogo" alt="Logo Wordify" class="w-[30px]">
                <span class="font-semibold tracking-wide text-sm">WORDIFY</span>
            </div>
            <p class="text-center mt-2 text-gray-500">Find Inspiration from Various Interesting Topics</p>
            <p class="text-center text-gray-600 mt-2">Copyright {{ currentYear }} © by Ruang Raya</p>
        </div>
    </footer>
</template>

<script setup>
    import MainLogo from "../../assets/mainLogo.png"

    const currentYear = new Date().getFullYear()
</script>
