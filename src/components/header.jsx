import React from 'react';
import {Link} from 'gatsby';

const Header = function Header({ siteTitle }) {
  return (
    <nav className="bg-indigo-900 text-5xl m-0 mv-auto py-2 px-6">
      <Link to="/" className="text-gray-100 no-underline">
        {siteTitle}
      </Link>
    </nav>
  );
};

export default Header;
