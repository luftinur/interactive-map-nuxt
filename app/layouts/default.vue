<template>
  <div class="relative w-screen h-screen">
    <header class="absolute top-0 left-0 w-auto bg-blue-600 text-white p-4 z-10 rounded-br-3xl">
      <h1 class="font-bold">Jakarta Tourism</h1>
    </header>

    <main>
      <slot />
    </main>

    <footer class="absolute bottom-0 left-0 w-full sm:w-auto bg-transparent text-gray-800 p-0 z-10  ">
      <p class="bg-white p-1 text-center md:text-left text-sm">
          &copy; <NuxtTime :datetime="Date.now()" year="numeric"/> - 
          Jakarta Tourism Interactive Map with <NuxtLink to="https://nuxt.com/" target="_blank"> <br class="hidden sm:block md:hidden" />  <img src="/icon-green.svg" alt="Nuxt" class="w-5 h-auto inline" /></NuxtLink> by <NuxtLink to="https://www.luftinurfahmi.net" target="_blank">  www.luftinurfahmi.net</NuxtLink>
      </p>
    </footer>
  </div>
</template>
