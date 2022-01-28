import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import SystemLayout from '../../../../components/layout/system'
import TemplateDefault from '../../../../components/templates/default'
import { getPageConfiguration } from '../../../../services/pages'
import { PageProps } from '../../../../types/page'

const Container = styled.div`
  height: 83vh;

  div {
    height: 100%;
  }
`

const ControladoriaPageDreComparativoAnual: NextPage<PageProps> = () => {
  const router = useRouter()
  const page = getPageConfiguration(router.pathname)
  const [isMounted, setIsMounted] = useState(false)
  const PowerBiRef = useRef<any>()
  const modelRef = useRef<any>()
  useEffect(() => {
    const importPowerBiReact = async () => {
      const res = await import('powerbi-client')
      modelRef.current = res.models

      const result = await import('powerbi-client-react')
      PowerBiRef.current = result.PowerBIEmbed
      // setPowerBi(result.PowerBIEmbed)
      setIsMounted(true)
    }

    importPowerBiReact()
  }, [])

  return (
    <SystemLayout>
      <TemplateDefault page={page}>
        <iframe
          width="100%"
          height="700"
          src="https://app.powerbi.com/reportEmbed?reportId=eb0e004f-092b-4709-9faa-fc136acfaca7&autoAuth=true&ctid=963028bf-5d91-4069-868e-f512e5993a1c&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLWJyYXppbC1zb3V0aC1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D"></iframe>
      </TemplateDefault>
    </SystemLayout>
  )

  // return (
  //   <SystemLayout title={page.name}>
  //     <TemplateDefault page={page}>
  //       <Container className="card" suppressHydrationWarning>
  //         {process.browser && isMounted && PowerBiRef.current && (
  //           <PowerBiRef.current
  //             embedConfig={{
  //               type: 'report', // Supported types: report, dashboard, tile, visual and qna
  //               id: undefined,
  //               embedUrl:
  //                 'https://app.powerbi.com/view?r=eyJrIjoiMGFjODUyOTUtYzcyZS00NDg0LWI0YWYtYTQyOGU3MWRmOGI4IiwidCI6Ijk2MzAyOGJmLTVkOTEtNDA2OS04NjhlLWY1MTJlNTk5M2ExYyJ9&pageName=ReportSectionafdf01d69843d6d53a86',
  //               accessToken: undefined,

  //               tokenType: 1,
  //               settings: {
  //                 panes: {
  //                   filters: {
  //                     expanded: false,
  //                     visible: false,
  //                   },
  //                 },
  //                 background: modelRef.current?.BackgroundType?.Transparent,
  //               },
  //             }}
  //             eventHandlers={
  //               new Map([
  //                 [
  //                   'loaded',
  //                   function () {
  //                     console.log('Report loaded')
  //                   },
  //                 ],
  //                 [
  //                   'rendered',
  //                   function () {
  //                     console.log('Report rendered')
  //                   },
  //                 ],
  //                 [
  //                   'error',
  //                   function (event) {
  //                     console.log(event.detail)
  //                   },
  //                 ],
  //               ])
  //             }
  //             cssClassName={'report-style-class'}
  //             getEmbeddedComponent={embeddedReport => {
  //               // window.report = embeddedReport
  //             }}
  //           />
  //         )}
  //       </Container>
  //     </TemplateDefault>
  //   </SystemLayout>
  // )
}

// export const getServerSideProps: GetServerSideProps = async context => {
//   const retorno =await verifyAuth(context)

//   return {
//     props: {
//       message: '',
//       user: retorno.user,
//     },
//   }
// }

export default ControladoriaPageDreComparativoAnual
