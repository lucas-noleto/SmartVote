import React from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import PartidosContainer from '../components/PartidosContainer';


interface LayoutProps {
  children: React.ReactNode;
  showSearchBar?: boolean; // Flag para controlar a exibição da SearchBar e do PartidosContainer
}

const Layout: React.FC<LayoutProps> = ({ children, showSearchBar = false }) => {
  return (
    <div>
      <Navbar />
      {showSearchBar && (
        <>
          <SearchBar />
          <PartidosContainer />
        </>
      )}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
