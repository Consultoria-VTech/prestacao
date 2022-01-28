import styled from 'styled-components'

export const DropdownStyles = styled.div`
  button {
    display: flex;
    align-content: center;
    justify-content: space-between;
    padding: 8px;
    min-width: 160px;
    height: 42px;
    user-select: none;
    border-color: transparent;
    position: relative;
    cursor: pointer;
    line-height: 24px;
    font-size: 14px;
    outline: none;
    border-radius: 8px;

    &[aria-expanded='true']::before,
    &:focus::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      z-index: -1;
      filter: blur(5px);
      width: calc(100% + 4px);
      height: calc(100% + 4px);
      opacity: 1;
      background: linear-gradient(
          45deg,
          rgb(255, 0, 0),
          rgb(255, 115, 0),
          rgb(255, 251, 0),
          rgb(72, 255, 0),
          rgb(0, 255, 213),
          rgb(122, 0, 255),
          rgb(255, 0, 200),
          rgb(255, 0, 0)
        )
        0% 0% / 400%;
      animation: glowingInTheDark 20s linear 0s infinite normal none running;
      transition: opacity 0.3s ease-in-out 0s;
    }

    &[aria-expanded='true']::after,
    &:focus::after {
      z-index: -1;
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgb(17, 17, 17);
      left: 0px;
      top: 0px;
    }

    @keyframes glowingInTheDark {
      0% {
        background-position: 0 0;
      }
      50% {
        background-position: 400% 0;
      }
      100% {
        background-position: 0 0;
      }
    }
  }
`
