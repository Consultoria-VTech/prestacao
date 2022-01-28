import React from 'react'

// import { Container } from './styles';

const TableHeader: React.FC = ({ children }) => {
  return (
    <div className="py-3 px-3">
      <div className="text-end">{children}</div>
    </div>
  )
}

export default TableHeader
