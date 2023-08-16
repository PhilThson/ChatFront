import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="layout">
      <Header subtitle="Chat application" />
      <main>
        <Sidebar />
        <div className="content">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
