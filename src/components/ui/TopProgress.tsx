import { useEffect, useRef } from 'react'
import { useLocation, useNavigation } from 'react-router-dom'
import NProgress from 'nprogress'
import '@/nprogress.css'

NProgress.configure({ showSpinner: false, minimum: 0.1, speed: 200 })

export function TopProgress() {
  const location = useLocation()
  const navigation = useNavigation()
  const prevPath = useRef(location.pathname)

  useEffect(() => {
    if (navigation.state === 'idle' && location.pathname !== prevPath.current) {
      prevPath.current = location.pathname
      return
    }

    if (navigation.state === 'loading') {
      NProgress.start()
    }
    if (navigation.state === 'idle') {
      NProgress.done()
    }
  }, [navigation.state, location.pathname])

  return null
}
