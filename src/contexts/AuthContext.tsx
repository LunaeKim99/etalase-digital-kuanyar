import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'
import { logout } from '@/services/admin'

interface User {
  id: number
  username: string
  name: string
  role: string
}

interface AuthState {
  token: string | null
  user: User | null
}

interface AuthContextValue extends AuthState {
  login: (token: string, user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('admin_token')
    const savedUser = localStorage.getItem('admin_user')
    if (saved && savedUser) {
      setToken(saved)
      setUser(JSON.parse(savedUser) as User)
    }
  }, [])

  const login = useCallback((newToken: string, newUser: User) => {
    localStorage.setItem('admin_token', newToken)
    localStorage.setItem('admin_user', JSON.stringify(newUser))
    setToken(newToken)
    setUser(newUser)
  }, [])

  const doLogout = useCallback(() => {
    logout()
    localStorage.removeItem('admin_user')
    setToken(null)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ token, user, login, logout: doLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
