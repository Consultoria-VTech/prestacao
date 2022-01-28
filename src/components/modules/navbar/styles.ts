import styled from 'styled-components'

export const NavbarStyled = styled.nav`
  
  header {
    display: flex;
    align-items: center;
    padding: 1rem;

    h2 {
      margin: 0;
      flex: 1;
      font-weight: 700;
    }
    a {
      font-weight: 600;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .dropdown-menu {
    max-height: calc(
      100vh - ${props => props.theme.size.headerHomeHeightDesktop} - 1rem
    );
    border-radius: 0.5rem;
  }

  .navbar-scroll {
    height: calc(
      100vh - ${props => props.theme.size.headerHomeHeightDesktop} - 5.5rem
    ) !important;

    max-width: 100%;
  }

  .dropdown-menu-usuario {
    max-height: calc(4.5rem + (44px * 4));
    .navbar-scroll {
      height: 240px;

      .dropdown-item {
        padding: 0 0.5rem;
        display: flex;
        max-height: 44px;
        color: ${props => props.theme.colors.purple800};

        .row {
          margin-left: 0;
          margin-right: 0;
          padding-right: 0.5rem;
        }

        .img {
          width: 1.25rem;
          height: 1.25rem;
          margin: 0.5rem;
          margin-left: 0;

          svg {
            width: 1.25rem;
            height: 1.25rem;
          }
        }

        & > div {
          padding: 0.25rem 0;
          border-radius: 0.5rem;
          width: 100%;
        }

        &:hover,
        &:focus {
          background-color: transparent !important;

          & > div {
            background-color: ${props =>
              props.theme.colors.selecion} !important;
          }
        }
      }
    }
  }

  .list-group {
    padding: 0;
    padding-bottom: 0.5rem;
  }

  .list-group-item {
    padding: 0 0.5rem;
    border: none;

    & > div {
      border-radius: 0.5rem;
    }

    &.list-group-item-action:hover,
    &.list-group-item-action:focus {
      background-color: transparent !important;

      & > div {
        background-color: ${props => props.theme.colors.selecion} !important;
      }
    }

    .img {
      width: 56px;
      height: 56px;
      margin: 0.5rem;
      margin-left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .row {
      margin-left: 0;
      margin-right: 0;
      padding-right: 0.5rem;
    }

    .col {
      padding: 0.5rem 0;
      width: 100%;
    }
  }
`

export const NavbarListGroupStyled = styled.div``
