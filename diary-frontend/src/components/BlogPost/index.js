import React from 'react';
import PropTypes from 'prop-types';

const BlogPost = ({ title, content, datePublished }) => (
    <div>
        {title}
        {content}
        {datePublished}
    </div>
);

BlogPost.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    datePublished: PropTypes.string.isRequired
}
export default BlogPost;