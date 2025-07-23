import { memo } from "react";
interface ErrorMessageProps {
  error: string;
  onRetry?: () => void;
  onDismiss?: () => void;
}

const ErrorMessage = memo(
  ({ error, onRetry, onDismiss }: ErrorMessageProps) => {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <div className="flex justify-between items-start">
          <span>Error: {error}</span>
          <div className="flex gap-2">
            {onRetry && (
              <button
                onClick={onRetry}
                className="text-red-600 hover:text-red-800 underline text-sm"
              >
                Try Again
              </button>
            )}
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="text-red-500 hover:text-red-700 font-bold text-lg leading-none"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default ErrorMessage;
