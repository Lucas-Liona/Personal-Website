import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPostBySlug } from '../lib/blog';

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug ? getPostBySlug(slug) : null;

  if (!post) {
    return (
      <div className="pt-20">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold mb-4">Post not found</h1>
              <Link to="/docs" className="text-primary hover:underline">
                ← Back to Docs
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <Link to="/docs" className="text-primary hover:underline">
              ← Back to Docs
            </Link>
            <h1 className="text-4xl font-bold mt-4">{post.title}</h1>
            {post.date && <p className="text-slate-500 mt-2">{post.date}</p>}
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
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <pre className="whitespace-pre-wrap text-slate-800 leading-relaxed">
                {post.content}
              </pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
