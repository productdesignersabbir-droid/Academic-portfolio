import { motion } from 'motion/react';
import { BookOpen, GraduationCap, Award } from 'lucide-react';

export function About() {
  const highlights = [
    { icon: <GraduationCap size={20} />, title: 'Education', desc: 'Ph.D. in Computer Science, Stanford University (Expected 2028). B.S. in Mathematics, MIT.' },
    { icon: <BookOpen size={20} />, title: 'Focus Areas', desc: 'Machine Learning, Cognitive Science, Human-Computer Interaction, and AI alignment.' },
    { icon: <Award size={20} />, title: 'Awards', desc: 'NSF Graduate Research Fellowship, CRA Outstanding Undergraduate Researcher.' },
  ];

  return (
    <section id="about" className="scroll-mt-32">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
        <h2 className="text-3xl font-bold mb-4">About Me</h2>
        <div className="w-12 h-1 bg-[var(--color-accent)] rounded-full mb-8"></div>
        <div className="text-[var(--color-text-sub)] leading-relaxed max-w-3xl space-y-4 text-lg">
          <p>My academic journey is driven by a fundamental curiosity about how humans learn and how we can build machines that learn in similar, robust ways.</p>
          <p>Outside of my research, I am passionate about teaching, mentoring undergraduate students, and writing about the societal impacts of artificial intelligence.</p>
        </div>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-6">
        {highlights.map((item, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[var(--color-accent)] flex items-center justify-center mb-4">
              {item.icon}
            </div>
            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
            <p className="text-[var(--color-text-sub)] leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
