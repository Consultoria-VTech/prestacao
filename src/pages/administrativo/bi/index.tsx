import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import BiTemplate from '../../../components/templates/bi'
import SystemLayout from '../../../components/layout/system'
import TemplateDefault from '../../../components/templates/default'
import { getPageConfiguration } from '../../../services/pages'
import { BiPagination } from '../../../types/models/bi'
import { PageProps } from '../../../types/page'

type BiPageProps = PageProps<BiPagination>

const BiPage: NextPage<BiPageProps> = props => {
  const router = useRouter()
  const page = getPageConfiguration(router.pathname)

  return (
    <SystemLayout title={page.name}>
      <TemplateDefault page={page}>
        <BiTemplate />
      </TemplateDefault>
    </SystemLayout>
  )
}

export default BiPage