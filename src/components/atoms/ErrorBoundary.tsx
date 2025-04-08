'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleRefresh = () => {
    window.location.reload();
  };

  private handleBack = () => {
    window.history.back();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="text-center">
            <div className="mb-8">
              <svg 
                className="mx-auto h-16 w-16 text-yellow-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
              Oops! Something went wrong
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto animate-fade-in delay-100">
              We apologize for the inconvenience. You can try refreshing the page or going back.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <pre className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg text-sm text-left overflow-auto max-w-xl mx-auto mb-8">
                {this.state.error.toString()}
              </pre>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-200">
              <button
                onClick={this.handleRefresh}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent
                  text-base font-medium rounded-xl text-white bg-yellow-500 hover:bg-yellow-600
                  transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Refresh Page
              </button>
              <button
                onClick={this.handleBack}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent
                  text-base font-medium rounded-xl text-yellow-600 bg-yellow-50 hover:bg-yellow-100
                  transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}