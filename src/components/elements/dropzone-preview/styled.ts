import styled from 'styled-components'

const getColor = props => {
  if (props.isDragAccept) {
    return '#00e676'
  }
  if (props.isDragReject) {
    return '#ff1744'
  }
  if (props.isDragActive) {
    return '#2196f3'
  }
  return '#eeeeee'
}

type ContainerProps = {
  visible?: boolean
}
export const Container = styled.div<ContainerProps>`
  flex: 1;
  display: ${props => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  cursor: pointer;

  p {
    margin: 0;
    font-size: 0.875rem;
  }
  &:active,
  &:hover,
  &:focus {
    border-color: ${props => props.theme.colors.purple900};
  }
`
export const ThumbsContainer = styled.aside`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 1rem;
`

export const Thumb = styled.div`
  display: inline-flex;
  border-radius: 2px;
  border: 1px solid #eaeaea;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
  width: 6rem;
  height: 6rem;
  padding: 0.25rem;
  box-sizing: border-box;
`

export const ThumbInner = styled.div`
  display: flex;
  min-width: 0;
  overflow: hidden;
`

export const Imagem = styled.img`
  display: block;
  width: auto;
  height: 100%;
`

export const DropZoneStyled = styled.div`
  height: 120px;
  p {
    margin: 0;
    font-size: 0.875rem;
  }
`
