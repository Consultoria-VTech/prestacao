import styled from 'styled-components'

interface SidebarStylesProps {
  fixedSidebar: string
}

export const SidebarStyles = styled.nav<SidebarStylesProps>`
  transition: width 0.2s ease;
  top: 0;
  width: ${props =>
    props.fixedSidebar === '0'
      ? props.theme.size.sidebarWidthDefault
      : `calc(${props.theme.size.sidebarWidthDefault} + ${props.theme.size.sidebarWidthExpanded} )`};
  height: 100vh;
  background: ${props => props.theme.colors.purple900};
  z-index: 999;

  .sidebar {
    height: 100%;
    display: flex;
    width: ${props => props.theme.size.sidebarWidthDefault};
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    transition: all 0.2s ease;
    background: ${props => props.theme.colors.purple900};

    &.sidebar-show {
      header {
        a.logo {
          width: 100%;
          padding: 0 0 0 7px;
          transition: padding 0.2s ease-out;

          img {
            transition: all 0.2s ease-out;
            width: 150px;
          }

          @media screen and (max-width: 768px) {
            padding: 1rem;
          }
        }
      }

      .down-ul {
        padding: 0;
      }

      .navbar-brand,
      h6 .docs-normal {
        display: block;
      }

      h6 .docs-mini {
        display: none;
      }

      .sidebar-link span {
        opacity: 1;
      }
    }

    header {
      display: flex;
      justify-content: center;
      align-items: center;
      height: ${props => props.theme.size.headerHomeHeight};
      padding: 0rem;
      a.logo {
        @media screen and (max-width: 768px) {
          padding: 0;
        }
      }

      .sidenav-close {
        width: 0;
        margin: 0;
        transition: all 0.3s ease;
        opacity: 0;
        cursor: pointer;
        color: ${props => props.theme.colors.purple500};

        &:hover {
          color: ${props => props.theme.colors.purple200};
        }

        @media screen and (max-width: 320px) {
          /* width: 1.5rem;
          margin: 1rem;
          opacity: 1; */
        }
      }
    }

    footer {
      min-height: 4rem;
      text-align: center;
      border-top: 1px solid #ddd;
      display: flex;
      justify-content: center;
      align-items: center;

      h2 {
        color: white;
      }
    }

    .navbar-brand {
      display: none;
      padding: 1.5rem;
    }

    .sidebar-list-header {
      transition: all 0.15s ease;
      .docs-mini {
        padding-left: 3px;
      }

      .docs-normal {
        display: none;
      }
    }

    .scrollbar {
      height: calc(
        100vh - ${props => props.theme.size.headerHomeHeight}
      ) !important;
      max-width: 100%;
      width: 100%;
    }
    .sidebar-list {
      height: calc(
        100vh - ${props => props.theme.size.headerHomeHeight} - 3rem
      );
      padding-bottom: 1rem;

      width: 100%;
      transition: all 0.2s ease-out;

      .sidebar-list-header,
      /* li {
        padding: 0 0 0 1rem;
      } */

      hr {
        margin: 1rem 1.5rem;
        background-color: ${props => props.theme.colors.purple200};
      }

      .sidebar-list-header {
        margin: 0;
        color: ${props => props.theme.colors.purple600};
        padding-top: 0.25rem;
        padding-bottom: 0.25rem;
        font-size: 0.8rem;
        text-transform: uppercase;
        /* letter-spacing: 0.04rem; */
        white-space: nowrap;
      }

      .sidebar-link {
        position: relative;
        color: ${props => props.theme.colors.white};
        background: transparent;
        border: none;
        transition: filter 0.2s;
        line-height: 1.5rem;
        height: 2.75rem;
        justify-content: space-between;
        display: flex;
        align-items: center;

        &.active::before {
          content: '';
          position: absolute;
          left: -1.5rem;
          width: 2px;
          height: 2rem;
          background-color: ${props => props.theme.colors.purple400};
        }

        &.active,
        &:hover {
          /* background-color: ${props => props.theme.colors.purple800}; */
          color: ${props => props.theme.colors.purple400};
        }

        & > i {
          display: flex;
        }
        & > i,
        & > svg {
          font-size: 1.25rem;
          padding-right: 7px;
        }

        .icon-container {
          padding: 0 0 0 1rem;
          display: flex;
          align-items: center;
          i {
            padding-right: 5px;
            padding-bottom: 3px;
          }
        }

        span {
          opacity: 0;
          font-size: 0.875rem;
          transition: all 0.3s ease-out;
          white-space: nowrap;
          font-weight: 400;
        }
      }
    }
  }

  @media screen and (min-width: 768px) {
    left: 0;

    .sidebar {
      header {
        height: ${props => props.theme.size.headerHomeHeightDesktop};
      }
    }

    .scrollbar {
      height: calc(
        100vh - ${props => props.theme.size.headerHomeHeightDesktop} - 2rem
      ) !important;
    }

    .sidebar-list {
      height: calc(
        100vh - ${props => props.theme.size.headerHomeHeightDesktop} - 3rem
      );
    }

    .sidebar.sidebar-show {
      /* padding-right: 0.25rem; */
      width: calc(
        ${props => props.theme.size.sidebarWidthDefault} +
          ${props => props.theme.size.sidebarWidthExpanded}
      );

      header > div {
        margin-left: auto;
      }

      .sidebar-link span {
        opacity: 1;
      }
    }
  }

  @media screen and (max-width: 768px) {
    width: 50px;


    .sidebar {
      width: 60px;
      .sidebar-list {
        .sidebar-link {
          .icon-container {
            padding-left: 0.2rem;
          }
        }
      }
      

      .sidebar-list-header {
        padding-left: 1rem !important;
        padding-right: 1rem !important;
      }

      .sidebar-list li {
        padding: 0 0 0 1rem;
      }

      &.sidebar-show {
        width: 270px;
        /* calc(
          ${props => props.theme.size.sidebarWidthDefault} +
            ${props => props.theme.size.sidebarWidthExpanded}
        ); */

        .sidebar-link span {
          opacity: 1;
        }
      }
    }
  }

  @media screen and (max-width: 576px) {
    width: 0;
    .sidebar {
      width: 0;
      .sidebar-list {
        .sidebar-link {
          .icon-container {
            padding-left: 0;
          }
        }
      }
    }

    &.sidebar-show {
        width: 300px !important;
        } 
  }

  @media screen and (max-width: 320px) {
    .sidebar.sidebar-show {
      width: 100vw;
    }
  }

  .sidenav-toggler-inner,
  .sidenav-toggler-line {
    width: 20px;
    transition: all 0.15s ease;
  }

  .sidenav-toggler-inner {
    position: relative;

    &:before {
      content: '';
      position: absolute;
      width: 40px;
      height: 40px;
      left: -11px;
      top: -14px;
      border-radius: 50%;
      transform: scale(0);
      transition: all 0.15s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
  }

  .sidenav-toggler-line {
    height: 3px;
    background-color: ${props => props.theme.colors.white};
    display: block;
    position: relative;

    &:not(:last-child) {
      margin-bottom: 3px;
    }
  }

  .sidenav-toggler {
    cursor: pointer;
    margin: 1rem;

    &:hover {
      .sidenav-toggler-line {
        background-color: ${props => props.theme.colors.purple400};
      }
    }

    &.active-menu {
      .sidenav-toggler-inner {
        &:before {
          transform: scale(1);
        }
      }

      .sidenav-toggler-line {
        background-color: ${props => props.theme.colors.purple400};

        &:first-child,
        &:last-child {
          width: 15px;
          transform: translateX(5px);
        }
      }
    }
  }

  .rightSide-openMenu {
    display: block;
    position: fixed;
    /* height: 100%; //Controle Tamanho barra menu Aberto */
    background-color: ${props => props.theme.colors.purple1000};
  }
  .rightSide-closeMenu {
    display: none;
  }
  .submenu {
    span {
      padding: 0 0 0 1rem;
      opacity: 1 !important;
    }
    z-index: 101;
  }
  .rightSide-liMenus {
    list-style-type: none;
    display: block;
    width: auto;
    justify-content: space-between;
    align-items: center;
    background-color: ${props => props.theme.colors.purple1000};

    &:hover {
      background-color: ${props => props.theme.colors.purple800};
      
    }

    .sidebar-link {
      padding-right: 3rem;
    }

    .arrowMenu {
      position: absolute;
      right: 7px;
      color: white;
      margin-left: 3px;
    }
  }
  
  .disabled {
    pointer-events: none;
    opacity: 50%;
  }

  .down-ul {
    display: flex;
    padding: 5px;

    .down-closeMenu {
      background-color: ${props => props.theme.colors.purple1000};
    }

    .down-liMenus {
      list-style-type: none;
      display: block;
      width: 100%;
      justify-content: space-between;
      align-items: center;

      .collapsed {
        display: none;
      }

      .arrowMenu {
        right: 7px;
        color: white;
        margin-left: 3px;
      }
    }
    .collapsedArrow {
      transform: rotate(90deg);
    }
  }
  .esqeoO, .jASvgJ, .hYthir, .dMZpTv {
    display: none;
  }
`

export const CheckboxStyle = styled.div`
  .checkbox {
    display: flex;
    align-items: center;
    transform: translate(60px);

    margin: 10px;
    &__label {
      font-size: 24px;
      font-weight: 700;
      color: white;
    }
    &__icon {
      width: 50px;
      cursor: pointer;
      color: white;
    }
  }
`
