import { api, pydolarApi } from './api'

export async function fetchProducts() {
  const res = await api.get('/products')
  return res.data
}

export async function fetchCategories() {
  const res = await api.get('/products/categories')
  return res.data
}

/**
 * Devuelve la tasa (VES por 1 USD) usando pyDolarVenezuela.
 * Por ejemplo: GET /api/v2/dollar?page=bcv
 * Los datos pueden variar; parseamos defensivamente.
 */
export async function fetchExchangeRate(monitor = 'bcv') {
  try {
    const res = await pydolarApi.get('/api/v2/dollar', { params: { page: monitor } })
    const data = res.data
    // docs indican que la respuesta tiene `monitors` -> buscar un price dentro.
    if (data && data.monitors) {
      const values = Object.values(data.monitors)
      const candidate = values.find(v => v && (v.price || v.value)) || values[0]
      if (candidate) return Number(candidate.price ?? candidate.value ?? 0)
    }
    // fallbacks
    if (data && data.price) return Number(data.price)
  } catch (err) {
    console.error('Error fetching exchange rate', err)
  }
  return null
}
