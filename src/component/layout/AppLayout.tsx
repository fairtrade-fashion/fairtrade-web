import { Outlet } from "react-router-dom";
import AppHeaderComp from "./AppHeader";
import AppFooterComp from "./AppFooter";

export default function AppLayout() {
  return (
    <>
      <main className="h-screen w-full">
        <header>
          <AppHeaderComp />
        </header>
        <section className="min-h-screen w-full">
          <Outlet />
        </section>
        <footer className="mt-10">
          <AppFooterComp />
        </footer>
      </main>
    </>
  );
}
