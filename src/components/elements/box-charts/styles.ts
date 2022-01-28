import styled from 'styled-components'

export type BoxChartsStyledProps = {

}

export const BoxChartsStyled = styled.div<BoxChartsStyledProps>`
    padding: 20px 10px 0px 10px;
    margin: 10px 0px 30px 20px;
    background-color: ${props => props.theme.colors.purple200};
    box-shadow: 0px 5px 5px ${props => props.theme.colors.purple300};
    border-radius: 7px;
    border-bottom: 10px solid ${props => props.theme.colors.purple900};
`;

export const BoxDreStyled = styled.div<BoxChartsStyledProps>`
    padding: 20px 10px 0px 10px;
    margin: 10px 0px 30px 25px;
    background-color: ${props => props.theme.colors.purple200};
    box-shadow: 0px 5px 5px ${props => props.theme.colors.purple300};
    border-radius: 7px;
    border-bottom: 10px solid ${props => props.theme.colors.purple900};
`;