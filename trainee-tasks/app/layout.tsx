import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/organisms/navbar";
import ReactQueryProvder from "@/components/providers/react-query";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})


export const metadata: Metadata = {
  title: "Trainee Tasks | Dipesh Aryal",
  description: "Vrit tech frontend trainee tasks by Dipesh Aryal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={` ${geistMono.variable} ${geistSans.variable} h-full antialiased`}
    >

      <body className="min-h-full flex flex-col ">
        <ReactQueryProvder>

          <Navbar />
          <main className="pt-4 mx-auto max-w-7xl w-full px-2">
            {children}
          </main>
        </ReactQueryProvder>
      </body>
    </html>
  );
}

