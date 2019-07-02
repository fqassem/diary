import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import * as routes from "../../constants/routes";

const MenuWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: right;
`;
const MenuList = styled.ul`
  list-style-type: none;
`;
const MenuItem = styled.li`
  display: inline-block;
  margin: 1rem;
`;

const Menu = () => (
  <MenuWrapper>
    <MenuList>
      <MenuItem>
        <Link to={routes.SIGN_IN}>Sign In</Link>
      </MenuItem>
      <MenuItem>
        <Link to={routes.BLOG}>Blog</Link>
      </MenuItem>
      <MenuItem>
        <Link to={routes.CREATE}>Create Post</Link>
      </MenuItem>
    </MenuList>
  </MenuWrapper>
);

export default Menu;
