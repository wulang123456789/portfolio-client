import { useEffect, useState } from 'react';
import api from '../api/index';

export default function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: '', content: '', tags: '', cover_url: '', published: false });
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchPosts = () => {
    api.get('/posts', { headers }).then(res => setPosts(res.data.data));
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await api.put(`/posts/${editId}`, form, { headers });
      setEditId(null);
    } else {
      await api.post('/posts', form, { headers });
    }
    setForm({ title: '', content: '', tags: '', cover_url: '', published: false });
    fetchPosts();
  };

  const handleEdit = (post) => {
    setEditId(post.id);
    setForm({ title: post.title, content: post.content, tags: post.tags || '', cover_url: post.cover_url || '', published: post.published });
  };

  const handleDelete = async (id) => {
    if (!confirm('确定删除？')) return;
    await api.delete(`/posts/${id}`, { headers });
    fetchPosts();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">博客管理</h2>

      {/* 表单 */}
      <form onSubmit={handleSubmit} className="bg-gray-900 rounded-2xl p-6 mb-8 flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-purple-400">{editId ? '编辑文章' : '新增文章'}</h3>
        <input placeholder="标题" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required
          className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-white outline-none focus:border-purple-500" />
        <textarea placeholder="内容" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required rows={4}
          className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-white outline-none focus:border-purple-500 resize-none" />
        <input placeholder="标签（逗号分隔）" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })}
          className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-white outline-none focus:border-purple-500" />
        <input placeholder="封面图片 URL" value={form.cover_url} onChange={e => setForm({ ...form, cover_url: e.target.value })}
          className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-white outline-none focus:border-purple-500" />
        <label className="flex items-center gap-2 text-gray-400 text-sm">
          <input type="checkbox" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} />
          发布文章
        </label>
        <div className="flex gap-3">
          <button type="submit" className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-xl text-sm transition">
            {editId ? '保存修改' : '新增'}
          </button>
          {editId && (
            <button type="button" onClick={() => { setEditId(null); setForm({ title: '', content: '', tags: '', cover_url: '', published: false }); }}
              className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-xl text-sm transition">
              取消
            </button>
          )}
        </div>
      </form>

      {/* 列表 */}
      <div className="flex flex-col gap-4">
        {posts.map(post => (
          <div key={post.id} className="bg-gray-900 rounded-2xl p-5 border border-gray-800 flex justify-between items-start">
            <div>
              <h4 className="font-semibold mb-1">{post.title}</h4>
              <p className="text-gray-500 text-sm">{post.published ? '✅ 已发布' : '📝 草稿'} · {new Date(post.createdAt).toLocaleDateString('zh-CN')}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(post)} className="text-sm text-purple-400 hover:underline">编辑</button>
              <button onClick={() => handleDelete(post.id)} className="text-sm text-red-400 hover:underline">删除</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}