import React, { useState } from 'react'

export type Filters = {
  category: string
  minPrice: number
  maxPrice: number
  sortBy: string
}

type Props = {
  categories: string[]
  minLimit?: number
  maxLimit?: number
  onApply: (f: Filters) => void
  onClear: () => void
}

export default function FilterSidebar({ categories, minLimit = 0, maxLimit = 1000, onApply, onClear }: Props) {
  const [category, setCategory] = useState('')
  const [minPrice, setMinPrice] = useState(minLimit)
  const [maxPrice, setMaxPrice] = useState(maxLimit)
  const [sortBy, setSortBy] = useState('')

  function apply() {
    onApply({ category, minPrice, maxPrice, sortBy })
  }

  function clearAll() {
    setCategory('')
    setMinPrice(minLimit)
    setMaxPrice(maxLimit)
    setSortBy('')
    onClear()
  }

  return (
    <aside className="filter-sidebar" aria-label="Bộ lọc sản phẩm">
      <h3 className="filter-title">Bộ lọc <span aria-hidden>🧩</span></h3>

      <label className="filter-label">
        <span className="label-text">Danh mục</span>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Tất cả</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>

      <div className="filter-group">
        <div className="filter-label">
          <span className="label-text">Khoảng giá</span>
        </div>
        <div className="price-inputs">
          <label>
            <span className="sr">Giá thấp nhất</span>
            <input type="number" min={minLimit} max={maxLimit} value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))} />
          </label>
          <label>
            <span className="sr">Giá cao nhất</span>
            <input type="number" min={minLimit} max={maxLimit} value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))} />
          </label>
        </div>

        <div className="range-sliders">
          <input type="range" min={minLimit} max={maxLimit} value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))} />
          <input type="range" min={minLimit} max={maxLimit} value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))} />
        </div>
      </div>

      <label className="filter-label">
        <span className="label-text">Sắp xếp theo</span>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Mặc định</option>
          <option value="price_asc">Giá tăng dần</option>
          <option value="price_desc">Giá giảm dần</option>
          <option value="best_seller">Bán chạy nhất</option>
          <option value="newest">Mới nhất</option>
        </select>
      </label>

      <div className="filter-actions">
        <button className="btn primary" onClick={apply} aria-label="Áp dụng bộ lọc">Lọc</button>
        <button className="btn secondary" onClick={clearAll} aria-label="Xóa bộ lọc">❌ Xóa lọc</button>
      </div>
    </aside>
  )
}
