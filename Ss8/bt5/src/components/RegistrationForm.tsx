import React, { useState, ChangeEvent, FormEvent } from 'react'
import { validateName, validateEmail, validatePassword, validateAvatarFile } from '../utils/validation'
import './RegistrationForm.css'

type FormState = {
  fullName: string
  email: string
  password: string
  gender: string
  avatar?: File | null
}

const initialState: FormState = {
  fullName: '',
  email: '',
  password: '',
  gender: '',
  avatar: null,
}

export default function RegistrationForm() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0]
    const err = validateAvatarFile(file)
    if (err) {
      setErrors(prev => ({ ...prev, avatar: err }))
      setForm(prev => ({ ...prev, avatar: null }))
      setAvatarPreview(null)
      return
    }
    setForm(prev => ({ ...prev, avatar: file }))
    setErrors(prev => ({ ...prev, avatar: '' }))
    if (file) {
      const url = URL.createObjectURL(file)
      setAvatarPreview(url)
    } else {
      setAvatarPreview(null)
    }
  }

  function validateStep(currentStep = step) {
    const newErrors: Record<string, string> = {}
    if (currentStep === 1) {
      const n = validateName(form.fullName)
      if (n) newErrors.fullName = n
      const em = validateEmail(form.email)
      if (em) newErrors.email = em
      const pw = validatePassword(form.password)
      if (pw) newErrors.password = pw
    }
    if (currentStep === 2) {
      if (!form.gender) newErrors.gender = 'Vui lòng chọn giới tính.'
      const av = validateAvatarFile(form.avatar)
      if (av) newErrors.avatar = av
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function next() {
    if (validateStep(step)) {
      setStep(s => Math.min(3, s + 1))
    }
  }

  function back() {
    setStep(s => Math.max(1, s - 1))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validateStep(1) || !validateStep(2)) return
    setSubmitting(true)
    // Simulate API call
    await new Promise(res => setTimeout(res, 900))
    setSubmitting(false)
    alert('Đăng ký thành công!')
    setForm(initialState)
    setAvatarPreview(null)
    setStep(1)
  }

  return (
    <form className="reg-form" onSubmit={handleSubmit} noValidate>
      <div className="steps">
        <div className={`step ${step === 1 ? 'active' : ''}`}>1</div>
        <div className={`step ${step === 2 ? 'active' : ''}`}>2</div>
        <div className={`step ${step === 3 ? 'active' : ''}`}>3</div>
      </div>

      {step === 1 && (
        <section className="panel">
          <label>
            Họ tên
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Nguyễn Văn A"
            />
            {errors.fullName && <div className="error">{errors.fullName}</div>}
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@example.com"
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </label>

          <label>
            Mật khẩu
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Ít nhất 8 ký tự và 1 ký tự đặc biệt"
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </label>

          <div className="actions">
            <button type="button" className="btn" onClick={next}>
              Tiếp theo →
            </button>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="panel">
          <label>
            Giới tính
            <select name="gender" value={form.gender} onChange={handleChange}>
              <option value="">-- Chọn --</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
            {errors.gender && <div className="error">{errors.gender}</div>}
          </label>

          <label>
            Ảnh đại diện (PNG, JPG)
            <input type="file" accept="image/png, image/jpeg" onChange={handleAvatarChange} />
            {errors.avatar && <div className="error">{errors.avatar}</div>}
          </label>

          {avatarPreview && (
            <div className="avatar-preview">
              <img src={avatarPreview} alt="Preview" />
            </div>
          )}

          <div className="actions">
            <button type="button" className="btn ghost" onClick={back}>
              ← Quay lại
            </button>
            <button type="button" className="btn" onClick={next}>
              Tiếp theo →
            </button>
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="panel">
          <h3>Xác nhận thông tin</h3>
          <div className="review">
            <div><strong>Họ tên:</strong> {form.fullName || '—'}</div>
            <div><strong>Email:</strong> {form.email || '—'}</div>
            <div><strong>Giới tính:</strong> {form.gender || '—'}</div>
            <div className="avatar-small">
              <strong>Ảnh:</strong>
              {avatarPreview ? <img src={avatarPreview} alt="avatar" /> : ' —'}
            </div>
          </div>

          <div className="actions">
            <button type="button" className="btn ghost" onClick={back}>
              ← Quay lại
            </button>
            <button type="submit" className="btn primary" disabled={submitting}>
              {submitting ? 'Đang gửi...' : 'Đăng ký'}
            </button>
          </div>
        </section>
      )}
    </form>
  )
}
