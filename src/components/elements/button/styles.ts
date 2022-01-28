import styled from 'styled-components'
import { ButtonDefaultSizeProps } from '.'

type ButtonProps = {
  buttonLoadingProps: ButtonDefaultSizeProps
}
export const ButtonStyled = styled.button<ButtonProps>`
  position: relative;
  overflow: hidden;
  /* height: 43px; */
  transition: all 0.3s ease;

  &.button-loading {
    font-size: 0;
    width: ${props => props.buttonLoadingProps.sizeButton};
    height: ${props => props.buttonLoadingProps.sizeButton};

    border: double ${props => props.buttonLoadingProps.sizeBorder} transparent;
    /* border-image-source: linear-gradient(
      to left,
      ${props => props.theme.colors.primary},
      #a83ad5
    ); */

    border-image-source: radial-gradient(
      circle,
      ${props => props.theme.colors.primary} 62%,
      ${props => props.theme.colors.primary} 28%,
      transparent 78%
    );
    /* border-image-source: -webkit-radial-gradient(
      circle,
      ${props => props.theme.colors.primary} 72%,
      ${props => props.theme.colors.primary} 28%,
      transparent 62%
    ); */

    padding: 0;
    background: transparent;

    outline: none;
    animation: rotate 1.225s ease-out 0.6s infinite;
    transform: none;
    /* cursor: wait; */

    &:active {
      transform: scale(1.25);
      animation: bounce 0.3s ease-out infinite;
    }
  }

  &.btn-secondary.button-loading {
    border-image-source: radial-gradient(
      circle,
      ${props => props.theme.colors.purple400} 62%,
      ${props => props.theme.colors.purple400} 28%,
      transparent 78%
    );
    /* border-image-source: -webkit-radial-gradient(
      circle,
      ${props => props.theme.colors.purple400} 72%,
      ${props => props.theme.colors.purple400} 28%,
      transparent 62%
    ); */
  }

  &.button-success {
    position: relative;
    background-color: transparent; //${props => props.theme.colors.purple200};
    border: none;
    /* padding: 1rem; */
    animation: bounce 0.3s ease-in;

    /* &::before {
      content: '';
      position: absolute;
      background: url(./img/success.svg) no-repeat;
      left: 0;
      right: 0;
      top: 4px;
      background-size: 32px;
      margin: 0 auto;
      width: 32px;
      height: 32px;
    } */

    .success {
      display: inline-block;
      vertical-align: middle;
      transform: translate3d(0, 0, 0);
      &:first-child {
        position: relative;
        width: 32px;
        height: 32px;
        border-radius: 4px;
        transform: scale(1);
        vertical-align: middle;
        transition: all 0.2s ease;

        svg {
          position: absolute;
          top: 3.5px;
          left: 3px;
          fill: none;
          stroke: green;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 1rem;
          stroke-dashoffset: 1rem;
          transition: all 0.2s ease;
          transition-delay: 0.1s;
          transform: translate3d(0, 0, 0);
        }
      }

      &.button-animation-state {
        svg {
          stroke-dashoffset: 0;
        }
      }
    }
  }

  &.button-error {
    position: relative;
    background-color: transparent; //${props => props.theme.colors.primary};
    border: none;
    animation: bounce 0.3s ease-in;

    .error {
      display: inline-block;
      vertical-align: middle;
    }

    & > div {
      position: relative;
    }

    .button-block {
      width: 33px;
      height: 16px;
      position: relative;
      overflow: hidden;
      &:before,
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: calc(55% - 4px);
        display: block;
        width: 4px;
        height: 25px;
        transform-origin: bottom center;
        background: #d31919;
        transition: all ease-out 280ms;
      }
      &:last-of-type {
        transform: rotate(180deg);
      }
    }

    .in {
      .button-block {
        &:before {
          transition-delay: 280ms;
          transform: translateX(20px) translateY(-20px) rotate(45deg);
        }
        &:after {
          transition-delay: 280ms;
          transform: translateX(-22px) translateY(-22px) rotate(-45deg);
        }
      }
    }

    .out {
      position: absolute;
      top: 0;
      left: 0;
      .button-block {
        &:before {
          transform: translateX(-5px) translateY(5px) rotate(45deg);
        }
        &:after {
          transform: translateX(5px) translateY(5px) rotate(-45deg);
        }
      }
    }

    &.button-error .error.button-animation-state {
      .in {
        .button-block {
          &:before {
            transform: translateX(-5px) translateY(5px) rotate(45deg);
          }
          &:after {
            transform: translateX(5px) translateY(5px) rotate(-45deg);
          }
        }
      }
      .out {
        .button-block {
          &:before {
            transform: translateX(-20px) translateY(20px) rotate(45deg);
          }
          &:after {
            transform: translateX(20px) translateY(20px) rotate(-45deg);
          }
        }
      }
    }
  }

  .button-ripple {
    content: '';
    width: 20px;
    height: 20px;
    position: absolute;
    background: ${props => props.theme.colors.purple700};
    display: block;
    transform: translate(-50%, -50%);
    pointer-events: none;
    border-radius: 50%;
    opacity: 1;
    animation: animate 1.2s ease forwards;
  }

  .button-content {
    position: relative;
    z-index: 2;

    i,
    svg {
      margin-right: 0.25rem;
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(360deg);
    }
  }

  @keyframes bounce {
    0% {
      transform: scale(0.9);
    }
  }

  @keyframes animate {
    0% {
      transform: scale(1);
      opacity: 0.6;
    }

    50% {
      transform: scale(10);
      opacity: 0.375;
    }
    100% {
      transform: scale(35);
      opacity: 0;
    }
  }
`
