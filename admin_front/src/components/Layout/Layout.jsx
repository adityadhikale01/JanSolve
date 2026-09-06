import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar.jsx';
import Footer from './Footer/Footer.jsx';
import './Layout.css';

function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`layout-container ${collapsed ? 'layout-sidebar-collapsed' : ''}`}>
      <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className="main-content" onClick={() => setCollapsed(true)}>
        <Outlet />
      </main>
      <Footer  />
    </div>
  );
}

export default Layout;
