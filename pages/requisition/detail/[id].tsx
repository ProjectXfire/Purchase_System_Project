// React
import React, { useEffect } from 'react'
// Next
import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
// Services
import { getList, getOne } from '@services/apiRequest'
// Utils
import { parseCookies } from '@utils/parseCookies'
// Models
import { Permissions } from '@models/auth/permission.model'
import { Requisition } from '@models/requisition/requisition.model'
import { RequisitionItems } from '@models/requisition/requisition.items.model'
// Styles
import { Message } from 'semantic-ui-react'
// Components
import { Layout } from '@components/shared/layout'
import { RequisitionDetailComponent } from '@components/requisition/requisition/detail'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  let cookie
  try {
    cookie = parseCookies(ctx)
    const params = ctx.params
    const id = params && params.id ? (params.id as string) : ''
    const requisition = await getOne('requisition/read', id, cookie.token)
    const requisitionItems = await getList(
      'requisition/items/list',
      cookie.token,
      id
    )
    return {
      props: {
        user: cookie.user,
        token: cookie.token,
        permissions: cookie.permissions,
        requisition: requisition.data,
        requisitionItems: requisitionItems.data,
        error: ''
      }
    }
  } catch (error: any) {
    return {
      props: {
        user: cookie.user || '',
        token: cookie.token || '',
        permissions: cookie.permissions || '',
        requisition: {},
        requisitionItems: [],
        error: error.message
      }
    }
  }
}

const RequisitionDetailPage = ({
  requisition,
  requisitionItems,
  user,
  permissions,
  error
}: {
  requisition: Requisition
  requisitionItems: RequisitionItems[]
  user: string
  permissions: Permissions
  error: string
}): React.ReactElement => {
  const router = useRouter()

  // VALIDATE IF USER IS LOGGED
  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
    }
  }, [])

  return (
    <>
      <Head>
        <title>Requisition - Detail</title>
        <meta name="description" content="Requisition" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <Layout permissions={permissions}>
          <main>
            {!error ? (
              <RequisitionDetailComponent
                requisition={requisition}
                requisitionItems={requisitionItems}
              />
            ) : (
              <Message
                header={error}
                icon="times"
                content="Server error"
                color="red"
              />
            )}
          </main>
        </Layout>
      )}
    </>
  )
}

export default RequisitionDetailPage
