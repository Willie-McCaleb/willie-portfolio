import "./App.css";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import RiveCharacter from "./components/RiveCharacter.jsx";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <div className="page">
      <Header />

      <div className="hero-main-wrapper">
        <Hero />
        <RiveCharacter />

        {/* Main orange area */}
        <main className="main-section">
          <About />
          <Projects />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
