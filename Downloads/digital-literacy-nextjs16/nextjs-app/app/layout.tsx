import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VerifyPlatform - Media Literacy Academy',
  description:
    'Equip yourself with elite digital hygiene. Learn to dismantle disinformation, verify deepfakes, inspect metadata, and neutralize cognitive filter bubbles.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col font-sans antialiased bg-[#F9F9F7] dark:bg-slate-950 text-[#2D2D2D] dark:text-slate-100 transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
