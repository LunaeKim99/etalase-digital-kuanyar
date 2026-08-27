import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import type { ReactNode } from 'react'
import { setOnUnauthorized } from '@/services/admin'

export interface User {
  id: number
  name: string
  email: string
  role: 'admin'
}

export type AuthStatus = 'initializing' | 'authenticated' | 'unauthenticated'

interface AuthContextValue {
  status: AuthStatus
  token: string | null
  user: User | null
  login: (token: string, user: User) => void
  logout: () => void
  refresh: () => Promise<void>
}

const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'

function safeReadUser(): User | null {
  try {
    const raw = localStorage.getItem(USER_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      typeof parsed.id === 'number' &&
      typeof parsed.email === 'string' &&
      parsed.role === 'admin'
    ) {
      return parsed as User
    }
    return null
  } catch {
    return null
  }
}

function readToken(): string | null {
  try {
    const t = localStorage.getItem(TOKEN_KEY)
    return t && t.length > 0 ? t : null
  } catch {
    return null
  }
}

function clearStorage() {
  try {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  } catch {}
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

async function fetchMe(token: string): Promise<User | null> {
  try {
    const res = await fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) return null
    const body = await res.json().catch(() => null)
    if (!body?.success || !body.user) return null
    const u = body.user
    if (
      typeof u.id === 'number' &&
      typeof u.email === 'string' &&
      u.role === 'admin'
    ) {
      return { id: u.id, name: String(u.name ?? ''), email: u.email, role: u.role }
    }
    return null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>('initializing')
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const initRan = useRef(false)

  useEffect(() => {
    setOnUnauthorized(() => {
      setToken(null)
      setUser(null)
      setStatus('unauthenticated')
    })
    return () => { setOnUnauthorized(null) }
  }, [])

  useEffect(() => {
    if (initRan.current) return
    initRan.current = true

    const savedToken = readToken()
    const savedUser = safeReadUser()

    if (!savedToken || !savedUser) {
      clearStorage()
      setStatus('unauthenticated')
      return
    }

    setToken(savedToken)
    setUser(savedUser)

    fetchMe(savedToken).then((authoritative) => {
      if (authoritative) {
        setUser(authoritative)
        setStatus('authenticated')
      } else {
        clearStorage()
        setToken(null)
        setUser(null)
        setStatus('unauthenticated')
      }
    })
  }, [])

  const login = useCallback((newToken: string, newUser: User) => {
    try {
      localStorage.setItem(TOKEN_KEY, newToken)
      localStorage.setItem(USER_KEY, JSON.stringify(newUser))
    } catch {}
    setToken(newToken)
    setUser(newUser)
    setStatus('authenticated')
  }, [])

  const logout = useCallback(() => {
    clearStorage()
    setToken(null)
    setUser(null)
    setStatus('unauthenticated')
  }, [])

  const refresh = useCallback(async () => {
    const t = readToken()
    if (!t) {
      logout()
      return
    }
    const authoritative = await fetchMe(t)
    if (authoritative) {
      setUser(authoritative)
      setStatus('authenticated')
    } else {
      clearStorage()
      setToken(null)
      setUser(null)
      setStatus('unauthenticated')
    }
  }, [logout])

  return (
    <AuthContext.Provider value={{ status, token, user, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}