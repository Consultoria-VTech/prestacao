import styled from 'styled-components'

export const NotificationItemStyled = styled.a`
  h4 {
    font-weight: 600;
    font-size: 0.9rem;
  }
  p {
    color: ${props => props.theme.colors.purple700};
    font-size: 0.875rem;
    font-weight: 400;
  }

  small {
    font-weight: 500;
  }
`
