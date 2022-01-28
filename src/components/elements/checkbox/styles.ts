import styled from 'styled-components'

export const ContainerCheckbox = styled.div`
  padding: 12px 2px;
  input {
    display: none;
  }

  label {
    margin: auto;
    -webkit-user-select: none;
    user-select: none;
    cursor: pointer;

    &.gs-checkbox-inline {
      white-space: nowrap !important;
      display: flex;
    }

    &:hover span:first-child {
      border-color: ${props => props.theme.colors.purple500};
    }
    span {
      display: inline-block;
      vertical-align: middle;
      transform: translate3d(0, 0, 0);

      &:first-child {
        position: relative;
        width: 18px;
        height: 18px;
        border-radius: 3px;
        transform: scale(1);
        vertical-align: middle;
        border: 1px solid ${props => props.theme.colors.purple500};
        transition: all 0.2s ease;

        svg {
          position: absolute;
          top: 3.5px;
          left: 2px;
          fill: none;
          stroke: #ffffff;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 1rem;
          stroke-dashoffset: 1rem;
          transition: all 0.2s ease;
          transition-delay: 0.1s;
          transform: translate3d(0, 0, 0);
        }
        &:before {
          content: '';
          width: 100%;
          height: 100%;
          background: ${props => props.theme.colors.purple500};
          display: block;
          transform: scale(0);
          opacity: 1;
          border-radius: 50%;
        }
      }
      &:last-child {
        padding-left: 0.5rem;
        font-size: 0.875rem;
        font-weight: 400;
      }
    }
  }

  input:checked + label {
    span {
      &:first-child {
        background: ${props => props.theme.colors.purple500};
        border-color: ${props => props.theme.colors.purple500};
        animation: wave 0.4s ease;
        svg {
          stroke-dashoffset: 0;
        }
        &:before {
          transform: scale(3.5);
          opacity: 0;
          transition: all 0.6s ease;
        }

        @keyframes wave {
          50% {
            transform: scale(0.9);
          }
        }
      }
    }
  }
`

export const CheckboxStyled = styled.input``
