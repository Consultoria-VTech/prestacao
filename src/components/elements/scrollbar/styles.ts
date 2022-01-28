import styled from 'styled-components'

interface ViewScrollProps {
  marginRight?: string | number
  marginBottom?: string | number
  disable?: boolean
}

interface ThumbScrollProps {
  widthThumb?: number
  disable?: boolean
}
interface TrackScrollProps extends ThumbScrollProps {
  margin?: number
  disable?: boolean
}

export const ViewScroll = styled.div<ViewScrollProps>`
  margin-right: ${props =>
    props.disable ? 0 : props.marginRight + 'px'} !important;
  margin-bottom: ${props =>
    props.disable ? 0 : props.marginBottom + 'px'} !important;

  overflow: ${props => (props.disable ? 'hidden' : 'scroll')} !important;

  /* @media screen and (max-width: 1188px) {
    margin-right: ${props => (props.disable ? 0 : '-1.04rem')} !important;
    margin-bottom: ${props => (props.disable ? 0 : '-1.04rem')} !important;
  }

  @media screen and (max-width: 782px) {
    margin-right: ${props => (props.disable ? 0 : '-1.08rem')} !important;
    margin-bottom: ${props => (props.disable ? 0 : '-1.08rem')} !important;
  }

  @media screen and (max-width: 520px) {
    margin-right: ${props => (props.disable ? 0 : '-1.17rem')} !important;
    margin-bottom: ${props => (props.disable ? 0 : '-1.17rem')} !important;
  } */
`

export const ThumbScroll = styled.div<ThumbScrollProps>`
  background: ${props => props.theme.colors.purple500}!important;
  border-radius: inherit !important;
  width: ${props => props.widthThumb + 'px' || '4px'} !important;
  display: ${props => props.disable && 'none'} !important;
  transition: background-color 0.2s ease-out;
  &:hover {
    background-color: ${props => props.theme.colors.purple800} !important;
    /* width: 5px !important; */
    width: ${props => props.widthThumb + 1 + 'px' || '5px'};
  }
`

export const TrackScroll = styled.div<TrackScrollProps>`
  right: ${props => props.margin + 'px'} !important;
  bottom: ${props => props.margin + 'px'} !important;
  width: ${props => props.widthThumb + 'px' || '6px'} !important;
  display: ${props => props.disable && 'none'} !important;
  /* display: none !important; */
`
