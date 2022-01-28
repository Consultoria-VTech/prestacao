import React from 'react'
import { BoxNavStyled, BoxNavBackgroundStyled, BoxStyledProps } from './styles'

type BoxProps = BoxStyledProps & {
  nameCampo : string,
  nameLabel : string
}

export const BoxNav: React.FC<BoxProps> = ({ children, nameCampo, nameLabel }) => {
  return (
      <BoxNavStyled>
        <div className="tab">
          <input type="radio" name="tabs" id={nameCampo}/>
          <label htmlFor={nameCampo}>{nameLabel}</label>
          <div className="tabs">
            <div className="content">
              {children}
            </div>
          </div>
        </div>
      </BoxNavStyled>  

  )
}
