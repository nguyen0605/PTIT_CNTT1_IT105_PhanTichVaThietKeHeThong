import React from 'react'
import './App.css'
import RegistrationForm from './components/RegistrationForm'

function App() {
  return (
    <div id="root">
      <header style={{textAlign: 'center', marginBottom: '1rem'}}>
        <h1>Đăng ký người dùng</h1>
        <p style={{color:'#666'}}>Mẫu đăng ký nhiều bước với kiểm tra lỗi và tải ảnh đại diện</p>
      </header>
      <main>
        <RegistrationForm />
      </main>
    </div>
  )
}

export default App
