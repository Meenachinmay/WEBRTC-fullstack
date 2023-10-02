import React, { Component } from "react";

interface State {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can log the error to an error reporting service, if you'd like.
    console.error("Caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
        return (
            <div>
                ERROR❌
            </div>
        )
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
