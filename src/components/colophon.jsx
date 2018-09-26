import React from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaMastodon,
  FaRavelry,
  FaTwitter,
} from 'react-icons/fa';

const Colophon = () => (
  <React.Fragment>
    <h2 className="flex justify-start my-1 justify-center">Colophon</h2>
    <ul id="socialLinks" className="list-reset flex justify-around no-underline text-purple-darkest">
      <li id="github" mr-2>
        <a href="https://github.com/ericpoe" title="Eric Poe's github account">
          <FaGithub />
        </a>
      </li>
      <li id="twitter" mr-2>
        <a href="https://twitter.com/eric_poe" title="Eric Poe's twitter">
          <FaTwitter />
        </a>
      </li>
      <li id="mastodon" mr-2>
        <a
          href="https://mastodon.technology/@ericpoe"
          title="Eric Poe's mastodon"
        >
          <FaMastodon />
        </a>
      </li>
      <li id="ravelry" mr-2>
        <a
          href="https://www.ravelry.com/people/ericpoe"
          title="Eric Poe's ravelry"
        >
          <FaRavelry />
        </a>
      </li>
      <li id="linkedin" mr-2>
        <a
          href="https://www.linkedin.com/in/ericpoe/"
          title="Eric Poe's LinkedIn"
        >
          <FaLinkedin />
        </a>
      </li>
    </ul>
    <p className="mt-6">
      This site is built using{' '}
      <a href="https://www.gatsbyjs.org/" title="main site for gatsbyjs.org">
        Gatsby
      </a>
      ,{' '}
      <a href="https://tailwindcss.com/" title="main site for tailwindcss.com">
        TailwindCSS
      </a>
      , and a{' '}
      <a
        href="https://github.com/ericpoe/ericpoe.com"
        title="github repository for this site"
      >
        whole bunch of other fun stuff
      </a>
      .
    </p>
    <p className="mt-2">
      Corrections or curious to see how this was put together? Check out the
      latest version of this site at its{' '}
      <a
        href="https://github.com/ericpoe/ericpoe.com"
        title="github repository for this site"
      >
        github repo
      </a>
      .
    </p>
  </React.Fragment>
);

export default Colophon;
