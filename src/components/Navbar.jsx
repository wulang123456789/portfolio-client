import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-gray-900 text-white z-50 px-8 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold tracking-widest">MY PORTFOLIO</Link>
      <div className="flex gap-6 text-sm">
        <Link to="/" className="hover:text-purple-400 transition">Home</Link>
        <Link to="/about" className="hover:text-purple-400 transition">About</Link>
        <Link to="/portfolio" className="hover:text-purple-400 transition">Portfolio</Link>
        <Link to="/blog" className="hover:text-purple-400 transition">Blog</Link>
        <Link to="/contact" className="hover:text-purple-400 transition">Contact</Link>
      </div>
    </nav>
  );
}