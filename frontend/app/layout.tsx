import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { ErrorFilter } from "./error-filter";

export const metadata: Metadata = {
  title: "Encrypted Household Debt Register",
  description: "Privacy-preserving debt management system using FHEVM by Zama. Securely record and track loans, credit cards, and borrowing with fully homomorphic encryption.",
  keywords: ["FHEVM", "Zama", "privacy", "encryption", "debt", "blockchain", "web3", "homomorphic encryption"],
  authors: [{ name: "Encrypted Debt Register Team" }],
  creator: "Encrypted Debt Register",
  publisher: "Zama FHEVM",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "Encrypted Household Debt Register",
    description: "Privacy-preserving debt management system using FHEVM",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Encrypted Household Debt Register",
    description: "Privacy-preserving debt management system using FHEVM",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`debt-bg text-foreground antialiased`}>
        <ErrorFilter />
        <div className="fixed inset-0 w-full h-full debt-bg z-[-20] min-w-[850px]"></div>
        <main className="flex flex-col max-w-screen-xl mx-auto pb-20 min-w-[850px]">
          <nav className="flex w-full px-3 md:px-0 h-fit py-10 justify-between items-center">
            <div className="flex items-center gap-4">
              <img
                src="/logo.svg"
                alt="Debt Register Logo"
                width={60}
                height={60}
                className="rounded-lg"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Encrypted Debt Register</h1>
                <p className="text-sm text-gray-600">Privacy-Preserving Financial Management</p>
              </div>
            </div>
          </nav>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}

