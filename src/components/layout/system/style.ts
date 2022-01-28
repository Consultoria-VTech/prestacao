import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;

  & > .main-system {
    flex-grow: 1;
    transition: all 0.4s ease-out;

    & > footer {
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
