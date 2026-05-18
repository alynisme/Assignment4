import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google";
import { Toaster } from "sonner";
import GlobalDecorations from "@/components/ui/GlobalDecorations";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "FLEUR PIPELINE",
  description: "Rekomendasi buket bunga yang tepat untuk pasangan Anda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${dancingScript.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-gray-800 bg-white md:cursor-none">
        <CustomCursor />
        <GlobalDecorations />
        <Toaster 
          position="top-center" 
          toastOptions={{ 
            style: { 
              background: '#F5F5DC', 
              color: '#831843', 
              border: '1px solid #FFC0CB',
              fontFamily: 'var(--font-inter)'
            } 
          }} 
        />
        {children}
      </body>
    </html>
  );
}
