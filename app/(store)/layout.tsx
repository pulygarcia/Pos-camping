import Hero from "../components/Hero";
import Header from "../components/Header";
import { ToastContainer, Bounce } from "react-toastify";

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

            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
            />

        </main>
    </>
  );
}