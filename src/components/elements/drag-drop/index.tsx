import React, { ReactElement, useEffect, useRef, useState } from 'react'

type DragDropProps = {
  updateTransform: (
    transformStr: string,
    tx?: number,
    ty?: number,
    tdom?: HTMLElement
  ) => void
  children: ReactElement<HTMLElement>
}

type PositionData = {
  startX: number
  startY: number
  dx: number
  dy: number
  tx: number
  ty: number
}
export const DragDrop: React.FC<DragDropProps> = ({
  children,
  updateTransform,
}) => {
  const domRef = useRef<HTMLElement>()
  const [position, setPosition] = useState<PositionData>({
    startX: 0,
    startY: 0,
    dx: 0,
    dy: 0,
    tx: 0,
    ty: 0,
  })

  const start = event => {
    if (event.button !== 0) {
      return
    }
    document.addEventListener('mousemove', docMove)
    const startX = event.pageX - position.dx
    const startY = event.pageY - position.dy

    setPosition({ ...position, startX, startY })
  }

  const docMove = event => {
    const tx = event.pageX - position.startX
    const ty = event.pageY - position.startY
    const transformStr = `translate(${tx}px,${ty}px)`
    updateTransform(transformStr, tx, ty, domRef.current)
    const dx = tx
    const dy = ty
    setPosition({ ...position, dx, dy })
  }

  const docMouseUp = event => {
    document.removeEventListener('mousemove', docMove)
  }

  useEffect(() => {
    domRef.current.addEventListener('mousedown', start)
    document.addEventListener('mouseup', docMouseUp)
    return () => {
      domRef.current.removeEventListener('mousedown', start)
      document.removeEventListener('mouseup', docMouseUp)
      document.removeEventListener('mousemove', docMove)
    }
  }, [])

  const newStyle = {
    ...children.props.style,
    cursor: 'move',
    userSelect: 'none',
  }

  return React.cloneElement(React.Children.only(children), {
    ref: tdom => {
      return (domRef.current = tdom)
    },
    style: newStyle,
  })
}

DragDrop.defaultProps = {
  updateTransform: (transformStr, tx, ty, tdom) => {
    tdom.style.transform = transformStr
  },
}

// export default class DragM extends React.Component {
//   position = {
//     startX: 0,
//     startY: 0,
//     dx: 0,
//     dy: 0,
//     tx: 0,
//     ty: 0,
//   }

//   start = event => {
//     if (event.button !== 0) {
//       return
//     }
//     document.addEventListener('mousemove', this.docMove)
//     this.position.startX = event.pageX - this.position.dx
//     this.position.startY = event.pageY - this.position.dy
//   }

//   docMove = event => {
//     const tx = event.pageX - this.position.startX
//     const ty = event.pageY - this.position.startY
//     const transformStr = `translate(${tx}px,${ty}px)`
//     this.props.updateTransform(transformStr, tx, ty, this.tdom)
//     this.position.dx = tx
//     this.position.dy = ty
//   }

//   docMouseUp = event => {
//     document.removeEventListener('mousemove', this.docMove)
//   }

//   componentDidMount() {
//     this.tdom.addEventListener('mousedown', this.start)
//     // 用document移除对mousemove事件的监听
//     document.addEventListener('mouseup', this.docMouseUp)
//   }

//   componentWillUnmount() {
//     this.tdom.removeEventListener('mousedown', this.start)
//     document.removeEventListener('mouseup', this.docMouseUp)
//     document.removeEventListener('mousemove', this.docMove)
//   }

//   render() {
//     const { children } = this.props
//     const newStyle = {
//       ...children.props.style,
//       cursor: 'move',
//       userSelect: 'none',
//     }
//     return React.cloneElement(React.Children.only(children), {
//       ref: tdom => {
//         return (this.tdom = tdom)
//       },
//       style: newStyle,
//     })
//   }
// }
