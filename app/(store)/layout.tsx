import Link from "next/link";
import Hero from "../components/Hero";
import Header from "../components/Header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <main>
            <Header />

            <Hero />

            {children}
        </main>
    </>
  );
}