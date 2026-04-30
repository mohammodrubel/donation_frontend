"use client";

import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const user = useSelector((state: any) => state?.auth?.user);
  const loading = useSelector((state: any) => state?.auth?.loading);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-medium">
        Loading...
      </div>
    );
  }


  if (!user) {
    return null;
  }

  // User থাকলে children দেখাবে
  return <div>{children}</div>;
}

export default Layout;