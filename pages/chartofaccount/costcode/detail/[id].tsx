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
import { CostCode } from '@models/account/costcode.model'
// Styles
import { Message } from 'semantic-ui-react'
// Components
import { Layout } from '@components/shared/layout'
import { CostCodeDetailComponent } from '@components/chartofaccount/costcode/detail'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const response = await getOneSSR('account/costcode/read', ctx)
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

const CostCodeDetailPage = ({
  data,
  user,
  permissions,
  error
}: {
  data: CostCode
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
        <title>Cost Code - Detail</title>
        <meta name="description" content="Cost Code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <Layout permissions={permissions}>
          <main>
            {!error ? (
              <CostCodeDetailComponent data={data} />
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

export default CostCodeDetailPage
