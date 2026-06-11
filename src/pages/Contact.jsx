import { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api/index';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', content: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await api.post('/messages', form);
      setStatus('success');
      setForm({ name: '', email: '', content: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-24 pb-16 px-6 md:px-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-16"
      >
        联系 <span className="text-purple-400">我</span>
      </motion.h2>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
        {/* 左侧：联系信息 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-semibold mb-6 text-purple-400">保持联系</h3>
          <p className="text-gray-400 leading-relaxed mb-8">
            无论是项目合作、工作机会还是简单的问候，都欢迎给我发消息！
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-gray-400">
              <span className="text-purple-400 text-xl">📧</span>
              <span>your@email.com</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <span className="text-purple-400 text-xl">📍</span>
              <span>你的城市，中国</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <span className="text-purple-400 text-xl">💼</span>
              <span>目前开放工作机会</span>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <a href="https://github.com" target="_blank"
              className="border border-gray-700 hover:border-purple-400 text-gray-400 hover:text-purple-400 px-5 py-2 rounded-full text-sm transition">
              GitHub
            </a>
            <a href="https://linkedin.com" target="_blank"
              className="border border-gray-700 hover:border-purple-400 text-gray-400 hover:text-purple-400 px-5 py-2 rounded-full text-sm transition">
              LinkedIn
            </a>
          </div>
        </motion.div>

        {/* 右侧：表单 */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              type="text"
              name="name"
              placeholder="你的名字"
              value={form.name}
              onChange={handleChange}
              required
              className="bg-gray-900 border border-gray-700 focus:border-purple-500 outline-none rounded-xl px-4 py-3 text-white placeholder-gray-500 transition"
            />
            <input
              type="email"
              name="email"
              placeholder="你的邮箱"
              value={form.email}
              onChange={handleChange}
              required
              className="bg-gray-900 border border-gray-700 focus:border-purple-500 outline-none rounded-xl px-4 py-3 text-white placeholder-gray-500 transition"
            />
            <textarea
              name="content"
              placeholder="你的留言..."
              value={form.content}
              onChange={handleChange}
              required
              rows={5}
              className="bg-gray-900 border border-gray-700 focus:border-purple-500 outline-none rounded-xl px-4 py-3 text-white placeholder-gray-500 transition resize-none"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white py-3 rounded-xl font-medium transition"
            >
              {status === 'sending' ? '发送中...' : '发送消息'}
            </button>

            {status === 'success' && (
              <p className="text-green-400 text-center">✅ 留言发送成功！</p>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-center">❌ 发送失败，请稍后再试。</p>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
}