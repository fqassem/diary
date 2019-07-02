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

const SignOutButton = ({ onClick }) => (
  <button type="button" onClick={onClick}>
    Sign Out
  </button>
);

const Menu = ({ authUser, onSignOut }) => (
  <MenuWrapper>
    <MenuList>
      {!authUser && (
        <>
          <MenuItem>
            <Link to={routes.HOME}>Home</Link>
          </MenuItem>
          <MenuItem>
            <Link to={routes.SIGN_IN}>Sign In</Link>
          </MenuItem>
        </>
      )}
      {authUser && (
        <>
          <MenuItem>
            <Link to={routes.BLOG}>Blog</Link>
          </MenuItem>
          <MenuItem>
            <Link to={routes.CREATE}>Create Post</Link>
          </MenuItem>
          <MenuItem>
            <SignOutButton onClick={onSignOut} />
          </MenuItem>
        </>
      )}
    </MenuList>
  </MenuWrapper>
);

export default Menu;
