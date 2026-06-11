import { useEffect, useState } from 'react';
import api from '../api/index';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchMessages = () => {
    api.get('/messages', { headers }).then(res => setMessages(res.data));
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleRead = async (id) => {
    await api.put(`/messages/${id}/read`, {}, { headers });
    fetchMessages();
  };

  const handleDelete = async (id) => {
    if (!confirm('确定删除？')) return;
    await api.delete(`/messages/${id}`, { headers });
    fetchMessages();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">留言管理</h2>
      <div className="flex flex-col gap-4">
        {messages.length === 0 && <p className="text-gray-500">暂无留言</p>}
        {messages.map(msg => (
          <div key={msg.id} className={`bg-gray-900 rounded-2xl p-5 border ${msg.read ? 'border-gray-800' : 'border-purple-500'} `}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="font-semibold">{msg.name}</span>
                <span className="text-gray-500 text-sm ml-2">{msg.email}</span>
                {!msg.read && <span className="ml-2 text-xs bg-purple-600 px-2 py-0.5 rounded-full">新</span>}
              </div>
              <span className="text-gray-600 text-xs">{new Date(msg.createdAt).toLocaleDateString('zh-CN')}</span>
            </div>
            <p className="text-gray-400 text-sm mb-3">{msg.content}</p>
            <div className="flex gap-3">
              {!msg.read && (
                <button onClick={() => handleRead(msg.id)} className="text-sm text-purple-400 hover:underline">标记已读</button>
              )}
              <button onClick={() => handleDelete(msg.id)} className="text-sm text-red-400 hover:underline">删除</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}