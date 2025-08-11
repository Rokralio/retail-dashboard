<template>
  <nav aria-label="Paginación" class="flex items-center gap-2">
    <button :disabled="currentPage<=1" @click="$emit('change', currentPage-1)">Anterior</button>
    <button
      v-for="p in pages"
      :key="p"
      :aria-current="p===currentPage ? 'page' : null"
      @click="$emit('change', p)"
      :class="p===currentPage ? 'font-bold' : ''"
    >{{ p }}</button>
    <button :disabled="currentPage>=totalPages" @click="$emit('change', currentPage+1)">Siguiente</button>
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
