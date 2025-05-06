"use client";
import { useEffect, useRef } from "react";

export default function Alert({ message, type = "info" }) {
  const audioRef = useRef(null);
  const alertStyles = {
    info: "bg-blue-100 border-blue-500 text-blue-700",
    success: "bg-green-100 border-green-500 text-green-700",
    warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
    error: "bg-red-100 border-red-500 text-red-700",
  };

  const style = alertStyles[type] || alertStyles.info;

  useEffect(() => {
    if (type === "error" && audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Erro ao reproduzir o som:", error);
      });
    }
  }, [message, type]);

  const handleResolve = async () => {
    try {
      const response = await fetch("/api/alert/resolve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ip: message }),
      });

      if (!response.ok) {
        console.error("Erro ao resolver o problema");
      }
    } catch (error) {
      console.error("Erro ao resolver o problema:", error);
    }
  };

  return (
    <div
      className={`${style} px-4 py-3 rounded-lg border-l-4 mb-4 shadow-md transition-all duration-300 ease-in-out flex justify-between items-center`}
      role="alert"
    >
      <audio ref={audioRef} src="/alert.mp3" preload="auto" />
      <p className="font-medium">{message}</p>
      {type === "error" && (
        <button
          onClick={handleResolve}
          className="bg-white text-gray-700 font-semibold py-1 px-3 rounded-md hover:bg-gray-100 transition-colors duration-200 ml-4 border border-gray-300"
        >
          Resolver
        </button>
      )}
    </div>
  );
}
