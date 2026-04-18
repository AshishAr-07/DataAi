import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { playfair } from "./font";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { AuthProvider } from "./context/auth";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DataAi - Your AI Companion for Data Analysis",
  description:
    "DataAi is your ultimate AI companion for data analysis. Instantly analyze your data, generate insights, and make informed decisions with ease. Free forever.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <Toaster />
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
