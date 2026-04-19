import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const blogData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(blogData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'blogs');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section id="blog" className="scroll-mt-32">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="text-3xl font-bold mb-4">Writing & Thoughts</h2>
          <div className="w-12 h-1 bg-[var(--color-accent)] rounded-full mb-8"></div>
          <p className="text-[var(--color-text-sub)] max-w-xl text-lg">
            Occasional essays on artificial intelligence, academia, and technology.
          </p>
        </div>
        <a href="#" className="text-[var(--color-accent)] font-medium hover:underline underline-offset-4 pb-2">
          View all posts &rarr;
        </a>
      </motion.div>
      
      {loading ? (
        <div className="text-center py-12 text-[var(--color-text-sub)]">Loading posts...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 text-[var(--color-text-sub)] bg-[var(--color-bg-card)] rounded-2xl border border-[var(--color-border)]">
          No posts published yet. Check back soon!
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="group cursor-pointer flex flex-col h-full">
              <div className="aspect-[4/3] bg-gray-200 rounded-2xl mb-6 overflow-hidden relative">
                <img src={`https://picsum.photos/seed/blog${index}/600/400`} alt={post.title} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex items-center gap-3 text-sm text-[var(--color-text-sub)] mb-3">
                <span>{post.date}</span>
                <span className="w-1 h-1 rounded-full bg-[var(--color-border)]"></span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--color-accent)] transition-colors">{post.title}</h3>
              <p className="text-[var(--color-text-sub)] line-clamp-2 mt-auto">{post.desc}</p>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
