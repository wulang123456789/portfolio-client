import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../api/index';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/posts?published=true')
      .then(res => setPosts(res.data.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-24 pb-16 px-6 md:px-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-16"
      >
        我的 <span className="text-purple-400">博客</span>
      </motion.h2>

      {loading ? (
        <p className="text-center text-gray-500">加载中...</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-500">暂无文章，请在后台发布。</p>
      ) : (
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-purple-500 transition"
            >
              {post.cover_url && (
                <img
                  src={post.cover_url}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
              )}
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags?.split(',').map(tag => (
                  <span key={tag} className="text-xs bg-gray-800 text-purple-400 px-3 py-1 rounded-full">
                    #{tag.trim()}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{post.content}</p>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-xs">
                  {new Date(post.createdAt).toLocaleDateString('zh-CN')}
                </span>
                <Link
                  to={`/blog/${post.id}`}
                  className="text-purple-400 text-sm hover:underline"
                >
                  阅读全文 →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}