import React, { useMemo, useState } from 'react'
import './App.css'
import FilterSidebar, { Filters } from './components/FilterSidebar'
import ProductList from './components/ProductList'
import { products as allProducts, Product } from './data/products'

function App() {
  const [filters, setFilters] = useState<Filters | null>(null)

  const categories = useMemo(() => {
    const s = new Set<string>()
    allProducts.forEach((p) => s.add(p.category))
    return Array.from(s)
  }, [])

  const bounds = useMemo(() => {
    const prices = allProducts.map((p) => p.price)
    return { min: Math.min(...prices), max: Math.max(...prices) }
  }, [])

  function handleApply(f: Filters) {
    setFilters(f)
  }

  function handleClear() {
    setFilters(null)
  }

  const filtered: Product[] = useMemo(() => {
    if (!filters) return allProducts

    let list = allProducts.slice()
    if (filters.category) list = list.filter((p) => p.category === filters.category)
    list = list.filter((p) => p.price >= filters.minPrice && p.price <= filters.maxPrice)

    if (filters.sortBy === 'price_asc') list.sort((a, b) => a.price - b.price)
    if (filters.sortBy === 'price_desc') list.sort((a, b) => b.price - a.price)
    if (filters.sortBy === 'best_seller') list.sort((a, b) => (b.sold || 0) - (a.sold || 0))
    if (filters.sortBy === 'newest') list.sort((a, b) => (new Date(b.createdAt || '').getTime()) - (new Date(a.createdAt || '').getTime()))

    return list
  }, [filters])

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Danh sách sản phẩm</h1>
        <p className="subtitle">Thiết kế bộ lọc: đơn giản — rõ ràng — dễ thao tác</p>
      </header>

      <div className="content">
        <FilterSidebar categories={categories} minLimit={bounds.min} maxLimit={bounds.max} onApply={handleApply} onClear={handleClear} />

        <main className="main-area">
          <div className="toolbar">
            <div className="current-filters">
              {filters ? (
                <>
                  <strong>Đang áp dụng:</strong>
                  <span>{filters.category || 'Tất cả'}</span>
                  <span>• {filters.minPrice.toLocaleString()}₫ - {filters.maxPrice.toLocaleString()}₫</span>
                </>
              ) : (
                <span>Không có bộ lọc</span>
              )}
            </div>
          </div>

          <ProductList products={filtered} />
        </main>
      </div>
    </div>
  )
}

export default App
