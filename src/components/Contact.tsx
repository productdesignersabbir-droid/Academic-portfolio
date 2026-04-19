import { motion } from 'motion/react';
import { Mail, MapPin, Twitter, Linkedin, Github } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-32">
      <div className="grid md:grid-cols-2 gap-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <div className="w-12 h-1 bg-[var(--color-accent)] rounded-full mb-8"></div>
          <p className="text-[var(--color-text-sub)] mb-10 leading-relaxed max-w-md text-lg">
            I'm always open to discussing research collaborations, speaking opportunities, or just chatting about AI and cognitive science.
          </p>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-[var(--color-accent)]">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--color-text-sub)] mb-1">Email</p>
                <a href="mailto:hello@example.com" className="text-lg font-medium hover:text-[var(--color-accent)] transition-colors">hello@example.com</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-[var(--color-accent)]">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--color-text-sub)] mb-1">Location</p>
                <p className="text-lg font-medium">Stanford, CA</p>
              </div>
            </div>
          </div>
          <div className="mt-12 flex gap-4">
            <a href="#" className="w-12 h-12 rounded-full bg-[var(--color-bg-card)] flex items-center justify-center border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all text-[var(--color-text-sub)]"><Twitter size={20} /></a>
            <a href="#" className="w-12 h-12 rounded-full bg-[var(--color-bg-card)] flex items-center justify-center border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all text-[var(--color-text-sub)]"><Linkedin size={20} /></a>
            <a href="#" className="w-12 h-12 rounded-full bg-[var(--color-bg-card)] flex items-center justify-center border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all text-[var(--color-text-sub)]"><Github size={20} /></a>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-[var(--color-bg-card)] p-8 rounded-3xl border border-[var(--color-border)] shadow-sm">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[var(--color-text-main)] mb-2">Name</label>
              <input type="text" id="name" className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)] transition-all bg-white" placeholder="Jane Doe" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text-main)] mb-2">Email</label>
              <input type="email" id="email" className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)] transition-all bg-white" placeholder="jane@example.com" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[var(--color-text-main)] mb-2">Message</label>
              <textarea id="message" rows={4} className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)] transition-all bg-white resize-none" placeholder="How can I help you?"></textarea>
            </div>
            <button type="submit" className="w-full bg-[var(--color-accent)] text-white px-6 py-4 rounded-xl font-medium hover:bg-blue-700 transition-colors">Send Message</button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
