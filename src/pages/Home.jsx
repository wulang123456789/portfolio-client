import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../api/index';

export default function Home() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    api.get('/settings').then(res => setSettings(res.data)).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="min-h-screen flex flex-col md:flex-row items-center pt-20 md:pt-0">

        {/* 左侧：文字 */}
        <div className="flex-1 flex flex-col items-start justify-center text-left px-6 md:px-16 order-2 md:order-1">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-purple-400 tracking-widest text-sm mb-4 uppercase"
          >
            {settings.hero_tagline || '欢迎浏览我的作品集'}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            {settings.hero_title || "Hi, I'm 浪浪锵锵"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-400 text-lg md:text-2xl mb-10 max-w-xl"
          >
            {settings.hero_subtitle || 'Full Stack Developer & Creative Thinker'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex gap-4"
          >
            <Link
              to="/portfolio"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full transition font-medium"
            >
              查看我的作品
            </Link>
            <Link
              to="/contact"
              className="border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-3 rounded-full transition font-medium"
            >
              联系我
            </Link>
          </motion.div>
        </div>

        {/* 右侧：图片 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="flex-1 w-full md:h-screen order-1 md:order-2"
        >
          <img
            src={settings.hero_image || '/profile.jpg'}
            alt="个人照片"
            className="w-full h-64 md:h-full object-cover"
          />
        </motion.div>
      </div>

      {/* 技能标签区 */}
      <div className="pb-20 pt-10 flex flex-wrap justify-center gap-3 px-4">
        {['React', 'Node.js', 'Express', 'MySQL', 'Tailwind CSS', 'JavaScript'].map((skill) => (
          <span
            key={skill}
            className="border border-gray-700 text-gray-400 px-4 py-2 rounded-full text-sm hover:border-purple-400 hover:text-purple-400 transition"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}