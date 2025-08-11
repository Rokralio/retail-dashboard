<template>
  <div class="flex gap-4">
    <div><strong>Total:</strong> {{ total }}</div>
    <div><strong>Categorías:</strong> {{ categories }}</div>
    <div><strong>Promedio (USD):</strong> {{ avgUSDLabel }}</div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { formatUSD } from '../utils/formatters'

export default {
  props: { total: Number, categories: Number, avgUSD: Number },
  setup(props) {
    const avgUSDLabel = computed(() => formatUSD(props.avgUSD || 0))
    return { avgUSDLabel }
  }
}
</script>
