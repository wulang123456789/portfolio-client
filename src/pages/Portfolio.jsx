import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api/index';

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/projects')
      .then(res => setProjects(res.data))
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
        我的 <span className="text-purple-400">作品集</span>
      </motion.h2>

      {loading ? (
        <p className="text-center text-gray-500">加载中...</p>
      ) : projects.length === 0 ? (
        <p className="text-center text-gray-500">暂无作品，尽情期待</p>
      ) : (
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-purple-500 transition group"
            >
              {project.image_url && (
                <img
                  src={project.image_url}
                  alt={project.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{project.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech_stack?.split(',').map(tech => (
                    <span key={tech} className="text-xs bg-gray-800 text-purple-400 px-3 py-1 rounded-full">
                      {tech.trim()}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {project.demo_url && (
                    <a href={project.demo_url} target="_blank"
                      className="text-sm text-purple-400 hover:underline">
                      Demo ↗
                    </a>
                  )}
                  {project.github_url && (
                    <a href={project.github_url} target="_blank"
                      className="text-sm text-gray-400 hover:underline">
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}