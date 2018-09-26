import React from 'react';
import { Link } from 'gatsby';

const Header = ({ siteTitle }) => (
  <nav className="bg-purple-darker text-5xl m-0 mv-auto py-4 px-6">
    <Link to="/" className="text-grey-lightest no-underline">
      {siteTitle}
    </Link>
  </nav>
);

export default Header;
