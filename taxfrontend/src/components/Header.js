import React from "react";
import styled from "styled-components";
import { FaYoutube, FaTwitter, FaInstagram } from "react-icons/fa";

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
`;

const IconLink = styled.a`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 1.2rem;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <NavLinks>
        <NavLink href="#">My Account</NavLink>
        <NavLink href="#">My Profile</NavLink>
        <NavLink href="#">Books</NavLink>
        <NavLink href="#">Budget 2025</NavLink>
      </NavLinks>
      <SocialIcons>
        <IconLink href="https://www.youtube.com" target="_blank"><FaYoutube /></IconLink>
        <IconLink href="https://twitter.com" target="_blank"><FaTwitter /></IconLink>
        <IconLink href="https://www.instagram.com" target="_blank"><FaInstagram /></IconLink>
      </SocialIcons>
    </HeaderContainer>
  );
};

export default Header;
