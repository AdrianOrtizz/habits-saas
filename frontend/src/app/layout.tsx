import "./globals.css";

import QueryProvider from "@/providers/QueryProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";

const theme = {
  token: {
    colorPrimary: "#63d392",
    borderRadius: 12,
    colorBgContainer: "#ffffff",
    fontFamily: "Inter, sans-serif",
  },
  components: {
    Button: {
      colorPrimary: "#63d392",
      algorithm: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <ConfigProvider theme={theme}>
            <QueryProvider>{children}</QueryProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
