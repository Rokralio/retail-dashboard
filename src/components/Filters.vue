<template>
  <div class="space-y-2">
    <div class="space-y-2">
      <label class="block">
        Buscar producto:
        <input
          type="text"
          v-model="localSearch"
          @input="apply"
          placeholder="Escribe un nombre..."
          class="border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
        />
      </label>
      <label class="block">
        Categoría
        <select
          v-model="localCategory"
          @change="apply"
          class="border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">Todas</option>
          <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
        </select>
      </label>
    </div>

    <div class="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
  <label class="flex-1 block">
    Precio mínimo (USD)
    <input
      type="number"
      v-model.number="localMin"
      @change="apply"
      class="border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
    />
  </label>

  <label class="flex-1 block">
    Precio máximo (USD)
    <input
      type="number"
      v-model.number="localMax"
      @change="apply"
      class="border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
    />
  </label>
</div>

  </div>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  props: { categories: Array, value: Object },
  emits: ['update'],
  setup(props, { emit }) {
    const localCategory = ref(props.value.category ?? 'all')
    const localMin = ref(props.value.min ?? 0)
    const localMax = ref(props.value.max ?? 0)
    const localSearch = ref(props.value.search ?? '')

    function apply() {
      emit('update', {
        category: localCategory.value,
        min: localMin.value,
        max: localMax.value,
        search: localSearch.value
      })
    }

    return { localCategory, localMin, localMax,localSearch, apply }
  }
}
</script>
