import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api/index';

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(() => navigate('/blog'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <p className="text-gray-500">加载中...</p>
    </div>
  );

  if (!post) return null;

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-24 pb-16 px-6 md:px-20">
      <div className="max-w-3xl mx-auto">
        {/* 返回按钮 */}
        <button
          onClick={() => navigate('/blog')}
          className="text-gray-400 hover:text-purple-400 transition mb-8 flex items-center gap-2 text-sm"
        >
          ← 返回博客列表
        </button>

        {/* 封面图 */}
        {post.cover_url && (
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            src={post.cover_url}
            alt={post.title}
            className="w-full h-64 object-cover rounded-2xl mb-8"
          />
        )}

        {/* 标签 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags?.split(',').map(tag => (
            <span key={tag} className="text-xs bg-gray-800 text-purple-400 px-3 py-1 rounded-full">
              #{tag.trim()}
            </span>
          ))}
        </div>

        {/* 标题 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl font-bold mb-4"
        >
          {post.title}
        </motion.h1>

        {/* 发布时间 */}
        <p className="text-gray-500 text-sm mb-8">
          发布于 {new Date(post.createdAt).toLocaleDateString('zh-CN', {
            year: 'numeric', month: 'long', day: 'numeric'
          })}
        </p>

        {/* 分割线 */}
        <hr className="border-gray-800 mb-8" />

        {/* 正文内容 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-300 leading-relaxed whitespace-pre-wrap text-lg"
        >
          {post.content}
        </motion.div>

        {/* 底部返回 */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <button
            onClick={() => navigate('/blog')}
            className="text-purple-400 hover:underline text-sm"
          >
            ← 返回博客列表
          </button>
        </div>
      </div>
    </div>
  );
}