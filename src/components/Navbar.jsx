import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-gray-900 text-white z-50 px-6 py-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-lg font-bold tracking-widest">MY PORTFOLIO</Link>

        {/* 汉堡菜单按钮（手机显示） */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setOpen(!open)}
        >
          <span className={`block w-6 h-0.5 bg-white transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

        {/* 桌面端导航 */}
        <div className="hidden md:flex gap-6 text-sm">
          <Link to="/" className="hover:text-purple-400 transition">主页</Link>
          <Link to="/about" className="hover:text-purple-400 transition">关于</Link>
          <Link to="/portfolio" className="hover:text-purple-400 transition">Portfolio</Link>
          <Link to="/blog" className="hover:text-purple-400 transition">博客</Link>
          <Link to="/contact" className="hover:text-purple-400 transition">联系我</Link>
        </div>
      </div>

      {/* 手机端下拉菜单 */}
      {open && (
        <div className="md:hidden flex flex-col gap-4 pt-4 pb-2 text-sm">
          <Link to="/" onClick={() => setOpen(false)} className="hover:text-purple-400 transition">Home</Link>
          <Link to="/about" onClick={() => setOpen(false)} className="hover:text-purple-400 transition">About</Link>
          <Link to="/portfolio" onClick={() => setOpen(false)} className="hover:text-purple-400 transition">Portfolio</Link>
          <Link to="/blog" onClick={() => setOpen(false)} className="hover:text-purple-400 transition">Blog</Link>
          <Link to="/contact" onClick={() => setOpen(false)} className="hover:text-purple-400 transition">Contact</Link>
        </div>
      )}
    </nav>
  );
}