import styled from 'styled-components'

export const FormHrStyled = styled.hr`
  margin: 1rem 0;
  background-color: ${props => props.theme.colors.purple300};
  height: 1px;
  background-image: linear-gradient(
    90deg,
    transparent,
    ${props => props.theme.colors.purple100},
    transparent
  );
  opacity: 1;
`
