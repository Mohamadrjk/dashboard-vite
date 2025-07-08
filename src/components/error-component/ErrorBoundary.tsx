"use client";
import React, { Component, ErrorInfo, ReactNode } from "react";

type ErrorBoundaryProps = {
    children: ReactNode;
    fallback?: ReactNode; // Optional: Custom fallback component
};

type ErrorBoundaryState = {
    hasError: boolean;
    error: Error | null;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
        };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // Log error to a monitoring service (e.g., Sentry)
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    render(): ReactNode {
        const { hasError, error } = this.state;
        const { children, fallback } = this.props;

        if (hasError) {
            return (
                fallback || (
                    <div className="flex items-center justify-center h-screen">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-red-600">
                                Something went wrong.
                            </h1>
                            <p className="text-gray-700">
                                {error?.message || "An unexpected error occurred."}
                            </p>
                        </div>
                    </div>
                )
            );
        }

        return children;
    }
}

const ErrorBoundaryWrapper: React.FC<{
    children: ReactNode;
    fallback?: ReactNode;
}> = ({ children, fallback }) => (
    <ErrorBoundary fallback={fallback}>{children}</ErrorBoundary>
);

export default ErrorBoundaryWrapper;
