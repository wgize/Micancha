import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function useUserProfile() {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/usuarios/yo`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.body || "Error");
    setUser(json.body); // ← SIEMPRE objeto
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, refetch: fetchUser };
}
