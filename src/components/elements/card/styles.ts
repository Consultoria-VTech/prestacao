import styled from 'styled-components'

export const CardStyled = styled.div`
  /* box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.125); */
  box-shadow: 0 0 0.35rem 0 rgb(156 120 181 / 18%);
  border-radius: 0.25rem;
  border: 1px solid ${props => props.theme.colors.gray300};
  margin-bottom: 0;
`
