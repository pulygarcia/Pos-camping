import AdminHeader from "../components/AdminHeader";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <main>
            <AdminHeader />

            {children}

        </main>
    </>
  );
}