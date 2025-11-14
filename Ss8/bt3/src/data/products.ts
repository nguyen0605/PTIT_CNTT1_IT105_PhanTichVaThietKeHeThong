export type Product = {
  id: string
  name: string
  category: string
  price: number
  sold?: number
  createdAt?: string
}

export const products: Product[] = [
  { id: 'p1', name: 'Áo thun nam basic', category: 'Quần áo', price: 199000, sold: 120, createdAt: '2025-10-01' },
  { id: 'p2', name: 'Tai nghe Bluetooth', category: 'Điện tử', price: 499000, sold: 340, createdAt: '2025-11-01' },
  { id: 'p3', name: 'Sách: Lập trình React', category: 'Sách', price: 150000, sold: 85, createdAt: '2025-09-15' },
  { id: 'p4', name: 'Áo khoác nữ', category: 'Quần áo', price: 599000, sold: 60, createdAt: '2025-10-20' },
  { id: 'p5', name: 'Sạc dự phòng 20000mAh', category: 'Điện tử', price: 299000, sold: 210, createdAt: '2025-08-30' },
  { id: 'p6', name: 'Sách: Thiết kế UI/UX', category: 'Sách', price: 180000, sold: 45, createdAt: '2025-11-05' }
]
