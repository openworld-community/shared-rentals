import * as React from 'react';
import './Layout.css';
import { Outlet } from 'react-router-dom';
import FB from '../../assets/fb.svg';
import Instagram from '../../assets/instagram.svg';
import Linkedin from '../../assets/linkedin.svg';
import Twitter from '../../assets/tw.svg';

type TSocialLinks = {
  link?: string;
  img: string;
  title?: string;
};

const social: TSocialLinks[] = [
  { link: '', img: FB, title: 'facebook' },
  { link: '', img: Instagram, title: 'Instagram' },
  { link: '', img: Linkedin, title: 'Linkedin' },
  { link: '', img: Twitter, title: 'Twitter' },
];

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
            <div className="block">
              <div className="footer__social">
                <ul className="footer__social__list">
                  {social.map((profile) => {
                    return (
                      <li
                        key={profile.title}
                        className="footer__social__list-item"
                      >
                        <a href="#">
                          <img src={profile.img} />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <p className="footer__text">
                &copy; 2023 Shared Rentals - All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
