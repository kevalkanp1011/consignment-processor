import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "../styles/globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Consignment Processor | Professional Tracking Solution',
  description: 'Upload your Excel or CSV file with consignment numbers and receive a detailed tracking report',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}