import styled from 'styled-components'

export type BoxStyledProps = {

}

export const BoxNavStyled = styled.div<BoxStyledProps>`
      width: 100%; 
      height: 700px;
      padding: 15px;
      background-color: ${props => props.theme.colors.purple200};
      border-radius: 7px;
    
    .tab input[type] {
      display: none;
    }

    .tab label {
      background: ${props => props.theme.colors.purple300};
      padding: 12px 20px;
      margin-right: 5px;
      cursor: pointer;
      transition: background-color .3s;
      border-radius: 0px 10px 0px 10px;
    }

    .tab label:hover,
    .tab input:checked + label {
      background: ${props => props.theme.colors.purple900};
      color: #fff;
      border-radius: 0px 10px 0px 10px;
    }

    .tabs {
      clear: both;
      perspective: 400px;
      -webkit-perspective: 400px;
    }

    .tabs .content {
      background: #fff;
      width: 100%;
      position: absolute;
      border: 2px solid ${props => props.theme.colors.purple900};
      border-radius: 0px 10px 0px 10px;
      padding: 10px 30px 40px;
      line-height: 1.4em;
      opacity: 0;
      transform-origin: top center;
      transition: opacity .3s, transform 1s;
      z-index: 0;
    }
}
`;

export const BoxNavBackgroundStyled = styled.div<BoxStyledProps>`
    width: 100%; 
    padding: 30px;
`;

