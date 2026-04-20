// @ts-ignore
import "./globals.css";

import QueryProvider from "@/providers/QueryProvider";
import AuthProvider from "@/providers/AuthProvider";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, App as AntdApp } from "antd";

import { Open_Sans } from "next/font/google";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Habitzz | Domina tus hábitos",
    template: "%s | Habitzz",
  },
  description:
    "La plataforma definitiva para trackear tus hábitos diarios, alcanzar objetivos semanales y visualizar tu progreso real.",
  keywords: [
    "hábitos",
    "productividad",
    "metas",
    "tracker",
    "habitzz",
    "rutina",
  ],
  authors: [{ name: "Adrian Ortiz" }],
  creator: "Adrian Ortiz",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", rel: "icon" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://habitzz.vercel.app",
    title: "Habitzz - Conquista tus metas",
    description: "Trackea tus rutinas y alcanza tu mejor versión con Habitzz.",
    siteName: "Habitzz",
    images: [
      {
        url: "https://habitzz.vercel.app/landing.png",
        width: 1200,
        height: 630,
        alt: "Habitzz Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Habitzz",
    description: "Trackeo de hábitos y objetivos semanales.",
    images: ["https://habitzz.vercel.app/landing.png"],
  },
  manifest: "/site.webmanifest",
};

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
        <AntdApp>
          <AntdRegistry>
            <ConfigProvider theme={theme}>
              <QueryProvider>
                <AuthProvider>{children}</AuthProvider>
              </QueryProvider>
            </ConfigProvider>
          </AntdRegistry>
        </AntdApp>
      </body>
    </html>
  );
}
