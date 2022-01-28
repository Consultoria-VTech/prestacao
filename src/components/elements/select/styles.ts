import styled from 'styled-components'

type SelectStyledProps = {
  valueISEmptyOrNull?: boolean
}
export const SelectStyled = styled.select<SelectStyledProps>`
  /* color: ${props =>
    props.valueISEmptyOrNull && props.theme.colors.purple400}; */
`
