"use client";

import MainLayout from "@/components/layout/MainLayout";

import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Loading from "@/components/common/Spinner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (isLoading) return <Loading />;

  if (!isAuthenticated) return null;

  return <MainLayout>{children}</MainLayout>;
}
