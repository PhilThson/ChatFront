import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import '../styles/Layout.css';

const Layout = () => {
  return (
    <div className="layout">
      <div className="container">
        <Header subtitle="Chat application" />
        <div className="content">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;