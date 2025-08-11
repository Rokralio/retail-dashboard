<template>
  <div class="space-y-2">
    <label>
      Categoría
      <select v-model="localCategory" @change="apply">
        <option value="all">Todas</option>
        <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
      </select>
    </label>

    <div>
      <label>Precio mínimo (USD)
        <input type="number" v-model.number="localMin" @change="apply" />
      </label>
      <label>Precio máximo (USD)
        <input type="number" v-model.number="localMax" @change="apply" />
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

    function apply() {
      emit('update', { category: localCategory.value, min: localMin.value, max: localMax.value })
    }

    return { localCategory, localMin, localMax, apply }
  }
}
</script>
