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
    <h2 className="flex justify-start my-1 justify-center pb-1">Colophon</h2>
    <section id="socialLinks">
      <ul className="list-reset flex justify-around">
        <li id="github" mr-2>
          <a
            href="https://github.com/ericpoe"
            title="Eric Poe's github account"
            className="no-underline"
          >
            <FaGithub />
          </a>
        </li>
        <li id="twitter" mr-2>
          <a
            href="https://twitter.com/eric_poe"
            title="Eric Poe's twitter"
            className="no-underline"
          >
            <FaTwitter />
          </a>
        </li>
        <li id="mastodon" mr-2>
          <a
            href="https://mastodon.technology/@ericpoe"
            title="Eric Poe's mastodon"
            className="no-underline"
          >
            <FaMastodon />
          </a>
        </li>
        <li id="ravelry" mr-2>
          <a
            href="https://www.ravelry.com/projects/ericpoe"
            title="Eric Poe's fabric projects on ravelry"
            className="no-underline"
          >
            <FaRavelry />
          </a>
        </li>
        <li id="linkedin" mr-2>
          <a
            href="https://www.linkedin.com/in/ericpoe/"
            title="Eric Poe's LinkedIn"
            className="no-underline"
          >
            <FaLinkedin />
          </a>
        </li>
      </ul>
    </section>
    <section id="colophonInfo">
      <p className="mt-6">
        This site is built using{' '}
        <a href="https://www.gatsbyjs.org/" title="main site for gatsbyjs.org">
          Gatsby
        </a>
        ,{' '}
        <a
          href="https://tailwindcss.com/"
          title="main site for tailwindcss.com"
        >
          TailwindCSS
        </a>
        , and a{' '}
        <a
          href="https://github.com/ericpoe/ericpoe.com/blob/master/package.json"
          title="This site's JavaScript requirements"
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
    </section>
  </React.Fragment>
);

export default Colophon;
