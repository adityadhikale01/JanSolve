import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar.jsx';
import Footer from './Footer/Footer.jsx';
import './Layout.css';

function Layout() {
  return (
    <div className="layout-container">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    <Footer />
    </div>
  );
}

export default Layout;
