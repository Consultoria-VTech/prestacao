import styled from 'styled-components'

export type TitleStyledProps = {
  fontSize?: string
  margin?: string
}
export const TitleStyled = styled.h2<TitleStyledProps>`
  font-size: ${props => props.fontSize || '1.25rem'};
  font-weight: 500;
  /* margin: ${props => props.margin || '1rem 0'}; */
`
