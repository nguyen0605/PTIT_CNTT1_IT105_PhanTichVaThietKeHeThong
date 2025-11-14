import { useMemo, useState } from 'react'
import './App.css'

type OrderStatus = 'processing' | 'completed' | 'cancelled'

type Order = {
  code: string
  customer: string
  status: OrderStatus
}

const ORDER_DATA: Order[] = [
  { code: 'DH-0001', customer: 'Nguyen Van An', status: 'processing' },
  { code: 'DH-0002', customer: 'Tran Thi Bich', status: 'completed' },
  { code: 'DH-0003', customer: 'Pham Quang Huy', status: 'cancelled' },
  { code: 'DH-0004', customer: 'Le Minh Chau', status: 'completed' },
  { code: 'DH-0005', customer: 'Dang Khoa', status: 'processing' },
  { code: 'DH-0006', customer: 'Luu Thi My', status: 'completed' },
  { code: 'DH-0007', customer: 'Ngo Van Truong', status: 'processing' },
  { code: 'DH-0008', customer: 'Vo Hoang Yen', status: 'cancelled' },
  { code: 'DH-0009', customer: 'Pham Bao Nam', status: 'completed' },
  { code: 'DH-0010', customer: 'Truong Thi Dao', status: 'processing' },
  { code: 'DH-0011', customer: 'Nguyen Hai Dang', status: 'completed' },
  { code: 'DH-0012', customer: 'Bui Kieu Anh', status: 'processing' },
  { code: 'DH-0013', customer: 'Ly Hoai Nam', status: 'cancelled' },
  { code: 'DH-0014', customer: 'Nguyen Thi Mai', status: 'completed' },
  { code: 'DH-0015', customer: 'Pham Anh Dung', status: 'processing' },
  { code: 'DH-0016', customer: 'Do Ha Vy', status: 'completed' },
  { code: 'DH-0017', customer: 'Le Hoang Tu', status: 'processing' },
  { code: 'DH-0018', customer: 'Tran Gia Phuc', status: 'cancelled' },
]

const STATUS_TEXT: Record<OrderStatus, string> = {
  processing: 'Dang xu ly',
  completed: 'Hoan thanh',
  cancelled: 'Huy',
}

const ITEMS_PER_PAGE = 10

function App() {
  const [page, setPage] = useState(1)

  const totalPages = useMemo(
    () => Math.ceil(ORDER_DATA.length / ITEMS_PER_PAGE),
    []
  )

  const pageOrders = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE
    return ORDER_DATA.slice(start, start + ITEMS_PER_PAGE)
  }, [page])

  const handlePrev = () => {
    setPage((prev) => Math.max(1, prev - 1))
  }

  const handleNext = () => {
    setPage((prev) => Math.min(totalPages, prev + 1))
  }

  return (
    <main className="orders-page">
      <header className="page-header">
        <p className="eyebrow">Dashboard / Quan ly don hang</p>
        <h1>Danh sach don hang khach hang</h1>
        <p className="lead">
          Theo doi trang thai don hang theo thoi gian thuc, moi trang hien thi toi da
          10 don hang de dam bao de doc va de tac nghiep.
        </p>
      </header>

      <section className="table-card">
        <div className="table-card__head">
          <div>
            <h2>Thong tin don hang</h2>
            <p>{ORDER_DATA.length} don gan day</p>
          </div>
          <button type="button" className="ghost-btn">
            Xuat bao cao
          </button>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Ma don</th>
                <th>Ten khach</th>
                <th>Trang thai</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pageOrders.map((order, index) => (
                <tr key={order.code}>
                  <td>{(page - 1) * ITEMS_PER_PAGE + index + 1}</td>
                  <td className="mono">{order.code}</td>
                  <td>{order.customer}</td>
                  <td>
                    <span className={`status-pill status-${order.status}`}>
                      {STATUS_TEXT[order.status]}
                    </span>
                  </td>
                  <td>
                    <button type="button" className="detail-btn">
                      Chi tiet
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button
            type="button"
            onClick={handlePrev}
            disabled={page === 1}
          >
            Trang truoc
          </button>
          <p>
            Trang <strong>{page}</strong> / {totalPages}
          </p>
          <button
            type="button"
            onClick={handleNext}
            disabled={page === totalPages}
          >
            Trang sau
          </button>
        </div>
      </section>
    </main>
  )
}

export default App
