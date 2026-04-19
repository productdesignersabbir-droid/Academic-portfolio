import { motion } from 'motion/react';
import { ArrowRight, FileText } from 'lucide-react';

export function Hero() {
  return (
    <section id="hero" className="min-h-[70vh] flex flex-col justify-center">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-block px-3 py-1 mb-6 border border-[var(--color-border)] rounded-full text-xs font-semibold tracking-wider uppercase text-[var(--color-accent)] bg-blue-50">
            Computer Science Ph.D. Candidate
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] mb-6 tracking-tight">
            Exploring the intersection of AI and Human Logic.
          </h1>
          <p className="text-lg text-[var(--color-text-sub)] mb-10 max-w-md leading-relaxed">
            I am a researcher and student passionate about building intelligent systems that augment human capabilities. Currently studying at Stanford University.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#research" className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              View Research <ArrowRight size={18} />
            </a>
            <a href="#cv" className="inline-flex items-center gap-2 bg-white text-[var(--color-text-main)] border border-[var(--color-border)] px-6 py-3 rounded-lg font-medium hover:border-gray-400 transition-colors">
              <FileText size={18} /> Download CV
            </a>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative hidden md:block">
          <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100 relative">
            <img src="https://picsum.photos/seed/academic/800/800" alt="Portrait" referrerPolicy="no-referrer" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
