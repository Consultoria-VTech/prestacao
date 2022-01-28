import styled, { css } from 'styled-components'

export const TableDivStyle = styled.div`
    .titles-container {
      display: flex;
      text-align: center;
      position: relative;
      z-index: 99;
      top: 2px;

    }

    .btn-ContasReceber {
      border: 1px solid;
      width: 200px;
      padding: 10px;
      background-color: transparent;
    }
    .btn-ContasPagar {
      border: 1px solid;
      width: 200px;
      margin-left: 10px;
      padding: 10px;
      background-color: transparent;
    }
    .btn-Conciliar {
      border: 1px solid;
      width: 200px;
      margin-left: 10px;
      padding: 10px;
      background-color: transparent;
    }
    
    .showTables {
      display: none;
    }

    .active {
      display: block;
    }
    .activeBtnCR {
      background-color: white;
      border-bottom: none;
    }
    .activeBtnCP {
      background-color: white;
      border-bottom: none;
    }
    .activeBtnCO {
      background-color: white;
      border-bottom: none;
    }


  /* .div-container {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: center;
  }

  .div-contas {
    width: 900px;
    margin: 10px;
  } */
`

type CardTotalStyledProps = {
  typeCard: 'contas-pagar' | 'contas-receber'
}
export const CardTotalStyled = styled.div<CardTotalStyledProps>`
  ${props => {
    switch (props.typeCard) {
      case 'contas-receber':
        return css`
          /* background: linear-gradient(
            120deg,
            rgba(51, 195, 72, 1) 0%,
            rgba(40, 136, 54, 1) 100%
          ); */
        `
      case 'contas-pagar':
        return css`
          /* background: linear-gradient(
            120deg,
            rgba(195, 51, 51, 1) 0%,
            rgba(136, 40, 40, 1) 100%
          ); */
        `
      default:
        break
    }
  }}

  padding: 1rem;
  color: ${({ theme }) => theme.colors.purple100};
  transition: all 0.15s ease-out;
  & > div {
    z-index: 2;
  }
  a {
    color: ${({ theme }) => theme.colors.purple900};
    font-weight: 400;
    font-size: 1rem;
    display: block;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    @media screen and (max-width: 586px) {
      margin-top: 0.75rem;
      margin-bottom: 0.75rem;
    }
  }
  span {
    font-weight: 500;
    font-size: 2.5rem;
    display: inline-block;
    text-shadow: 2px 3px 6px rgba(0, 0, 0, 0.15);
    transition: all 0.15s ease-out;

    @media screen and (max-width: 996px) {
      font-size: 2rem;
    }
    @media screen and (max-width: 568px) {
      font-size: 1.5rem;
    }
  }

  p {
    margin: 0;
    text-align: end;
    font-size: 1rem;
  }

  svg {
    width: 7rem;
    height: 7rem;
    position: absolute;
    right: 1rem;
    top: 0;
    color: rgba(255, 255, 255, 0.15);
    z-index: -1;
  }
`
