import React from 'react'
import { Product } from '../data/products'

type Props = {
  products: Product[]
}

export default function ProductList({ products }: Props) {
  if (!products.length) return <div className="empty">Không có sản phẩm phù hợp.</div>

  return (
    <section className="product-list">
      <div className="grid">
        {products.map((p) => (
          <article key={p.id} className="card product-card" aria-label={p.name}>
            <div className="thumb">📦</div>
            <h4 className="product-name">{p.name}</h4>
            <div className="product-meta">{p.category} • {p.sold ? `${p.sold} bán` : ''}</div>
            <div className="product-price">{p.price.toLocaleString()}₫</div>
          </article>
        ))}
      </div>
    </section>
  )
}
