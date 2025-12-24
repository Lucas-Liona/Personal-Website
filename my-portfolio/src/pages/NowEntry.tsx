import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getNowEntryBySlug } from '../lib/now';

const NowEntry = () => {
  const { slug } = useParams();
  const entry = slug ? getNowEntryBySlug(slug) : null;

  if (!entry) {
    return (
      <div className="pt-20">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold mb-4 text-dark dark:text-light">Entry not found</h1>
              <Link to="/now/archive" className="text-primary hover:underline">
                ← Back to archive
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <section className="bg-slate-50 dark:bg-dark-100 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <Link to="/now/archive" className="text-primary hover:underline">
              ← Back to archive
            </Link>
            <h1 className="text-4xl font-bold mt-4 text-dark dark:text-light">{entry.title}</h1>
            {entry.date && <p className="text-slate-500 dark:text-slate-400 mt-2">{entry.date}</p>}
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-dark-100 rounded-lg shadow-md dark:shadow-black/20 p-6">
              <pre className="whitespace-pre-wrap text-slate-800 dark:text-slate-200 leading-relaxed">
                {entry.content}
              </pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NowEntry;
