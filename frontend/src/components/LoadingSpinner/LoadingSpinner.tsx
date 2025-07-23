import { RefreshCw } from "lucide-react";

const LoadingSpinner = ({ size = 8, className = "" }) => {
  return (
    <div className={`flex justify-center items-center h-64 ${className}`}>
      <RefreshCw className={`w-${size} h-${size} animate-spin text-blue-500`} />
    </div>
  );
};

export default LoadingSpinner;
