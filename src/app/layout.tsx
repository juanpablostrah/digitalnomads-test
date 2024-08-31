import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientQueryProvider from "./query-provider/clientQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Instagram Feed",
	description: "clone intagram feed",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ClientQueryProvider>{children}</ClientQueryProvider>
			</body>
		</html>
	);
}
