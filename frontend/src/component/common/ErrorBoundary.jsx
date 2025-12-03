import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Unhandled error:", error, errorInfo);
  }

  render() {
    const { hasError, error } = this.state;

    if (hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-gray-50 dark:bg-gray-900 transition-colors">
          <div className="max-w-lg w-full p-8 rounded-xl bg-white dark:bg-gray-800 shadow-lg dark:shadow-none border border-gray-200 dark:border-gray-700">
            
            <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">
              Something went wrong
            </h1>

            <p className="mt-3 text-gray-700 dark:text-gray-300">
              An unexpected error occurred. Please try refreshing the page.
            </p>

            <pre className="mt-4 p-4 text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg overflow-auto border border-gray-200 dark:border-gray-600">
              {error?.message}
            </pre>

            <button
              onClick={() => window.location.reload()}
              className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}