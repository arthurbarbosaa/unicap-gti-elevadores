"use client";

import { useEffect, useState } from "react";

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
    <div className="text-center">
      <h1 className="text-2xl">Alerta Elevadores Unicap</h1>
      <p>{runnigMessage}</p>
      {problemsList?.map((problem, index) => (
        <p key={index}>{problem}</p>
      ))}
    </div>
  );
}
