import React from 'react';
import { Link } from 'gatsby';

const Header = ({ siteTitle }) => (
  <div className="bg-purple-darker">
    <div className="my-0 mv-auto max-w-md py-6 px-4">
      <div className="m-0 text-5xl">
        <Link to="/" className="text-grey-lightest no-underline">
          {siteTitle}
        </Link>
      </div>
    </div>
  </div>
);

export default Header;
