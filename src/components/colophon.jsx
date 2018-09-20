import React from 'react';
import { Link } from 'gatsby';
import {
  FaGithub,
  FaLinkedin,
  FaMastodon,
  FaRavelry,
  FaTwitter,
} from 'react-icons/fa';

const Colophon = () => (
  <div id="colophon" className="flex flex-col max-w-full">
    <h2 className="flex justify-start my-1 sm:justify-center sm:my-2">
      Colophon
    </h2>
    <ul id="socialLinks" className="list-reset flex justify-around">
      <li id="github" mr-2>
        <Link to="https://github.com/ericpoe" title="Eric Poe's github account">
          <FaGithub />
        </Link>
      </li>
      <li id="twitter" mr-2>
        <Link to="https://twitter.com/eric_poe" title="Eric Poe's twitter">
          <FaTwitter />
        </Link>
      </li>
      <li id="mastodon" mr-2>
        <Link
          to="https://mastodon.technology/@ericpoe"
          title="Eric Poe's mastodon"
        >
          <FaMastodon />
        </Link>
      </li>
      <li id="ravelry" mr-2>
        <Link
          to="https://www.ravelry.com/people/ericpoe"
          title="Eric Poe's ravelry"
        >
          <FaRavelry />
        </Link>
      </li>
      <li id="linkedin" mr-2>
        <Link
          to="https://www.linkedin.com/in/ericpoe/"
          title="Eric Poe's LinkedIn"
        >
          <FaLinkedin />
        </Link>
      </li>
    </ul>
    <p className="mt-6">
      This site is built using{' '}
      <Link to="https://www.gatsbyjs.org/" title="main site for gatsbyjs.org">
        Gatsby
      </Link>{' '}
      and{' '}
      <Link to="https://tailwindcss.com/" title="main site for tailwindcss.com">
        TailwindCSS
      </Link>
    </p>
  </div>
);

export default Colophon;
