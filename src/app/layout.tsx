import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Navbar from "@components/navbar";
import Footer from "@components/footer";
import SocialFixedBar from "@components/SocialFixedBar";
import { identity, slogan } from "@data/profile";

const fullName = `${identity.firstName} ${identity.lastName}`;
const title = `${fullName} | ${identity.title} à ${identity.city}`;
const description = `${fullName}, ${identity.title.toLowerCase()} (Symfony, React, Java) à ${identity.city}, disponible pour une alternance. ${slogan}`;

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(identity.siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: identity.siteUrl,
    images: [
      {
        url: "/images/og-bruno-rigal.jpg",
        width: 1200,
        height: 630,
        alt: `Photo de ${fullName}`,
      },
    ],
    siteName: `Portfolio de ${fullName}`,
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/og-bruno-rigal.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  applicationName: `Portfolio de ${fullName}`,
  creator: fullName,
  publisher: fullName,
  authors: [{ name: fullName, url: identity.siteUrl }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <Navbar />
        <SocialFixedBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
