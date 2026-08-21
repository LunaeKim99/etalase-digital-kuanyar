import React from 'react'
import { Button } from './button'

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

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center bg-background p-4">
          <div className="text-center max-w-md p-8 bg-surface-container-low rounded-2xl border border-outline-variant">
            <div className="w-16 h-16 rounded-full bg-error-container text-on-error-container mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">!</span>
            </div>
            <h1 className="text-2xl font-bold text-on-surface mb-2">Terjadi Kesalahan</h1>
            <p className="text-on-surface-variant mb-6">
              Mohon maaf atas ketidaknyamanannya. Silakan coba lagi atau kembali ke beranda.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" onClick={this.handleRetry}>
                Coba Lagi
              </Button>
              <Button asChild>
                <a href="/">Ke Beranda</a>
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
