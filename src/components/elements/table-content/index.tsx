import React from 'react'
import { Scrollbar } from '../scrollbar'
import { TableContentStyled } from './styles'

const TableContent: React.FC = ({ children }) => {
  return (
    <TableContentStyled className="table-responsive tableFixHead">
      <Scrollbar className="scroll-table">{children}</Scrollbar>
    </TableContentStyled>
  )
}

export default TableContent
