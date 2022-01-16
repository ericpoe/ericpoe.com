---
title: 'Learning JSX: React-Fragment'
date: '2018-09-17T04:53:36Z'
categories:
  - programming
tags:
  - javascript
  - reactjs
  - jsx
  - gatsbyjs
---

As I build this site using [gatsbyjs](https://www.gatsbyjs.org/), I find myself learning new things every day.

Today, I learned that, much like siblings on a road-trip, React components hate sitting next to each other.

When placing components next to each other, it's best to use a special JSX tag to tell those components that everything is going to be OK, that this road-trip is worth it.

In this example code, we have two components defined by other code: `Helmet` and `Layout`. You can see the full code at this site's [blog-post.jsx](https://github.com/ericpoe/ericpoe.com/blob/v1.2.2/src/templates/blog-post.jsx)

Bad:

```javascript
const blogPost = ({ data }) => {
	return (
		<Helmet
		title={post.frontmatter.title}
		/>
		<Layout>
		<div>
		  <h1>{post.frontmatter.title}</h1>
		  <p id="datePosted">
		    <strong>{post.frontmatter.date}</strong>
		  </p>
		  <p id="timeToRead">
		    <strong>Time to read: </strong>
		    {post.timeToRead} {post.timeToRead > 1 ? 'minutes' : 'minute'}
		  </p>
		  <div
		    id="blogContent"
		    dangerouslySetInnerHTML={{ __html: post.html }}
		  />
		</div>
		</Layout>
	);
};
```

When doing this, you get a fun React error that reads like "Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>?". I've known HTML for almost 25 years, I do not recognize that tag. What does this mean?

I read today about [React.Fragment](https://reactjs.org/docs/fragments.html). When surrounding components that belong together with a react-fragment, the overall build process should not get confused by who is a sibling of whom.

Good:

```javascript
const blogPost = ({ data }) => {
  return (
    <React.Fragment>
      <Helmet title={post.frontmatter.title} />
      <Layout>
        <div>
          <h1>{post.frontmatter.title}</h1>
          <p id="datePosted">
            <strong>{post.frontmatter.date}</strong>
          </p>
          <p id="timeToRead">
            <strong>Time to read: </strong>
            {post.timeToRead} {post.timeToRead > 1 ? 'minutes' : 'minute'}
          </p>
          <div
            id="blogContent"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </Layout>
    </React.Fragment>
  );
};
```

**Note:** `<React.Fragment> ... </React.Fragment>` is aliased by `<> ... </>`

Aliased-Good:

```javascript
const blogPost = ({ data }) => {
  return (
    <>
      <Helmet title={post.frontmatter.title} />
      <Layout>
        <div>
          <h1>{post.frontmatter.title}</h1>
          <p id="datePosted">
            <strong>{post.frontmatter.date}</strong>
          </p>
          <p id="timeToRead">
            <strong>Time to read: </strong>
            {post.timeToRead} {post.timeToRead > 1 ? 'minutes' : 'minute'}
          </p>
          <div
            id="blogContent"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </Layout>
    </>
  );
};
```

Sibling rivalry takes a break for now. The components are now happy to be seen together.
