"use client";

export default function Alert({ message, type = "info" }) {
  const alertStyles = {
    info: "bg-blue-100 border-blue-500 text-blue-700",
    success: "bg-green-100 border-green-500 text-green-700",
    warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
    error: "bg-red-100 border-red-500 text-red-700",
  };

  const style = alertStyles[type] || alertStyles.info;

  return (
    <div
      className={`${style} px-4 py-3 rounded-lg border-l-4 mb-4 shadow-md transition-all duration-300 ease-in-out`}
      role="alert"
    >
      <p className="font-medium">{message}</p>
    </div>
  );
}
