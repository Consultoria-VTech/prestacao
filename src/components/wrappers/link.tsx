import Link from 'next/link'
import { NextRouter, withRouter } from 'next/router'
import { Children, cloneElement } from 'react'
import { UrlObject } from 'url'

type WithRouterProps = {
  router: NextRouter
  children: any
  as?: string | UrlObject
  href: string
  activeClassName?: string
  activeSubClassName?: string
}
export default withRouter(
  ({
    router,
    children,
    as,
    href,
    activeClassName,
    activeSubClassName,
    ...rest
  }: WithRouterProps) => {
    const child = Children.only(children)
    const childClassName = child.props.className || ''
    // remove URL parameters
    const sanitizedPath = router.asPath.split('#')[0].split('?')[0]
    // activeClassName and activeSubClassName are optional and default to "active" and "active-sub"
    const activeClass = activeClassName || 'active'
    const activeSubClass = activeSubClassName || 'active-sub'
    // check if the link or a sub-page is active and return the according class name
    const activityClassName =
      sanitizedPath === href || sanitizedPath === as
        ? activeClass
        : sanitizedPath.startsWith(href + '/') ||
          sanitizedPath.startsWith(as + '/')
        ? activeSubClass
        : ''
    // combine the child class names with the activity class name
    const classNameLink = `${childClassName} ${activityClassName}`.trim()
    return (
      <Link href={href} as={as} {...rest}>
        {cloneElement(child, {
          className: classNameLink || null,
        })}
      </Link>
    )
  }
)
