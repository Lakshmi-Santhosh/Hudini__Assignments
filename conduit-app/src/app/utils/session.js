"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const TOKEN = localStorage.getItem("token");
    if (TOKEN) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [router]);

  return isAuthenticated;
};

export default useAuth;
