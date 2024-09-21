'use client'
import type { Metadata } from "next";
import { SidebarDemo } from '@/components/App/Sidebar'
import { useParams } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const {selectedOption} = useParams();

  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
      <SidebarDemo element={children}/> 
      </body>
    </html>
  );
}
