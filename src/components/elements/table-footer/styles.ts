import styled from 'styled-components'

export const TableFooterStyled = styled.footer`
  padding: 1rem;
  transition: all 0.15s ease-out;

  .table-info {
    font-size: 1.115rem;
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8125rem;
    color: ${props => props.theme.colors.primary};
    transition: all 0.15s ease-out;

    & > span {
      font-weight: 400;
    }
    & > span,
    & > nav {
      flex-basis: 100%;
      transition: all 0.15s ease-out;
    }

    select {
      font-size: 0.8125rem;
      font-family: Inter, sans-serif;
    }
  }

  @media screen and (max-width: 768px) {
    padding: 0.75rem;
    div {
      flex-flow: wrap;

      & > span {
        margin: 0.25rem 0;
        flex-basis: auto;
      }
      & > nav {
        margin-top: 0.5rem;
        order: 1;
      }
    }
  }
`
