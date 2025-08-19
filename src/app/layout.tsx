import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "../../chatbot/Chatbot";
import MotionWrapper from "@/components/MotionWrapper";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Aima Fine Arts",
  description: "Website for Aima Fine Arts",
};

export default async function RootLayout({
  children,
}: { 
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <MotionWrapper>
          <Navbar />
          {children}
          <Footer />
          <Chatbot />
        </MotionWrapper>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
