import styled from 'styled-components'

export const InputStyled = styled.input`
  &::placeholder {
    color: ${props => props.theme.colors.purple400};
  }

  /* &:read-only {
    background: ${props => props.theme.colors.purple100};
  } */
`
