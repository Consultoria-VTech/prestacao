// import { Container } from './styles';
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ImHome3 } from 'react-icons/im'
import { PageMain } from './../../../util/constants'
import { BreadcrumbsStyled } from './styles'

type BreadcrumbsProps = {
  href: string
  breadcrumb: string
}

type BreadcrumbsPropsFunc = {
  title?: string
  path?: string
  descriptionFullPath?: string
}
export const Breadcrumbs: 
React.FC<BreadcrumbsPropsFunc> = ({
  title = 'Inicio',
  path,
  descriptionFullPath,
  children,
}) => {
  const router = useRouter()

  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbsProps[]>([])
  // const breadcrumbsRef = useRef<BreadcrumbsProps[]>()

  useEffect(() => {
    if (path || descriptionFullPath) {
      // Captura tudo que esta entre conchetes []
      const rg = /(\[(?:\[??[^\\[]*?\]))/g

      path = path.replaceAll(rg, '')
      path = path.replaceAll('//', '/')

      const linkPath = path?.split('/')
      const descriptionPathArray = descriptionFullPath?.split('/')
      linkPath?.shift()
      descriptionPathArray?.shift()

      const pathArray: BreadcrumbsProps[] = []
      linkPath.forEach((path, i) => {
        const breadcrumb = {
          breadcrumb:
            descriptionPathArray?.length > 0 ? descriptionPathArray[i] : '',
          href: '/' + linkPath.slice(0, i + 1).join('/'),
        }
        pathArray.push(breadcrumb)
      })
      if (pathArray.length > 0) {
        setBreadcrumbs(pathArray)
      }
    }
  }, [path, router.query])

  const formatBreadcrumb = (string: string) => {
    return string
      .replace(/-/g, ' ')
      .replace(/oe/g, 'ö')
      .replace(/ae/g, 'ä')
      .replace(/ue/g, 'ü')
  }

  return (
    <BreadcrumbsStyled>
      <div>
        <h2 className="d-inline-block mb-0 me-2">{title}</h2>
        <nav
          aria-label="breadcrumbs"
          className="d-none d-md-inline-block ml-md-4">
          <ol className="breadcrumb breadcrumb-links">
            <li className="breadcrumb-item">
              <Link href={PageMain.path}>
                <a href={PageMain.path} className="ms-2">
                  <i>
                    <ImHome3 size="1rem" />
                  </i>
                </a>
              </Link>
            </li>
            {breadcrumbs?.splice(0, breadcrumbs.length - 1).map(breadcrumb => {
              return (
                <li key={breadcrumb.href} className="breadcrumb-item">
                  <Link href={breadcrumb.href}>
                    <a href={breadcrumb.href}>
                      {formatBreadcrumb(breadcrumb.breadcrumb)}
                    </a>
                  </Link>
                </li>
              )
            })}
            {breadcrumbs?.splice(breadcrumbs.length - 1, 1).map(breadcrumb => {
              return (
                <li
                  key={breadcrumb.href}
                  className="breadcrumb-item lastBreadcrumb">
                  {formatBreadcrumb(breadcrumb.breadcrumb)}
                </li>
              )
            })}
          </ol>
        </nav>
      </div>
      {children}
    </BreadcrumbsStyled>
  )
}

