// React
import React, { useEffect } from 'react'
// Next
import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
// Providers
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Services
import { getOneSSR } from '@services/apiRequest'
// Models
import { Permissions } from '@models/auth/permission.model'
import { ShipBy } from '@models/requisition/shipby.model'
// Styles
import { Message } from 'semantic-ui-react'
// Components
import { Layout } from '@components/shared/layout'
import { ShipByDetailComponent } from '@components/requisition/shipby/detail'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const response = await getOneSSR('requisition/ship-by/read', ctx)
  return {
    props: {
      ...response,
      ...(await serverSideTranslations(ctx.locale as string, [
        'menu',
        'common'
      ]))
    }
  }
}

const ShipByDetailPage = ({
  data,
  user,
  permissions,
  error
}: {
  data: ShipBy
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
        <title>Ship By - Detail</title>
        <meta name="description" content="Requisition" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <Layout permissions={permissions}>
          <main>
            {!error ? (
              <ShipByDetailComponent data={data} />
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

export default ShipByDetailPage
