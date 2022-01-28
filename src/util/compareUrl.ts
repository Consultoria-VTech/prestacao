import { NextRouter } from 'next/router'
import { UrlObject } from 'url'

export type CompareUrlProps = {
  router: NextRouter
  as?: string | UrlObject
  href?: string
}

export const compareUrl = ({ router, as, href }: CompareUrlProps): boolean => {
  const sanitizedPath = router.asPath.split('#')[0].split('?')[0]

  return sanitizedPath === href || sanitizedPath === as
}
