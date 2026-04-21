"use client";

import MainLayout from "@/components/layout/MainLayout";

import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Loading from "@/components/common/Spinner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const turnCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) return <Loading />;

  if (!isAuthenticated) return null;

  return (
    <MainLayout isCollapsed={isCollapsed} turn={turnCollapsed}>
      {children}
    </MainLayout>
  );
}
