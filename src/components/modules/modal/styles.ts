import styled from 'styled-components'

export const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 700;
  width: 100%;
  outline: 0;
  height: 100%;
  overflow-y: auto;
`

export const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 500;
`

export const StyledModal = styled.div`
  z-index: 100;
  background: white;
  position: relative;
  margin: auto;
  border-radius: 8px;
`

export const HeaderStyled = styled.header`
  border-bottom: 0.5px solid ${props => props.theme.colors.purple300};
  & > div {
    display: flex;
    align-items: center;

    h6 {
      margin-left: 1rem;
    }
  }
  & > button {
    color: ${props => props.theme.colors.primary} !important;
    opacity: 0.5;
    font-size: 0;
    height: 2rem;
    width: 2.25rem;
    background: transparent;
    border: none;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    border-radius: 50%;

    svg {
      width: 100%;
      height: 100%;
    }

    &:not(.btn-modal-close) {
      svg {
        width: 80%;
        height: 80%;
      }
    }

    &:hover {
      opacity: 1;
    }

    @media screen and (max-width: 568px) {
      &:not(.btn-modal-close) {
        display: none;
      }
    }
  }
`
export const FooterStyled = styled.footer`
  border-top: 0.5px solid ${props => props.theme.colors.purple300};
`
