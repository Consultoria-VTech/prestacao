import React from 'react'
import { DropdownMenuStyled } from './styled'

export const DropDownMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ children, className, 'aria-labelledby': labeledBy }, ref) => {
  return (
    <DropdownMenuStyled
      ref={ref}
      className={className}
      aria-labelledby={labeledBy}>
      {children}
    </DropdownMenuStyled>
  )
})

DropDownMenu.displayName = 'DropDownMenu'
