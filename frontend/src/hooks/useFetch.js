// src/hooks/useFetch.js
import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [data, setData] = useState([]); // ← nunca null

  useEffect(() => {
    if (!url) return;

    const token = localStorage.getItem("token");

    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((json) => {
        const body = json?.body;

        if (Array.isArray(body)) {
          setData(body);
        } else {
          setData([]); // ← contrato claro
        }
      })
      .catch(() => setData([]));
  }, [url]);

  return data;
}
