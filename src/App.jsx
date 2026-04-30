import { useState } from "react";
import ThemeProvider from "./context/ThemeContext";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import SnakePage from "./pages/SnakePage";
import MemoryCardPage from "./pages/MemoryCardPage";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import CareersPage from "./pages/CareersPage";
import HelpPage from "./pages/HelpPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import "./App.css";

/* Views that show the footer */
const FOOTER_VIEWS = new Set([
  "home",
  "about",
  "blog",
  "careers",
  "help",
  "contact",
  "privacy",
  "terms",
]);

/* Views that are "game" views (no footer, back goes home) */
const GAME_VIEWS = new Set(["snake", "memory"]);

function App() {
  const [view, setView] = useState("home");

  function navigate(id) {
    if (!id) return;
    setView(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const showFooter = FOOTER_VIEWS.has(view);

  return (
    <ThemeProvider>
      <NavBar
        onHome={() => navigate("home")}
        onSelectGame={navigate}
        activeView={view}
      />

      <main className="app-main">
        {view === "home" && <HomePage onSelectGame={navigate} />}
        {view === "snake" && <SnakePage onBack={() => navigate("home")} />}
        {view === "memory" && (
          <MemoryCardPage onBack={() => navigate("home")} />
        )}
        {view === "about" && (
          <AboutPage onBack={() => navigate("home")} onSelectGame={navigate} />
        )}
        {view === "blog" && <BlogPage onBack={() => navigate("home")} />}
        {view === "careers" && <CareersPage onBack={() => navigate("home")} />}
        {view === "help" && <HelpPage onBack={() => navigate("home")} />}
        {view === "contact" && <ContactPage onBack={() => navigate("home")} />}
        {view === "privacy" && <PrivacyPage onBack={() => navigate("home")} />}
        {view === "terms" && <TermsPage onBack={() => navigate("home")} />}
      </main>

      {showFooter && <Footer onSelectGame={navigate} />}
    </ThemeProvider>
  );
}

export default App;
