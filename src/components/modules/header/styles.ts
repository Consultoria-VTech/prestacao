import styled from 'styled-components'

type NavbarProps = {
  isFixed?: boolean
  isOpen?: boolean
}
export const Navbar = styled.nav<NavbarProps>`
  width: 100%;
  height: ${props => props.theme.size.headerHomeHeightDesktop};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${props => props.theme.padding.lg};
  transition: padding 0.4s ease-out;
  border-bottom: 1px solid ${props => props.theme.colors.gray200} !important;
  @media screen and (max-width: 767px) {
    height: ${props => props.theme.size.headerHomeHeight};
  }
  box-shadow: 0 0 0.4rem 0px rgb(156 120 181 / 20%);

  .sidebar-toggle {
    font-size: 1.5rem;
    cursor: pointer;
    display: none !important;
    align-items: center;
    font-size: 0;
    background: transparent;
    border: none;
    svg {
      color: ${props => props.theme.colors.purple900};
    }

    @media screen and (max-width: 576px) {
      display: ${props => (props.isFixed ? 'none' : 'block')} !important;
    }

    @media screen and (min-width: 768px) {
      display: none;
    }
  }
  a.navbar-brand {
    width: ${props => (props.isFixed ? '0px' : '100px')};
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
  }
  a.hideLogo {
    img {
      width: 0;
    }
    margin: 0;
    padding: 0 !important;
  }

  h2.subtitulo {
    font-size: 1.115rem;
    margin: 0;
    color: ${props => props.theme.colors.purple400};
    font-weight: 400;
    margin-left: ${props => (props.isFixed ? '0px' : '24px')};
    transition: all 0.2s ease;
    padding-left: ${props => (props.isOpen && !props.isFixed ? '3rem' : 0)};

    @media screen and (max-width: 768px) {
      display: ${props => (props.isFixed ? 'none' : 'block')};
    }

    @media screen and (max-width: 568px) {
      display: none;
    }
  }

  .avatar {
    background: ${props => props.theme.colors.purple800};
    transition: all 0.2s ease;
  }

  .nav-link {
    transition: all 0.2s ease !important;
    color: ${props => props.theme.colors.purple800}!important;
    padding: 0 0.675rem !important;

    &:hover,
    &:focus {
      color: ${props => props.theme.colors.purple900} !important;

      .avatar {
        background: ${props => props.theme.colors.purple900};
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
