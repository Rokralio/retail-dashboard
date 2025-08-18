<template>
  <main class="p-6 max-w-6xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Tablero de Control - Retail (Venezuela)</h1>

    <Stats :total="filteredProducts.length" :categories="uniqueCategories" :avgUSD="avgPriceUSD" />

    <section class="my-4">
      <Filters :categories="categories" :value="filters" @update="onFiltersUpdate" />
    </section>

    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <ProductCard 
        v-for="(p, index) in paginatedProducts" 
        :key="p.id" 
        :product="p" 
        :exchangeRate="exchangeRate || 1"
        :style="`animation-delay: ${index * 0.1}s`"
        class="animate-fade-in"
      />
    </section>

    <div class="mt-4">
      <Pagination :currentPage="page" :totalPages="totalPages" @change="setPage" />
    </div>

    <div v-if="loading" class="mt-4">Cargando...</div>
    <div v-if="error" class="mt-4 text-red-600">Error: {{ error }}</div>
  </main>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { fetchProducts, fetchCategories, fetchExchangeRate } from './services/products'
import ProductCard from './components/ProductCard.vue'
import Pagination from './components/Pagination.vue'
import Filters from './components/Filters.vue'
import Stats from './components/Stats.vue'

export default {
  components: { ProductCard, Pagination, Filters, Stats },
  setup() {
    const products = ref([])
    const categories = ref([])
    const exchangeRate = ref(1) // VES por USD
    const loading = ref(true)
    const error = ref(null)

    // filtros y paginación
    const filters = ref({ category: 'all', min: 0, max: 0, search: '' })
    const page = ref(1)
    const perPage = 5

    onMounted(async () => {
      loading.value = true
      try {
        const [prods, cats, rate] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
          fetchExchangeRate('bcv')
        ])
        products.value = prods || []
        categories.value = cats || []
        exchangeRate.value = rate || 1 // si falla, usamos 1 para que la app siga funcionando
        // set default max price filter to global max
        const prices = products.value.map(p => p.price)
        filters.value.max = Math.max(...prices, 0)
      } catch (err) {
        error.value = err.message || 'Error al cargar datos'
      } finally {
        loading.value = false
      }
    })

    const filteredProducts = computed(() => {
      let res = products.value.slice()
      const { category, min, max, search } = filters.value
      
      if (category && category !== 'all') {
        res = res.filter(p => p.category === category)
      }
      const minP = Number(min ?? 0)
      const maxP = Number(max ?? Infinity)
      res = res.filter(p => p.price >= minP && p.price <= (maxP || Infinity))

      if (search && search.trim()) {
        const term = search.trim().toLowerCase()
        res = res.filter(p => p.title.toLowerCase().includes(term))
      }

      return res
    })

    const uniqueCategories = computed(() => {
      return new Set(products.value.map(p => p.category)).size
    })

    const avgPriceUSD = computed(() => {
      const arr = filteredProducts.value
      if (!arr.length) return 0
      const sum = arr.reduce((s, p) => s + Number(p.price || 0), 0)
      return sum / arr.length
    })

    const totalPages = computed(() => Math.max(1, Math.ceil(filteredProducts.value.length / perPage)))

    const paginatedProducts = computed(() => {
      const start = (page.value - 1) * perPage
      return filteredProducts.value.slice(start, start + perPage)
    })

    function setPage(n) {
      page.value = n
      // guardar en localStorage (opcional)
      localStorage.setItem('dashboard.page', String(n))
    }

    function onFiltersUpdate(obj) {
      filters.value = { ...filters.value, ...obj }
      page.value = 1 // reset page when filters change
      localStorage.setItem('dashboard.filters', JSON.stringify(filters.value))
    }

    return {
      products,
      categories,
      exchangeRate,
      loading,
      error,
      filters,
      page,
      paginatedProducts,
      totalPages,
      setPage,
      onFiltersUpdate,
      filteredProducts,
      uniqueCategories,
      avgPriceUSD
    }
  }
}
</script>
