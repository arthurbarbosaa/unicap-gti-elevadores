"use client";

import { useEffect, useState } from "react";
import Alert from "./components/Alert";

export default function Home() {
  const [problemsList, setProblemsList] = useState([]);
  const [runnigMessage, setStatusMessage] = useState();

  useEffect(() => {
    const eventSource = new EventSource("/api/stream");

    eventSource.addEventListener("status", (event) => {
      const data = JSON.parse(event.data);
      setStatusMessage(data);
    });

    eventSource.addEventListener("problem", (event) => {
      const data = JSON.parse(event.data);
      setProblemsList(data);
    });

    return () => eventSource.close();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Alerta Elevadores Unicap
      </h1>
      {runnigMessage && <Alert message={runnigMessage} type="info" />}
      {problemsList?.map((problem, index) => (
        <Alert key={index} message={problem} type="error" />
      ))}
    </div>
  );
}
