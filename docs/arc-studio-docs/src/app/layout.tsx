import { Inter } from 'next/font/google';
import { Provider } from '@/components/provider';
import './global.css';
import type { Metadata, Viewport } from "next";
import { appDescription, appIcon, appName, appUri } from '@/lib/shared';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(appUri),
  title: {
    template: `%s | ${appName}`,
    default: `${appName} Documentation`,
  },
  description: appDescription,
  icons: {
    icon: appIcon,
  },
  openGraph: {
    description: appDescription,
    images: appIcon,
  },
  twitter: {
    card: "summary",
    description: appDescription,
    images: appIcon,
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#192d46",
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
