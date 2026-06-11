import { motion } from 'framer-motion';

const skills = [
  { name: 'React', level: 85 },
  { name: 'Node.js / Express', level: 80 },
  { name: 'MySQL', level: 75 },
  { name: 'Tailwind CSS', level: 90 },
  { name: 'JavaScript', level: 88 },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gray-950 text-white pt-24 pb-16 px-6 md:px-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-16"
      >
        关于 <span className="text-purple-400">我</span>
      </motion.h2>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
        {/* 左侧：简介 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-purple-400">我是谁？</h3>
          <p className="text-gray-400 leading-relaxed mb-4">
            你好！我是一名全栈开发者，热爱用代码创造有意义的产品。我擅长前端界面设计与后端 API 开发，喜欢将创意转化为现实。
          </p>
          <p className="text-gray-400 leading-relaxed mb-8">
            业余时间我喜欢写博客、做开源项目，持续探索新技术。
          </p>

          <div className="flex gap-4">
            
             <a href="/resume.pdf"
             download="伍浪-简历.pdf"
              className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full text-sm transition text-white"
            >
              下载简历
            </a>
            <a
              href="https://github.com"
              target="_blank"
              className="border border-gray-600 hover:border-purple-400 text-gray-400 hover:text-purple-400 px-6 py-2 rounded-full text-sm transition"
            >
              GitHub
            </a>
          </div>
        </motion.div>

        {/* 右侧：技能条 */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-semibold mb-6 text-purple-400">技能</h3>
          {skills.map((skill, i) => (
            <div key={skill.name} className="mb-5">
              <div className="flex justify-between text-sm mb-1">
                <span>{skill.name}</span>
                <span className="text-gray-500">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                  className="bg-purple-500 h-2 rounded-full"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}