import { Menu } from 'react-contexify'
import styled from 'styled-components'

export const ContextMenuStyled = styled(Menu)`
  &.react-contexify {
    background: ${props => props.theme.colors.white};
    padding: 8px;

    .react-contexify__item {
      font-family: Lexend, sans-serif;
      font-weight: normal;
      .react-contexify__item__content {
        font-size: 0.8125rem;
        color: ${props => props.theme.colors.primary}!important;
        border-radius: 4px;
      }

      &:hover .react-contexify__item__content {
        background-color: ${props => props.theme.colors.selecion}!important;
      }
    }
  }
`
