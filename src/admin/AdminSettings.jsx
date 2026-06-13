import { useEffect, useState } from 'react';
import api from '../api/index';

export default function AdminSettings() {
  const [form, setForm] = useState({
    hero_image: '',
    hero_title: '',
    hero_subtitle: '',
    hero_tagline: '',
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    api.get('/settings').then(res => {
      setForm(prev => ({ ...prev, ...res.data }));
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('saving');
    try {
      await api.put('/settings', form);
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">网站设置</h2>
      <form onSubmit={handleSubmit} className="bg-gray-900 rounded-2xl p-6 flex flex-col gap-4 max-w-2xl">
        <h3 className="text-lg font-semibold text-purple-400">首页设置</h3>

        <div>
          <label className="text-sm text-gray-400 mb-1 block">头图 URL</label>
          <input
            placeholder="https://..."
            value={form.hero_image || ''}
            onChange={e => setForm({ ...form, hero_image: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-white outline-none focus:border-purple-500"
          />
          {form.hero_image && (
            <img src={form.hero_image} alt="预览" className="mt-3 w-full h-48 object-cover rounded-xl" />
          )}
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-1 block">欢迎语（小标签）</label>
          <input
            placeholder="欢迎浏览我的作品集"
            value={form.hero_tagline || ''}
            onChange={e => setForm({ ...form, hero_tagline: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-white outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-1 block">主标题</label>
          <input
            placeholder="Hi, I'm 浪浪锵锵"
            value={form.hero_title || ''}
            onChange={e => setForm({ ...form, hero_title: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-white outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-1 block">副标题</label>
          <input
            placeholder="Full Stack Developer & Creative Thinker"
            value={form.hero_subtitle || ''}
            onChange={e => setForm({ ...form, hero_subtitle: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-white outline-none focus:border-purple-500"
          />
        </div>

        <button type="submit" className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-xl text-sm transition mt-2">
          保存设置
        </button>

        {status === 'success' && <p className="text-green-400 text-sm">✅ 保存成功！</p>}
        {status === 'error' && <p className="text-red-400 text-sm">❌ 保存失败</p>}
      </form>
    </div>
  );
}