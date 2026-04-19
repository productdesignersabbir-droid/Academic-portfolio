import { useState, useEffect, FormEvent } from 'react';
import { auth, db, loginWithGoogle, logout, handleFirestoreError, OperationType } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { Trash2, Edit2, Plus, LogOut, Link as LinkIcon } from 'lucide-react';

export function Admin() {
  const [user, setUser] = useState(auth.currentUser);
  const [isAuthReady, setIsAuthReady] = useState(false);
  
  const [blogs, setBlogs] = useState<any[]>([]);
  const [cvUrl, setCvUrl] = useState('');
  
  const [isEditingBlog, setIsEditingBlog] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({ id: '', title: '', desc: '', content: '', date: '', readTime: '' });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAuthReady || !user) return;

    const unsubscribeBlogs = onSnapshot(collection(db, 'blogs'), (snapshot) => {
      const blogData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Sort by date or createdAt if needed, but for now just set
      setBlogs(blogData);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'blogs');
    });

    const unsubscribeSettings = onSnapshot(doc(db, 'settings', 'cv'), (docSnap) => {
      if (docSnap.exists()) {
        setCvUrl(docSnap.data().url || '');
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'settings/cv');
    });

    return () => {
      unsubscribeBlogs();
      unsubscribeSettings();
    };
  }, [isAuthReady, user]);

  const handleSaveCV = async () => {
    try {
      await setDoc(doc(db, 'settings', 'cv'), { url: cvUrl });
      alert('CV URL saved successfully!');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'settings/cv');
    }
  };

  const handleSaveBlog = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const blogData = {
        title: currentBlog.title,
        desc: currentBlog.desc,
        content: currentBlog.content,
        date: currentBlog.date,
        readTime: currentBlog.readTime,
      };

      if (currentBlog.id) {
        await updateDoc(doc(db, 'blogs', currentBlog.id), blogData);
      } else {
        await addDoc(collection(db, 'blogs'), {
          ...blogData,
          createdAt: serverTimestamp()
        });
      }
      setIsEditingBlog(false);
      setCurrentBlog({ id: '', title: '', desc: '', content: '', date: '', readTime: '' });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'blogs');
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      await deleteDoc(doc(db, 'blogs', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `blogs/${id}`);
    }
  };

  if (!isAuthReady) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
          <button 
            onClick={loginWithGoogle}
            className="w-full bg-[var(--color-accent)] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold">Content Management</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user.email}</span>
            <button onClick={logout} className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <LinkIcon size={20} /> CV Link
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Google Drive / PDF URL</label>
                  <input 
                    type="url" 
                    value={cvUrl}
                    onChange={(e) => setCvUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                    placeholder="https://..."
                  />
                </div>
                <button 
                  onClick={handleSaveCV}
                  className="w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-800 transition-colors"
                >
                  Save CV Link
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Blog Posts</h2>
                {!isEditingBlog && (
                  <button 
                    onClick={() => {
                      setCurrentBlog({ id: '', title: '', desc: '', content: '', date: '', readTime: '' });
                      setIsEditingBlog(true);
                    }}
                    className="flex items-center gap-2 bg-[var(--color-accent)] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                  >
                    <Plus size={16} /> New Post
                  </button>
                )}
              </div>

              {isEditingBlog ? (
                <form onSubmit={handleSaveBlog} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input required type="text" value={currentBlog.title} onChange={e => setCurrentBlog({...currentBlog, title: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date (e.g., Oct 12, 2025)</label>
                      <input required type="text" value={currentBlog.date} onChange={e => setCurrentBlog({...currentBlog, date: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Read Time (e.g., 5 min read)</label>
                      <input required type="text" value={currentBlog.readTime} onChange={e => setCurrentBlog({...currentBlog, readTime: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                    <textarea required value={currentBlog.desc} onChange={e => setCurrentBlog({...currentBlog, desc: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" rows={2}></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content (Markdown/Text)</label>
                    <textarea required value={currentBlog.content} onChange={e => setCurrentBlog({...currentBlog, content: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" rows={8}></textarea>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button type="submit" className="bg-[var(--color-accent)] text-white px-6 py-2 rounded-md font-medium">Save Post</button>
                    <button type="button" onClick={() => setIsEditingBlog(false)} className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md font-medium">Cancel</button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  {blogs.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No blog posts yet.</p>
                  ) : (
                    blogs.map(blog => (
                      <div key={blog.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                        <div>
                          <h3 className="font-bold">{blog.title}</h3>
                          <p className="text-sm text-gray-500">{blog.date} &bull; {blog.readTime}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => { setCurrentBlog(blog); setIsEditingBlog(true); }} className="p-2 text-gray-600 hover:text-[var(--color-accent)] hover:bg-blue-50 rounded-md">
                            <Edit2 size={18} />
                          </button>
                          <button onClick={() => handleDeleteBlog(blog.id)} className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
