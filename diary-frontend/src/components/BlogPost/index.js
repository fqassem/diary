import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const BlogPostWrapper = styled.div``;
const BlogPostTitle = styled.h2``;
const BlogPostDate = styled.h3`
  font-weight: lighter;
`;
const BlogPostContent = styled.p``;

const BlogPost = ({ title, content, datePublished }) => (
  <BlogPostWrapper>
    <BlogPostTitle>{title}</BlogPostTitle>
    <BlogPostDate>{datePublished}</BlogPostDate>
    <BlogPostContent> {content}</BlogPostContent>
  </BlogPostWrapper>
);

BlogPost.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  datePublished: PropTypes.string.isRequired
};
export default BlogPost;
