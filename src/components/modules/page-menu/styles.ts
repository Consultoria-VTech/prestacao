import styled from 'styled-components'

type PageMenuStyledProps = {
  size: 'small' | 'medium' | 'large'
}
export const PageMenuStyled = styled.div<PageMenuStyledProps>`
  .card {
    margin-bottom: 0;
    &.shadow {
      border: 0 !important;
    }
    &__menu {
      .card-body {
        padding: 12px 8px;
        height: ${props => (props.size === 'small' ? '110px' : '220px')};
        .card-title {
          font-size: 1.1rem;
          line-height: 1.25rem;
          margin-bottom: 0.5rem;
        }
        .card-text {
          font-size: 13px;
          line-height: 1rem;
          color: ${props => props.theme.colors.purple700};
          /* opacity: 0.9; */
        }
      }
    }
    &__link {
      color: ${props => props.theme.colors.primary};
      border-radius: 0.25rem;
      transition: all 0.3s;
      i svg path {
        stroke: ${props => props.theme.colors.primary};
      }
      &:hover {
        color: ${props => props.theme.colors.primary};
        box-shadow: 0 4px 16px rgba(50, 50, 93, 0.2),
          0 1px 3px rgba(0, 0, 0, 0.16);
      }
    }
    &__icon {
      font-size: 3rem;
      height: ${props => (props.size === 'small' ? '90px' : '150px')};
      display: flex;
      align-items: center;
      justify-content: center;
      @media screen and(max-width: 998px) {
        height: 91px;
      }
    }
  }
  @media screen and (max-width: 320px) {
    width: 100%;
    flex: 0 0 auto;
  }
  @media screen and(max-width: 998px) {
    .card__menu .card-body {
      height: 90px;
    }
  }
`

export const PageMenuDecoredStyled = styled.div<PageMenuStyledProps>`
  .card {
    margin-bottom: 0;
    transition: all 0.3s ease-out;
    &.shadow {
      border: 0 !important;
    }
    &__menu {
      .card-body {
        padding: 1.5rem;
        height: ${props => (props.size === 'small' ? '110px' : '160px')};
        text-align: left;
        .card-title {
          font-size: 2rem;
          line-height: 2rem;
          margin-bottom: 1rem;
          transition: all 0.3s ease-out;
        }
        .card-text {
          font-size: 1rem;
          line-height: 1.5rem;
          color: ${props => props.theme.colors.purple700};
          transition: all 0.3s ease-out;
        }
      }
      .footer {
        position: relative;
        /* background: ${props => props.theme.colors.primary}; */
        height: ${props => (props.size === 'small' ? '90px' : '136px')};
        display: flex;
        align-items: baseline;
        justify-content: flex-end;
        overflow: hidden;
        border-radius: 0.375rem;
        @media screen and(max-width: 998px) {
          height: 91px;
        }
        ::before {
          content: '';
          width: 100%;
          position: absolute;
          left: -2rem;
          top: 7rem;
          background: ${props => props.theme.colors.primary};
          height: 200%;
          transform: rotate(8deg);
          box-shadow: 0 2px 4px 1px ${props => props.theme.colors.primary};
          transition: all 0.3s ease-out;
          outline: 3px solid ${props => props.theme.colors.primary};
          outline-offset: 3px;
          /* background-image: url('/img/background-menu-item.svg'); */
          /* border-top-left-radius: 10%; */
          @media screen and (max-width: 1366px) {
            top: 7.5rem;
          }
          @media screen and (max-width: 1080px) {
            top: 8rem;
            left: -3rem;
          }
          @media screen and (max-width: 996px) {
            top: 5.55rem;
            /* left: -3rem; */
          }
          @media screen and (max-width: 668px) {
            top: 5.75rem;
            left: -3.7rem;
          }
          @media screen and (max-width: 476px) {
            top: 6.5rem;
            left: -3.7rem;
          }
        }
      }
      @media screen and (max-width: 998px) {
        .card-body {
          padding: 1rem;
          .card-title {
            font-size: 1.25rem;
            line-height: 1.5rem;
          }
          .card-text {
            font-size: 0.875rem;
            line-height: 1rem;
          }
        }
        .footer {
          align-items: center;
        }
      }
    }
    &__link {
      color: #00bfdd;
      border-radius: 0.25rem;
      transition: all 0.3s ease-out;
      &:hover {
        color: #00bfdd;
        box-shadow: 0 4px 16px rgba(50, 50, 93, 0.2),
          0 1px 3px rgba(0, 0, 0, 0.16);
      }
    }
    &__icon {
      position: relative;
      bottom: 0;
      font-size: 4.36rem;
      right: 2rem;
      display: inline-block;
      transition: all 0.3s ease-out;
      /* filter: drop-shadow(2px 1px 0 rgba(0, 0, 0, 0.3)); */
      @media screen and (max-width: 998px) {
        font-size: 3rem;
        right: 1rem;
        height: auto;
      }
    }
  }
  @media screen and (max-width: 320px) {
    width: 100%;
    flex: 0 0 auto;
  }
  @media screen and(max-width: 996px) {
    .card__menu .card-body {
      height: 90px;
    }
  }
`