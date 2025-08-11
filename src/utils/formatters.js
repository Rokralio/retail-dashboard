export function formatUSD(n) {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)
  } catch {
    return '$' + Number(n).toFixed(2)
  }
}

// Formato venezolano: 1.000,00 Bs
export function formatVES(n) {
  const v = Number(n || 0)
  const parts = v.toFixed(2).split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `${parts[0]},${parts[1]} Bs`
}
