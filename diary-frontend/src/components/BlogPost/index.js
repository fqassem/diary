import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";

const BlogPostWrapper = styled.div`
  border-bottom: 1px solid black;
`;
const BlogPostTitle = styled.h2`
  font-size: 3.4rem;
  margin-bottom: 0;
`;
const BlogPostDate = styled.h3`
  font-weight: lighter;
  font-size: 1.4rem;
  color: gray;
`;
const BlogPostContent = styled.div``;

const BlogPost = ({ title, content, datePublished }) => (
  <BlogPostWrapper>
    <BlogPostTitle>{title}</BlogPostTitle>
    <BlogPostDate>Date Published: <span>{datePublished}</span></BlogPostDate>
    <BlogPostContent>{ReactHtmlParser(content)}</BlogPostContent>
  </BlogPostWrapper>
);

BlogPost.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  datePublished: PropTypes.string.isRequired
};
export default BlogPost;
