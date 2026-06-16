import type { Metadata } from "next";
import "./globals.css";
import { PersonaProvider } from "@/context/PersonaContext";

export const metadata: Metadata = {
  title: "Uppara Vinod | AI/ML Engineer & Full Stack Developer Portfolio",
  description: "Portfolio of Uppara Vinod, a results-driven AI/ML Engineer & Full Stack Developer. High-achieving CSE student (CGPA 9.45/10) with hands-on experience in PyTorch, React, Node.js, and MongoDB.",
  keywords: [
    "Uppara Vinod",
    "AI/ML Engineer",
    "Full Stack Developer",
    "Software Engineer",
    "React Developer",
    "Machine Learning Engineer",
    "TensorFlow",
    "PyTorch",
    "MERN Stack",
    "TypeScript Portfolio"
  ],
  authors: [{ name: "Uppara Vinod" }],
  creator: "Uppara Vinod",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/upparavinod7",
    title: "Uppara Vinod | AI/ML Engineer & Full Stack Developer Portfolio",
    description: "Explore the technical projects, certifications, and experience of Uppara Vinod—specialist in machine learning models and production-grade web applications.",
    siteName: "Uppara Vinod Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uppara Vinod | AI/ML Engineer & Full Stack Developer Portfolio",
    description: "Results-driven AI/ML Engineer & Full Stack Developer Portfolio",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className="bg-gray-950 text-gray-100 antialiased selection:bg-purple-500 selection:text-white min-h-screen">
        <PersonaProvider>
          {children}
        </PersonaProvider>
      </body>
    </html>
  );
}
