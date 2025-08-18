<template>
  <nav aria-label="Paginación" class="flex items-center gap-2">
    <button 
      :disabled="currentPage<=1" 
      @click="$emit('change', currentPage-1)"
      class="px-3 py-1 rounded transition-all duration-200 hover:bg-gray-100 disabled:opacity-50"
    >
      Anterior
    </button>
    <button
      v-for="p in pages"
      :key="p"
      :aria-current="p===currentPage ? 'page' : null"
      @click="$emit('change', p)"
      class="px-3 py-1 rounded transition-all duration-200"
      :class="{
        'bg-blue-500 text-white': p === currentPage,
        'hover:bg-gray-100': p !== currentPage
      }"
    >
      {{ p }}
    </button>
    <button 
      :disabled="currentPage>=totalPages" 
      @click="$emit('change', currentPage+1)"
      class="px-3 py-1 rounded transition-all duration-200 hover:bg-gray-100 disabled:opacity-50"
    >
      Siguiente
    </button>
  </nav>
</template>

<script>
export default {
  props: { currentPage: Number, totalPages: Number },
  computed: {
    pages() {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1)
    }
  }
}
</script>
