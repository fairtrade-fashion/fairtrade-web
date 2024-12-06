import { Outlet } from "react-router-dom";
import AppHeaderComp from "./AppHeader";
import AppFooterComp from "./AppFooter";
import ScrollToTop from "../ui/scroll_to_top";

export default function AppLayout() {
  return (
    <>
      <main className="h-screen w-full">
        <header>
          <AppHeaderComp />
        </header>
        <ScrollToTop/>
        <section className="min-h-screen bg-gray-50 w-full">
          <Outlet />
        </section>
        <footer>
          <AppFooterComp />
        </footer>
      </main>
    </>
  );
}
