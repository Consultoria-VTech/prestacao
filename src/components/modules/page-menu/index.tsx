import Link from 'next/link'
import React from 'react'
import { useApp } from '../../../context/appContext'
import { Page, PageSize, PageStyle } from '../../../types/page'
import Icon from '../../elements/icon'
import { useResize } from './../../../hooks/useResize'
import { PageMenuDecoredStyled, PageMenuStyled } from './styles'

type PageMenuContainerProps = {
  pages?: Page[]
  size?: PageSize | null
  style?: PageStyle
}

const PageMenu: React.FC<Page> = ({
  path,
  name,
  description,
  icon,
  size = 'small',
  style = 'default',
}) => {
  const { isFixed } = useApp()
  const { screenWidth } = useResize()

  if (style === 'default')
    return (
      <PageMenuStyled
        size={size}
        className={`col-6 col-sm-4 ${
          !isFixed || screenWidth > 998 ? 'col-md-3' : ''
        } ${
          !isFixed || screenWidth > 1500
            ? size === 'large'
              ? 'col-lg-4'
              : 'col-lg-2'
            : ''
        }`}>
        <div className="card text-center card__menu">
          <Link href={path}>
            <a href={path} className="card__link">
              <Icon icon={icon} className="card-img-top card__icon" />
              <div className="card-body">
                <h4 className="card-title">{name}</h4>
                <p className="card-text">{description}</p>
              </div>
            </a>
          </Link>
        </div>
      </PageMenuStyled>
    )
  else
    return (
      <PageMenuDecoredStyled
        size={size}
        className={`col-6 col-sm-4 ${
          !isFixed || screenWidth > 998 ? 'col-md-3' : ''
        } ${
          !isFixed || screenWidth > 1500
            ? size === 'large'
              ? 'col-lg-4'
              : 'col-lg-2'
            : ''
        }`}>
        <div className="card text-center card__menu">
          <Link href={path}>
            <a href={path} className="card__link">
              <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p className="card-text">{description}</p>
              </div>
              <div className="footer">
                <Icon icon={icon} className="card__icon" />
              </div>
            </a>
          </Link>
        </div>
      </PageMenuDecoredStyled>
    )
}

export const PageMenuContainer: React.FC<PageMenuContainerProps> = ({
  pages,
  size,
}) => {
  return (
    // <div className="container-fluid px-0">
    //   <div className={`row ${size === 'large' ? 'g-4' : 'g-3'}`}>
    //     {(pages || [])
    //       .filter(p => p.show)
    //       .map(option => {
    //         return (
    //           <PageMenu
    //             {...option}
    //             size={size || option.size}
    //             key={option.name}
    //           />
    //         )
    //       })}
    //   </div>
    // </div>
    <p></p>
  )
}

export default PageMenu