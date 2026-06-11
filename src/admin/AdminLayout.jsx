import { Link, useNavigate, Outlet } from 'react-router-dom';

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {/* 侧边栏 */}
      <aside className="w-56 bg-gray-900 border-r border-gray-800 flex flex-col p-6 gap-2 fixed h-full">
        <h2 className="text-lg font-bold text-purple-400 mb-6">管理后台</h2>
        <Link to="/admin/posts"
          className="px-4 py-2 rounded-lg hover:bg-gray-800 transition text-gray-300 hover:text-white">
          📝 博客管理
        </Link>
        <Link to="/admin/projects"
          className="px-4 py-2 rounded-lg hover:bg-gray-800 transition text-gray-300 hover:text-white">
          🗂 作品集管理
        </Link>
        <Link to="/admin/messages"
          className="px-4 py-2 rounded-lg hover:bg-gray-800 transition text-gray-300 hover:text-white">
          💬 留言管理
        </Link>
        <div className="mt-auto">
          <button
            onClick={logout}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 hover:bg-red-900 text-gray-400 hover:text-red-400 transition text-sm"
          >
            退出登录
          </button>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className="ml-56 flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}