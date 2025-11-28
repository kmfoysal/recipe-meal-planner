import Footer from './Footer';
import Header from './Header';

const Layout = ({ children, onToggleSidebar, isSidebarOpen }) => {
  return (
    <div className="app-layout">
      <Header onToggleSidebar={onToggleSidebar} isSidebarOpen={isSidebarOpen} />
      <main className="app-main">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
