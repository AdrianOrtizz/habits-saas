import "./globals.css";

import QueryProvider from "@/providers/QueryProvider";
import AuthProvider from "@/providers/AuthProvider";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";

import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

const theme = {
  token: {
    colorPrimary: "#63d392",
    borderRadius: 12,
    colorBgContainer: "#ffffff",
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
    <html lang="en" className={openSans.className}>
      <body>
        <AntdRegistry>
          <ConfigProvider theme={theme}>
            <QueryProvider>
              <AuthProvider>{children}</AuthProvider>
            </QueryProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
