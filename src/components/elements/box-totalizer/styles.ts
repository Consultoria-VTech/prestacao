import styled,{keyframes} from 'styled-components'

export type BoxStyledProps = {
    colorBox?: string;
    fontColor?: string;
}

const BAnimation = keyframes`
    0%{
        transform: translateX(100px);
        opacity: 0;
    }
    50%{     
        opacity: .3;
    }
    100%{
        transform: translateX(0px);
        opacity: 1;
    }
`;

export const BoxStyled = styled.div<BoxStyledProps>`
    width: 99%;
    padding: 21px 14px;
    background-color: ${props => props.theme.colors.purple200};
    box-shadow: 0px 5px 5px ${props => props.theme.colors.purple300};
    border-right: 10px solid ${props => props.theme.colors.purple900};
    border-radius: 7px;
    position: relative;
    overflow: hidden;
    animation: ${BAnimation} .5s;
    transform: translateX(25px);
    > a{
        > img {
            height: 110%;
            position: absolute;
            top: -10px;
            right: -30px;
            opacity: 0.4;
            z-index: -1000;
        }
    }
    
    > h1 {
        color: ${props => props.fontColor};
        font-size: 30px;
    }

    @media (max-width: 1366px) {
        h1{
            font-size: 21px;
        }
        height: 8rem;

    }


    .contentPayReceive{
        >h5{
            margin-bottom: 0px;
        }
    }

    .exempleChart{
        height: 60px;
        width: 60px;
        border-radius: 100%;
        border: 8px solid ${props => props.theme.colors.purple900};
        margin-left: 10px;
        padding-top: 12px
    }
`;

export const BoxNumberStyled = styled.div<BoxStyledProps>`
    background-color: ${props => props.colorBox};
    text-align: center;
    border-radius: 0.4rem;
    > h1 {
        color: white;
    }
    > h2 {
        color: white;
    }
`;