import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
// import { PostHogProvider } from "@/components/providers/posthog-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import QueryProvider from "@/components/providers/query-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Appointmy - Appointment Booking Platform",
  description: "Transform your business with Appointmy's powerful appointment booking platform. Create branded booking sites, manage customers, automate communications, and grow your business with our comprehensive SaaS solution.",
  keywords: "appointment booking, SaaS, multi-tenant, business management, customer communication, automated messaging, booking platform",
  openGraph: {
    title: "Appointmy - Appointment Booking Platform",
    description: "Transform your business with Appointmy's powerful appointment booking platform. Create branded booking sites, manage customers, automate communications, and grow your business.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster />
        {/* <PostHogProvider> */}
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </QueryProvider>
        {/* </PostHogProvider> */}
      </body>
    </html>
  );
}
