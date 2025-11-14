export function validateName(name?: string) {
  if (!name || !name.trim()) return 'Vui lòng nhập họ tên.'
  // Allow letters (including Unicode letters) and spaces
  const ok = /^[\p{L} ]+$/u.test(name.trim())
  if (!ok) return 'Họ tên không được chứa ký tự đặc biệt hoặc số.'
  return ''
}

export function validateEmail(email?: string) {
  if (!email || !email.trim()) return 'Vui lòng nhập email.'
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i
  if (!re.test(email)) return 'Định dạng email không hợp lệ.'
  return ''
}

export function validatePassword(password?: string) {
  if (!password) return 'Vui lòng nhập mật khẩu.'
  if (password.length < 8) return 'Mật khẩu phải có ít nhất 8 ký tự.'
  const hasLetter = /[A-Za-z]/.test(password)
  const hasSpecial = /[^A-Za-z0-9]/.test(password)
  if (!hasLetter || !hasSpecial) return 'Mật khẩu phải chứa chữ cái và ít nhất một ký tự đặc biệt.'
  return ''
}

export function validateAvatarFile(file?: File | null) {
  if (!file) return ''
  const allowed = ['image/png', 'image/jpeg']
  if (!allowed.includes(file.type)) return 'Chỉ chấp nhận hình PNG hoặc JPG.'
  const maxMB = 3
  if (file.size > maxMB * 1024 * 1024) return `Kích thước ảnh phải nhỏ hơn ${maxMB}MB.`
  return ''
}
