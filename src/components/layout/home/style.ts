import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;

  & > .main-home {
    flex-grow: 1;
    transition: all 0.4s ease-out;

    & > div {
      overflow: auto;
      height: calc(
        100vh - ${props => props.theme.size.headerHomeHeightDesktop}
      );

      @media screen and (max-width: 768px) {
        height: calc(100vh - ${props => props.theme.size.headerHomeHeight});
      }
    }

    footer {
      width: 100%;
      min-height: 80px;
      text-align: center;
      border-top: 1px solid #eaeaea;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`

export default Wrapper
