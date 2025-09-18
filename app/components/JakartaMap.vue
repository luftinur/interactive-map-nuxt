<template>

  <!-- Preloader -->
  <div v-if="preloader" class="fixed inset-0 flex items-center justify-center bg-white z-20">
    <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>

  <!-- Map Container -->
  <div class="fixed inset-0 z-0" ref="mapContainer"></div>

  <!-- Offcanvas -->
  <div
    v-if="dialog.visible"
    class="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-96 dark:bg-gray-800"
    :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
  >
    <h3 class="font-bold text-lg">Data Kunjungan Wisata</h3>
    <hr class="my-2" />
    <button @click="close"
      type="button"
      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
    >
      <svg
        class="w-3 h-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
      <span class="sr-only">Close menu</span>
    </button>
    <div class="py-4 overflow-y-auto">


       <ul>
        <li><strong class="text-blue-600">Lokasi : </strong> {{dialog.data.name}} </li>
        <li><strong class="text-blue-600">Kategori : </strong> {{dialog.data.category}} </li>
      </ul>     


      <p class="py-2 text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum
        risus ut augue hendrerit, luctus egestas neque vehicula. Duis eget
        rhoncus arcu. Aenean mauris mi, vehicula vitae ligula convallis,
        interdum scelerisque mi.
      </p>
      <ChartVisitor
        class="mb-5"
        v-if="dialog.visible"
        :title="dialog.data.name"
        :category="dialog.data.category"
        :data="Object.values(dialog.data.visitors)"
        :categories="Object.keys(dialog.data.visitors)"
      />

      <ChartPie
        v-if="dialog.visible"
        :title="dialog.data.name"
        :citizens="dialog.data.citizens"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useJakartaMap } from "~/composables/useJakartaMap";
import ChartVisitor from "~/components/ChartVisitor.vue";
import ChartPie from "~/components/ChartPie.vue";

const mapContainer = ref<HTMLDivElement | null>(null);
const { preloader, dialog } = useJakartaMap(mapContainer);

const isOpen = ref(false);
watch(
  () => dialog.visible,
  (val) => {
    if (val) {
      requestAnimationFrame(() => {
        isOpen.value = true;
      });
    } else {
      isOpen.value = false;
    }
  }
);
function close() {
  isOpen.value = false;
  setTimeout(() => (dialog.visible = false), 300); // delay biar animasi sempet jalan
}
</script>
