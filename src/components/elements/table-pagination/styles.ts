import styled from 'styled-components'

type TrStyledProps = {
  selected: boolean
}
export const TablePaginationStyled = styled.table`
  thead {
    th {
      background: ${props => props.theme.colors.purple200};
      color: ${props => props.theme.colors.purple800};
      font-size: 0.625rem;
      border-bottom: 0.5px solid ${props => props.theme.colors.purple300} !important;
      border-top: 0.5px solid ${props => props.theme.colors.purple300} !important;
      z-index: 101;
    }
  }
`

export const TrStyled = styled.tr<TrStyledProps>`
  cursor: pointer;
  background: ${props => props.selected && '#e9dcffc2'};
  color: ${props => props.theme.colors.purple800};
  transition: all 0.025s ease-out;

  &:nth-child(2n) {
    background-color: ${props =>
      !props.selected && props.theme.colors.purple100};
  }

  &:hover {
    background-color: ${props => !props.selected && '#e9dcffc2'};
  }
`
