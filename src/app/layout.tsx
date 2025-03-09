import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import QueryProvider from "./providers/QueryProvider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "./_components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import AuthProvider from "./providers/Auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solar - Ecommerce Platform",
  description: "A Ecommerce Platform for Solar Electricals",
  icons: {
    icon: "/s3.png", // Path to your favicon
    shortcut: "/s3.png",
    apple: "/s3.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions)

  
  const queryClient = new QueryClient()

  return (
    <html lang="en">
     
      <body className={inter.className}>
       <QueryProvider>

        <AuthProvider session={session}>
          <Navbar></Navbar>
        {children}
        </AuthProvider>
        
        
        </QueryProvider>
       
       <Toaster></Toaster>
        </body>
        
    </html>
  );
}
