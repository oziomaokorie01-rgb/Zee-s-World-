import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
              export const metadata = {
                  title: "Zee's World | Senseii_ciel",
                    description: "Technical Co-founder & AI Creator.",
                      icons: {
                          icon: 'https://peach-elderly-meadowlark-381.mypinata.cloud/ipfs/bafybeiapgfhhx2p57c3h2362uu5iihg7ypz3a7tsy5iimzsur2nmukbrha/the-site-is-zee-s-world-it-s-my-portfolio-i-was-th%20(1).png',
                            },
                            }



                                                                            

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): import("react/jsx-runtime").JSX.Element {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="bg-black text-white min-h-screen flex flex-col overflow-x-hidden">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
