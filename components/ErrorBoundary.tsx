import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center border border-red-100">
            <div className="bg-red-50 p-4 rounded-full inline-flex mb-4 text-red-500">
              <AlertTriangle size={32} />
            </div>
            <h1 className="font-serif text-2xl font-bold text-stone-900 mb-2">Something went wrong</h1>
            <p className="text-stone-500 mb-6">
              We encountered an unexpected error in the kitchen. Please try refreshing the page.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-stone-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 mx-auto hover:bg-stone-800 transition-colors"
            >
              <RefreshCcw size={18} /> Reload Kitchen
            </button>
            {this.state.error && (
              <pre className="mt-8 text-xs text-left bg-stone-100 p-4 rounded-lg text-stone-500 overflow-auto max-h-32">
                {this.state.error.toString()}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
