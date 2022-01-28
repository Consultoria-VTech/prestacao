import { Breadcrumbs, Card } from '@components'
import { Page } from '@types'
import React, { ReactNode } from 'react'
import { TemplateDefaultStyled } from './styles'

type TemplateDefaultProps = {
  className?: string
  children: ReactNode
  page?: Page
  actions?: ReactNode
}

type TemplateDefaultTableProps = {
  className?: string
  children: ReactNode
  height?: string
}

const TemplateDefault: React.FC<TemplateDefaultProps> = ({
  children,
  className,
  page,
  actions,
}) => {
  return (
    <TemplateDefaultStyled className={`container-fluid ${className}`}>
      {page && (
        <Breadcrumbs
          title={page.name}
          path={page.path}
          descriptionFullPath={page.descriptionFullPath}>
          {actions}
        </Breadcrumbs>
      )}
      {children}
    </TemplateDefaultStyled>
  )
}

export const TemplateDefaultTable: React.FC<TemplateDefaultTableProps> = ({
  children,
  height = 'calc(105vh - 10rem)',
}) => {
  return (
    <div>
      <div className="align-items-center">
        <div className="container-fluid px-0">
          <div className="row gx-2">
            <div className="col">
              <Card style={{ height: height }}>{children}</Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TemplateDefault
