import { useEffect, useState } from 'react';
import api from '../api/index';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: '', desc: '', image_url: '', tech_stack: '', demo_url: '', github_url: '' });
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchProjects = () => {
    api.get('/projects', { headers }).then(res => setProjects(res.data));
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await api.put(`/projects/${editId}`, form, { headers });
      setEditId(null);
    } else {
      await api.post('/projects', form, { headers });
    }
    setForm({ name: '', desc: '', image_url: '', tech_stack: '', demo_url: '', github_url: '' });
    fetchProjects();
  };

  const handleEdit = (p) => {
    setEditId(p.id);
    setForm({ name: p.name, desc: p.desc || '', image_url: p.image_url || '', tech_stack: p.tech_stack || '', demo_url: p.demo_url || '', github_url: p.github_url || '' });
  };

  const handleDelete = async (id) => {
    if (!confirm('确定删除？')) return;
    await api.delete(`/projects/${id}`, { headers });
    fetchProjects();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">作品集管理</h2>
      <form onSubmit={handleSubmit} className="bg-gray-900 rounded-2xl p-6 mb-8 flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-purple-400">{editId ? '编辑项目' : '新增项目'}</h3>
        {[['name', '项目名称', true], ['desc', '项目描述', false], ['image_url', '图片 URL', false], ['tech_stack', '技术栈（逗号分隔）', false], ['demo_url', 'Demo 链接', false], ['github_url', 'GitHub 链接', false]].map(([key, placeholder, required]) => (
          <input key={key} placeholder={placeholder} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} required={required}
            className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-white outline-none focus:border-purple-500" />
        ))}
        <div className="flex gap-3">
          <button type="submit" className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-xl text-sm transition">
            {editId ? '保存修改' : '新增'}
          </button>
          {editId && (
            <button type="button" onClick={() => { setEditId(null); setForm({ name: '', desc: '', image_url: '', tech_stack: '', demo_url: '', github_url: '' }); }}
              className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-xl text-sm transition">取消</button>
          )}
        </div>
      </form>
      <div className="flex flex-col gap-4">
        {projects.map(p => (
          <div key={p.id} className="bg-gray-900 rounded-2xl p-5 border border-gray-800 flex justify-between items-start">
            <div>
              <h4 className="font-semibold mb-1">{p.name}</h4>
              <p className="text-gray-500 text-sm">{p.tech_stack}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(p)} className="text-sm text-purple-400 hover:underline">编辑</button>
              <button onClick={() => handleDelete(p.id)} className="text-sm text-red-400 hover:underline">删除</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}