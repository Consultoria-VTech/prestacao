import styled from 'styled-components'

export const FormCadastrarFuncionarioStyled = styled.form`
  hr {
    margin: 1rem 0;
    background-color: ${props => props.theme.colors.purple300};
    opacity: 1;
  }

  h3 {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    text-transform: uppercase;
    opacity: 0.3;
  }

  .focused {
    .input-group-text {
      color: ${props => props.theme.colors.primary};
      background-color: transparentize(
        darken(${props => props.theme.colors.primary}, 12%),
        0.3
      );
      border-color: darken(${props => props.theme.colors.primary}, 12%);
    }
  }
`
