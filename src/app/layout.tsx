import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import SessionProvider from "@/utilsFunctions/sessionProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TORUS REDIS INSTANCE",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <h2 className="text-center font-bold pt-2 text-gray-400">
          Torus Insight Redis Tool
        </h2>
        <Providers>
          <SessionProvider>{children}</SessionProvider>
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
