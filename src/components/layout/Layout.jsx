import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, onToggleSidebar }) => {
  return (
    <div className="app-layout">
      <Header onToggleSidebar={onToggleSidebar} />
      <main className="app-main">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
