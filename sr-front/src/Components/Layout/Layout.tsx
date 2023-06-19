import * as React from 'react';
import './Layout.css';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className="container mx-auto">
      <header className="header">
        <div className="relative mt-2 rounded-md">
          <input
            type="text"
            placeholder="Search"
            className="block bg-gray-100 w-full rounded-md border-0 py-1.5 px-4 text-gray-900 placeholder:text-gray-400"
          />
        </div>
      </header>
      <Outlet />
      <footer className="footer">
        <div className="container">
          <div className="footer__bottom">
            <p className="footer__text">
              &copy; 2023 Shared Rentals - All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
