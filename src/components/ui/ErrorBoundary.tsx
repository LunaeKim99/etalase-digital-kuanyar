import React from 'react'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-surface-container-low">
          <div className="text-center max-w-md p-6 card">
            <h1 className="text-4xl font-bold text-on-surface mb-4">Terjadi kesalahan</h1>
            <p className="text-on-surface-variant mb-6">
              Mohon maaf atas ketidaknyamanannya. Silakan coba lagi nanti atau hubungi dukungan jika masalah berlanjut.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Muat Ulang
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
