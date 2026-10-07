import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import BackgroundGlow from "./components/BackgroundGlow";
import CursorGlow from "./components/CursorGlow";
import ScrollProgress from "./components/ScrollProgress";

export default function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-700 dark:selection:text-emerald-300 transition-colors duration-300">
        {/* Scroll Progress Bar at the Top */}
        <ScrollProgress />

        {/* Dynamic Glowing Ambient Blobs & Grid Pattern */}
        <BackgroundGlow />

        {/* Smooth Mouse Tracking Ambient Spotlight */}
        <CursorGlow />

        {/* Main App Content */}
        <div className="relative z-10 flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Contact />
          </main>
          <Footer />
          <ChatWidget />
        </div>
      </div>
    </ThemeProvider>
  );
}
