import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';
import '../styles/Layout.css';

const Layout = () => {
  return (
    <div className="layout">
      <Header subtitle="Chat application" />
      <div className="general-container">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;