import { ToastContainer } from "react-toastify";
import AdminHeader from "../components/AdminHeader";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <main>
            <ToastContainer />

            <AdminHeader />

            {children}

        </main>
    </>
  );
}