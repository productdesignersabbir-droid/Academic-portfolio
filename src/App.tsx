import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Research } from './components/Research';
import { CV } from './components/CV';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Admin } from './components/Admin';

function Portfolio() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-main)] font-sans selection:bg-[var(--color-accent)] selection:text-white">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 pt-32 pb-16 flex flex-col gap-32">
        <Hero />
        <About />
        <Research />
        <CV />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}
