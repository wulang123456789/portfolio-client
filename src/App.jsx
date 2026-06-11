import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminPosts from './admin/AdminPosts';
import AdminProjects from './admin/AdminProjects';
import AdminMessages from './admin/AdminMessages';
import PrivateRoute from './admin/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 前台 */}
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/about" element={<><Navbar /><About /></>} />
        <Route path="/portfolio" element={<><Navbar /><Portfolio /></>} />
        <Route path="/blog" element={<><Navbar /><Blog /></>} />
        <Route path="/blog/:id" element={<><Navbar /><BlogDetail /></>} />
        <Route path="/contact" element={<><Navbar /><Contact /></>} />

        {/* 后台登录 */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* 后台（需要登录） */}
        <Route path="/admin" element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }>
          <Route path="posts" element={<AdminPosts />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="messages" element={<AdminMessages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;