import "./App.css";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
// import Cord from "./components/Cord.jsx";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <div className="page">
      <Header />

      {/* Hero section (name + avatar) */}
      <Hero />

      {/* Main orange area */}
      <main className="main-section">
        <About />
        <Projects />
      </main>

      <Footer />
    </div>
  );
}

export default App;
