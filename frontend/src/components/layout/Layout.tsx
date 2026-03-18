import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

type LayoutProps = {
    children: ReactNode;
};

function Layout({ children }: LayoutProps) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-700">
        <Navbar />
        <main className="mx-auto w-full max-w-7xl px-4 py-8">{children}</main>
        <Footer />
      </div>
    );
  }
  export default Layout;
