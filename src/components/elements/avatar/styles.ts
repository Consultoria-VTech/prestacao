import styled from 'styled-components'

export const AvatarStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > span {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.865rem;
    border-radius: 50%;
    height: 2rem;
    width: 2rem;
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
`
