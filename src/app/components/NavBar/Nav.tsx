import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { ReactComponent as DocumentationIcon } from './assets/documentation-icon.svg';
import { ReactComponent as GithubIcon } from './assets/github-icon.svg';

export function Nav() {
  return (
    <Wrapper>
      <Link to="/">
        <Item>
          <DocumentationIcon />
          Ask
        </Item>
      </Link>
      <Link to="/hexagrams">
        <Item>
          <DocumentationIcon />
          Yi Jing
        </Item>
      </Link>
      <Link to="/tao">
        <Item>
          <DocumentationIcon />
          Tao
        </Item>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  /* margin-right: -1rem; */
`;

const Item = styled.a`
  color: ${p => p.theme.primary};
  cursor: pointer;
  text-decoration: none;
  display: flex;
  padding: 0.25rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }

  .icon {
    margin-right: 0.25rem;
  }
`;
