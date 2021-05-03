import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { FaPrayingHands } from 'react-icons/fa';
import { GiYinYang } from 'react-icons/gi';
import { GiMagnifyingGlass } from 'react-icons/gi';

export function Nav() {
  return (
    <Wrapper>
      <Link to="/">
        <Item>
          <FaPrayingHands style={{ marginRight: 8 }} />
          Ask
        </Item>
      </Link>
      <Link to="/hexagrams">
        <Item>
          <GiMagnifyingGlass style={{ marginRight: 8 }} />
          I-Ching
        </Item>
      </Link>
      <Link to="/tao">
        <Item>
          <GiYinYang style={{ marginRight: 8 }} />
          Tao
        </Item>
      </Link>
    </Wrapper>
  );
}

// @TODO: increase font-size for larger screens

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
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
