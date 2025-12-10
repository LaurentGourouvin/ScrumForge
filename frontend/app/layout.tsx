import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./style/globals.css";
import { AuthProvider } from "@/app/contexts/AuthContext";

export const metadata: Metadata = {
  title: {
    default: "ScrumForge - Self-hosted Scrum Management Platform",
    template: "%s | ScrumForge",
  },
  description:
    "Lightweight, self-hosted Scrum management platform. Manage teams, products, backlogs, sprints, and ceremonies following the Scrum Guide.",
  keywords: [
    "scrum",
    "agile",
    "project management",
    "self-hosted",
    "sprint planning",
    "product backlog",
    "scrum master",
    "product owner",
    "developer tools",
    "team management",
  ],
  authors: [
    {
      name: "Laurent Gourouvin",
      url: "https://www.linkedin.com/in/laurentgourouvin",
    },
  ],
  creator: "Laurent Gourouvin",
  publisher: "ScrumForge",
  applicationName: "ScrumForge",
  robots: {
    index: false, // Private app, no indexing
    follow: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "",
    siteName: "ScrumForge",
    title: "ScrumForge - Self-hosted Scrum Management",
    description: "Lightweight, self-hosted Scrum management platform for teams following the Scrum Guide.",
    images: [
      {
        url: "/images/sf/logo_scrum_forge.png",
        width: 1200,
        height: 630,
        alt: "ScrumForge Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ScrumForge - Self-hosted Scrum Management",
    description: "Lightweight, self-hosted Scrum management platform for teams.",
    images: ["/images/sf/logo_scrum_forge.png"],
  },
  // icons: {
  //   icon: [
  //     { url: "/favicon.ico" },
  //     { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
  //     { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
  //   ],
  //   apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  // },
  // manifest: "/site.webmanifest",
  other: {
    version: "1.0.0",
    license: "MIT",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-charcoal-sf min-h-dvh min-w-dvw">
        <Toaster />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
