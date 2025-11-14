import React from 'react'
import './Dashboard.css'
import { Bar, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend)

const Dashboard: React.FC = () => {
  const totalUsers = 12458

  const revenueLabels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6']
  const revenueData = {
    labels: revenueLabels,
    datasets: [
      {
        label: 'Doanh thu',
        data: [12000, 15000, 14000, 18000, 22000, 20000],
        backgroundColor: '#4f46e5',
      },
    ],
  }

  const revenueOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
  }

  const regionData = {
    labels: ['Miền Bắc', 'Miền Nam', 'Miền Trung', 'Khác'],
    datasets: [
      {
        data: [35, 30, 25, 10],
        backgroundColor: ['#06b6d4', '#f59e0b', '#ef4444', '#10b981'],
      },
    ],
  }

  const orders = [
    { id: 'OD-1001', name: 'Nguyễn Văn A', status: 'Đang xử lý', date: '2025-11-10' },
    { id: 'OD-1002', name: 'Trần Thị B', status: 'Hoàn thành', date: '2025-11-09' },
    { id: 'OD-1003', name: 'Lê Văn C', status: 'Hủy', date: '2025-11-08' },
    { id: 'OD-1004', name: 'Phạm Thị D', status: 'Giao hàng', date: '2025-11-07' },
  ]

  const statusClass = (s: string) => {
    switch (s) {
      case 'Hoàn thành':
        return 'badge success'
      case 'Đang xử lý':
        return 'badge warning'
      case 'Giao hàng':
        return 'badge info'
      case 'Hủy':
        return 'badge danger'
      default:
        return 'badge'
    }
  }

  return (
    <div className="dashboard-root">
      <h2 className="dashboard-title">Dashboard quản trị</h2>
      <div className="dashboard-grid">
        <div className="card stats-card">
          <div className="stat-label">Tổng số người dùng</div>
          <div className="stat-value">{totalUsers.toLocaleString()}</div>
          <div className="stat-note">Người dùng đăng ký/đang hoạt động</div>
        </div>

        <div className="card region-card">
          <h4>Người dùng theo khu vực</h4>
          <div className="chart small">
            <Pie data={regionData} />
          </div>
        </div>

        <div className="card revenue-card">
          <h4>Biểu đồ doanh thu</h4>
          <div className="chart large">
            <Bar data={revenueData} options={revenueOptions} />
          </div>
        </div>

        <div className="card orders-card">
          <h4>Danh sách đơn hàng gần đây</h4>
          <div className="table-wrap">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Tên khách</th>
                  <th>Trạng thái</th>
                  <th>Ngày tạo</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td className="mono">{o.id}</td>
                    <td>{o.name}</td>
                    <td>
                      <span className={statusClass(o.status)}>{o.status}</span>
                    </td>
                    <td>{o.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
