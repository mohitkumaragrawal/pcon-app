/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import TorchBackground from "@/components/torch-background";
import Nav from "@/components/nav";
import { Toaster } from "@/components/ui/sonner";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Footer from "@/components/footer";

import { Analytics } from "@vercel/analytics/react";

const description =
  "We, at Programming Club of NIT Jamshedpur, are a group of highly enthusiastic and dedicated individuals striving to spread algorithmic thinking to ignite the minds of the contemporary generation to Code for the Future. PCON consists of a diverse group which focuses on Competitive Coding, App and Web development, Cloud Computing, Machine Learning, Blockchain and many more. If you think that the bits are the alphabets of the future, you are One of Us, spreading the gene-o-code all the way!";

export const metadata: Metadata = {
  title: "PCON: Programming Club Of NIT Jamshedpur",
  description,
  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "en-US",
    url: "https://pconjsr.in",
    title: "PCON: Programming Club Of NIT Jamshedpur",
    description,
    images: [
      {
        url: "https://pconjsr.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero-2.342b8b55.jpeg&w=3840&q=75",
        width: 1200,
        height: 630,
        alt: "PCON: Programming Club Of NIT Jamshedpur",
      },
    ],
  },
  icons: {
    shortcut: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Sometype+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        <Providers>
          <TorchBackground />
          <div className="flex min-h-screen flex-col items-stretch">
            <Nav session={session} />
            <div className="w-full">{children}</div>
            <div className="flex-1" />
            <Footer />
          </div>
        </Providers>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
