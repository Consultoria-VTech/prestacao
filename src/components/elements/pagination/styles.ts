import styled from 'styled-components'

export const PaginationStyled = styled.nav`
  ul {
    color: ${props => props.theme.colors.primary};

    .page-item {
      color: ${props => props.theme.colors.primary};
      &.active .page-link {
        background-color: ${props => props.theme.colors.primary};
        border-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.white};
      }

      &:not(.active) .page-link {
        background: transparent;
        color: ${props => props.theme.colors.primary};

        &:hover {
          background-color: ${props => props.theme.colors.selecion};
        }
      }
    }
  }
`
