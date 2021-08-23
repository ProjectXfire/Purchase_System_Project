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
import { Budget } from '@models/account/budget.model'
// Styles
import { Message } from 'semantic-ui-react'
// Components
import { Layout } from '@components/shared/layout'
import { BudgetDetailComponent } from '@components/chartofaccount/budget/detail'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const response = await getOneSSR('account/budget/read', ctx)
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

const BudgetDetailPage = ({
  data,
  user,
  permissions,
  error
}: {
  data: Budget
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
        <title>Budget - Detail</title>
        <meta name="description" content="Budget" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <Layout permissions={permissions}>
          <main>
            {!error ? (
              <BudgetDetailComponent data={data} />
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

export default BudgetDetailPage
