"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { useRouter } from "next/navigation";

export default function layout({ children }) {
  const [auth] = useAuth();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (!auth?.isAuthenticated) {
      setAuthorized(false);
      router.push("/login");
      return;
    }
    setLoading(false);
    setAuthorized(true);
  }, [auth?.isAuthenticated, router]);

  if (loading) {
    return;
    <div className="h-screen flex items-center justify-center bg-white bg-opacity-80 z-50">
      <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-stone-900 animate-spin"></div>
    </div>;
  }

  return authorized ? (
    <div>{children}</div>
  ) : (
    <div className="h-screen flex items-center justify-center bg-white bg-opacity-80 z-50">
      <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-stone-900 animate-spin"></div>
    </div>
  );
}
