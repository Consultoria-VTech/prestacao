import styled from 'styled-components'

export const Navbar = styled.nav`
  width: 100%;
  height: ${props => props.theme.size.headerHomeHeightDesktop};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  transition: padding 0.4s ease-out;
  border-bottom: 1px solid ${props => props.theme.colors.gray200} !important;

  @media screen and (max-width: 767px) {
    height: ${props => props.theme.size.headerHomeHeight};
  }

  .sidebar-toggle {
    font-size: 1.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 0;
    background: transparent;
    border: none;
    svg {
      color: ${props => props.theme.colors.purple900};
    }

    @media screen and (min-width: 768px) {
      display: none;
    }
  }
  a.navbar-brand {
    width: 100px;
    transition: all 2s ease;
  }
  a.hideLogo img {
    width: 0;
  }

  .avatar {
    background: ${props => props.theme.colors.purple700};
    transition: all 0.2s ease;
  }

  .nav-link {
    transition: all 0.2s ease !important;
    color: ${props => props.theme.colors.purple700}!important;
    padding: 0 0.675rem !important;

    &:hover,
    &:focus {
      color: ${props => props.theme.colors.primary} !important;

      .avatar {
        background: ${props => props.theme.colors.primary};
      }
    }
  }

  @media (min-width: 391px) {
    .nav-item {
      position: static;
      .dropdown-menu {
        width: 360px;
        left: auto;
        right: 1rem;
      }
    }
  }

  @media screen and (max-width: 390px) {
    .nav-item .dropdowm-menu {
      width: 94%;
    }
  }
`
