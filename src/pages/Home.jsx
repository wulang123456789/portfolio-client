import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero 区域 */}
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-purple-400 tracking-widest text-sm mb-4 uppercase"
        >
         欢迎浏览我的作品集
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-7xl font-bold mb-6"
        >
          Hi, I'm <span className="text-purple-400">浪浪锵锵</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-gray-400 text-xl md:text-2xl mb-10 max-w-xl"
        >
          Full Stack Developer & Creative Thinker
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

      {/* 技能标签区 */}
      <div className="pb-20 flex flex-wrap justify-center gap-3 px-4">
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