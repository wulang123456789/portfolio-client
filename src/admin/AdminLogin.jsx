import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/index';

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/admin/posts');
    } catch (err) {
      setError('用户名或密码错误');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-white text-center mb-8">后台登录</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="用户名"
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
            required
            className="bg-gray-800 border border-gray-700 focus:border-purple-500 outline-none rounded-xl px-4 py-3 text-white placeholder-gray-500"
          />
          <input
            type="password"
            placeholder="密码"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
            className="bg-gray-800 border border-gray-700 focus:border-purple-500 outline-none rounded-xl px-4 py-3 text-white placeholder-gray-500"
          />
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-medium transition mt-2"
          >
            登录
          </button>
        </form>
      </div>
    </div>
  );
}