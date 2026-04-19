import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Download, FileText } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export function CV() {
  const [cvUrl, setCvUrl] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'cv'), (docSnap) => {
      if (docSnap.exists()) {
        setCvUrl(docSnap.data().url);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'settings/cv');
    });

    return () => unsubscribe();
  }, []);

  return (
    <section id="cv" className="scroll-mt-32">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-[var(--color-bg-card)] rounded-3xl p-12 border border-[var(--color-border)] text-center shadow-sm">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-[var(--color-accent)]">
          <FileText size={32} />
        </div>
        <h2 className="text-3xl font-bold mb-4">Curriculum Vitae</h2>
        <p className="text-[var(--color-text-sub)] mb-8 max-w-xl mx-auto text-lg">
          A complete overview of my academic background, research experience, teaching roles, and publications.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href={cvUrl || '#'} 
            target={cvUrl ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors w-full sm:w-auto justify-center"
          >
            <Download size={20} /> Download Full CV (PDF)
          </a>
          <a 
            href={cvUrl || '#'} 
            target={cvUrl ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-[var(--color-text-main)] border border-[var(--color-border)] px-8 py-4 rounded-lg font-medium hover:border-gray-400 transition-colors w-full sm:w-auto justify-center"
          >
            View Online
          </a>
        </div>
      </motion.div>
    </section>
  );
}
