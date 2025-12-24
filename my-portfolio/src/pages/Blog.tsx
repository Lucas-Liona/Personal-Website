import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAllPosts } from '../lib/blog';
import { getAllMocs } from '../lib/moc';

const Blog = () => {
  const posts = getAllPosts();
  const mocs = getAllMocs();

  return (
    <div className="pt-20">
      <section className="bg-slate-50 dark:bg-dark-100 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-dark dark:text-light">Docs</h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Notes on what I’m building and learning.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {mocs.length > 0 && (
            <div className="max-w-3xl mx-auto mb-10">
              <h2 className="text-2xl font-bold text-dark dark:text-light mb-4">Maps of Content</h2>
              <div className="space-y-4">
                {mocs.slice(0, 3).map((moc) => (
                  <div key={moc.slug} className="bg-white dark:bg-dark-100 rounded-lg shadow-md dark:shadow-black/20 p-5">
                    <Link to={`/moc/${moc.slug}`} className="block">
                      <div className="text-lg font-bold text-dark dark:text-light hover:text-primary dark:hover:text-primary transition-colors">
                        {moc.title}
                      </div>
                      {moc.date && <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{moc.date}</div>}
                    </Link>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link to="/moc" className="text-primary hover:underline">
                  View all MOCs →
                </Link>
              </div>
            </div>
          )}

          {posts.length === 0 ? (
            <div className="max-w-3xl mx-auto text-center text-slate-600 dark:text-slate-300">
              No posts yet.
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-6">
              {posts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-dark-100 rounded-lg shadow-md dark:shadow-black/20 p-6"
                >
                  <Link to={`/docs/${post.slug}`} className="block">
                    <h2 className="text-2xl font-bold text-dark dark:text-light hover:text-primary dark:hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    {post.date && <p className="text-slate-500 dark:text-slate-400 mt-1">{post.date}</p>}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
