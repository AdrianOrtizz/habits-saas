"use client";
import { Menu } from "antd";
import { LayoutDashboard, Target } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export const SidebarMenu = () => {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      key: "/",
      icon: <LayoutDashboard size={20} />,
      label: "Hábitos",
    },
    {
      key: "/objetivos",
      icon: <Target size={20} />,
      label: "Objetivos",
    },
  ];

  return (
    <Menu
      mode="inline"
      selectedKeys={[pathname]}
      items={menuItems}
      onClick={({ key }) => router.push(key)}
      style={{ borderRight: 0, marginTop: 16 }}
      className="custom-sidebar-menu"
    />
  );
};
