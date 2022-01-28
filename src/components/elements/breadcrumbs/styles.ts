import styled from 'styled-components'

export const BreadcrumbsStyled = styled.div`
  margin: 0;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;

  & > div:first-child {
    flex: 1;
    display: flex;
    flex-flow: wrap;

    h2 {
      white-space: nowrap;
      /* font-weight: 500; */
    }
  }

  nav ol {
    color: ${props => props.theme.colors.primary};
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
    background: transparent;
    margin: 3px 0;

    li {
      display: flex;
      align-items: center;
      font-size: 0.8125rem;
      height: 100%;
      line-height: 1.5rem;
      font-weight: 600;

      &.lastBreadcrumb {
        color: ${props => props.theme.colors.purple700};
      }

      a {
        color: ${props => props.theme.colors.primary};

        &:hover {
          color: ${props => props.theme.colors.purple700};
        }

        i {
          display: flex;
          align-items: center;
        }
      }
    }
  }
`
