"use client";
import { Layout, Button } from "antd";
const { Sider, Content } = Layout;
import { Menu } from "lucide-react";

import { SidebarMenu } from "./SideBar/SidebarMenu";
import { SidebarProfile } from "./SideBar/SidebarProfile";

const MainLayout = ({
  children,
  isCollapsed,
  turn,
}: {
  children: React.ReactNode;
  isCollapsed: boolean;
  turn: () => void;
}) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsible
        collapsed={isCollapsed}
        onCollapse={turn}
        collapsedWidth="0"
        trigger={null}
        theme="light"
        width={260}
        style={{
          borderRight: "1px solid #f0f0f0",
          height: "100vh",
          position: "fixed",
          zIndex: 100,
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div style={{ flex: 1 }}>
            <div className="p-6">
              <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                Habitzz
              </h1>
            </div>
            <SidebarMenu />
          </div>

          <SidebarProfile />
        </div>
      </Sider>

      <Layout className="transition-all duration-300 lg:ml-[260px]">
        <Content className="bg-main-bg p-4 md:p-8">
          <div className="max-w-6xl flex flex-col mx-auto">
            <Menu onClick={turn} className="mb-8 self-end md:hidden" />

            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
