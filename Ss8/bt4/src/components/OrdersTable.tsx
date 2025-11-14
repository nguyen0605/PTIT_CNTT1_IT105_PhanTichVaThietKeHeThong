import React, { useMemo, useState } from 'react'
import './OrdersTable.css'

type OrderStatus = 'completed' | 'processing' | 'cancelled'

type Order = {
  id: number
  code: string
  customer: string
  status: OrderStatus
}

const makeMockOrders = (n: number): Order[] => {
  const statuses: OrderStatus[] = ['processing', 'completed', 'cancelled']
  const names = [
    'Nguyễn Văn A',
    'Trần Thị B',
    'Lê Văn C',
    'Phạm Thị D',
    'Hoàng Anh',
    'Vũ Minh',
    'Đỗ Lan',
    'Bùi Tùng',
    'Ngô Huy',
    'Trịnh Hoa',
  ]
  return Array.from({ length: n }).map((_, i) => ({
    id: i + 1,
    code: `DH${(1000 + i).toString().padStart(4, '0')}`,
    customer: names[i % names.length],
    status: statuses[i % statuses.length],
  }))
}

const statusLabel = (s: OrderStatus) => {
  switch (s) {
    case 'completed':
      return 'Hoàn thành'
    case 'processing':
      return 'Đang xử lý'
    case 'cancelled':
      return 'Hủy'
  }
}

export default function OrdersTable() {
  const allOrders = useMemo(() => makeMockOrders(25), [])
  const pageSize = 10
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(allOrders.length / pageSize)

  const pageOrders = allOrders.slice((page - 1) * pageSize, page * pageSize)

  const handlePrev = () => setPage((p) => Math.max(1, p - 1))
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1))

  const showDetails = (order: Order) => {
    // simple detail view for demo; replace with modal/routing as needed
    alert(`Chi tiết đơn:\nMã: ${order.code}\nKhách: ${order.customer}\nTrạng thái: ${statusLabel(order.status)}`)
  }

  return (
    <div className="orders-wrapper">
      <h2>Danh sách đơn hàng</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã đơn</th>
            <th>Tên khách</th>
            <th>Trạng thái</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {pageOrders.map((o, idx) => (
            <tr key={o.id}>
              <td className="cell-center">{(page - 1) * pageSize + idx + 1}</td>
              <td className="cell-left">{o.code}</td>
              <td className="cell-left">{o.customer}</td>
              <td className="cell-center">
                <span className={`status-badge status-${o.status}`}>{statusLabel(o.status)}</span>
              </td>
              <td className="cell-center">
                <button className="detail-btn" onClick={() => showDetails(o)}>Chi tiết</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={handlePrev} disabled={page === 1} className="page-btn">Trang trước</button>
        <span className="page-info">{page} / {totalPages}</span>
        <button onClick={handleNext} disabled={page === totalPages} className="page-btn">Trang sau</button>
      </div>
    </div>
  )
}
