import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export function Research() {
  const papers = [
    { title: 'Neural Architectures for Cognitive Reasoning', venue: 'NeurIPS 2025', type: 'Conference Paper', desc: 'Proposing a novel architecture that integrates symbolic reasoning with deep learning to improve generalization in novel environments.', link: '#' },
    { title: 'Human-in-the-loop Reinforcement Learning', venue: 'ICML 2024', type: 'Journal Article', desc: 'An empirical study on the effects of human feedback timing on the convergence rate of RL agents in complex control tasks.', link: '#' },
    { title: 'Evaluating Bias in Large Language Models', venue: 'ACL 2024', type: 'Workshop Paper', desc: 'A comprehensive framework for detecting and mitigating subtle demographic biases in generative language models.', link: '#' },
  ];

  return (
    <section id="research" className="scroll-mt-32">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Research Highlights</h2>
        <div className="w-12 h-1 bg-[var(--color-accent)] rounded-full mb-8"></div>
        <p className="text-[var(--color-text-sub)] max-w-2xl text-lg">
          Selected publications and ongoing projects. My work primarily focuses on bridging the gap between human cognitive models and machine learning architectures.
        </p>
      </motion.div>
      <div className="flex flex-col gap-6">
        {papers.map((paper, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="group bg-[var(--color-bg-card)] p-8 rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)] bg-blue-50 px-3 py-1 rounded-full">{paper.type}</span>
                <span className="text-sm font-medium text-[var(--color-text-sub)]">{paper.venue}</span>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--color-accent)] transition-colors">{paper.title}</h3>
              <p className="text-[var(--color-text-sub)] leading-relaxed max-w-3xl">{paper.desc}</p>
            </div>
            <a href={paper.link} className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[var(--color-border)] group-hover:bg-[var(--color-accent)] group-hover:text-white group-hover:border-[var(--color-accent)] transition-all shrink-0" aria-label="Read paper">
              <ArrowUpRight size={20} />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
