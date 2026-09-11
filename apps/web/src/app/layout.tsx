import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Academy Hub",
  description: "A Turborepo-powered education platform",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Sidebar />
          <main className="main-content">{children}</main>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
