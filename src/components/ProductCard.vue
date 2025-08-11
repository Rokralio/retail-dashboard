<template>
  <article class="border rounded p-3 shadow-sm" role="article" :aria-label="product.title">
    <img :src="product.image" :alt="product.title" loading="lazy" class="w-full h-48 object-contain mb-2" />
    <h3 class="font-semibold text-sm mb-1">{{ product.title }}</h3>
    <p class="text-xs text-gray-500 capitalize">{{ product.category }}</p>
    <div class="mt-2">
      <div class="text-lg font-medium">{{ formatUSD(product.price) }}</div>
      <div class="text-sm text-gray-700">{{ formatVES(product.price * exchangeRate) }}</div>
    </div>
  </article>
</template>

<script>
import { formatUSD, formatVES } from '../utils/formatters'

export default {
  name: 'ProductCard',
  props: {
    product: { type: Object, required: true },
    exchangeRate: { type: Number, required: true }
  },
  setup(props) {
    return {
      formatUSD,
      formatVES
    }
  }
}
</script>
