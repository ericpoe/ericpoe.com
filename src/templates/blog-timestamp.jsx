import React from 'react';

function BlogTimestamp({ createdAt, lastEditedAt }) {
  if (lastEditedAt) {
    return (
      <div id="blog-timestamp">
        <p id="createdAt">
          <strong>Created:</strong> {createdAt}
        </p>
        <p id="lastEditedAt">
          <strong>Updated:</strong> {lastEditedAt}
        </p>
      </div>
    );
  }
  return (
    <div id="blog-timestamp">
      <p id="createdAt">
        <strong>Created:</strong> {createdAt}
      </p>
    </div>
  );
}

export default BlogTimestamp;
