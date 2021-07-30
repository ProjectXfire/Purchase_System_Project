// React
import React, { useEffect, useState } from 'react'
// Next
import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
// Providers
import { joiResolver } from '@hookform/resolvers/joi'
import { useForm } from 'react-hook-form'
// Utils
import { parseCookies } from '@utils/parseCookies'
import { fillDropdown } from '@utils/fillDropdown'
// Services
import { createOne, getList } from '@services/apiRequest'
// Models
import { Permissions } from '@models/auth/permission.model'
import { CostCode } from '@models/account/costcode.model'
import { CostType } from '@models/account/costtype.model'
import { Budget } from '@models/account/budget.model'
import { AccountSchema } from '@models/account/account.schema'
// Styles
import { Message } from 'semantic-ui-react'
// Components
import { Layout } from '@components/shared/layout'
import { AccountCreateComponent } from '@components/chartofaccount/account/create'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  let cookie
  try {
    cookie = parseCookies(ctx)
    const responseCostCode = await getList(
      'account/costcode/list',
      cookie.token
    )
    const responseCostType = await getList(
      'account/costtype/contract/list',
      cookie.token
    )
    const responseBudget = await getList('account/budget/list', cookie.token)
    return {
      props: {
        user: cookie.user,
        token: cookie.token,
        permissions: cookie.permissions,
        dataCostCode: responseCostCode.data,
        dataCostType: responseCostType.data,
        dataBudget: responseBudget.data,
        error: ''
      }
    }
  } catch (error: any) {
    return {
      props: {
        user: cookie.user || '',
        token: cookie.token || '',
        permissions: cookie.permissions || '',
        dataCostCode: [],
        dataCostType: [],
        dataBudget: [],
        error: error.message
      }
    }
  }
}

const AccountCreatePage = ({
  user,
  token,
  permissions,
  dataCostCode,
  dataCostType,
  dataBudget,
  error
}: {
  user: string
  token: string
  permissions: Permissions
  dataCostCode: CostCode[]
  dataCostType: CostType[]
  dataBudget: Budget[]
  error: string
}): React.ReactElement => {
  const router = useRouter()
  const [errorOnRequest, setErrorOnRequest] = useState('')

  // INIT DROPDOWN VALUES
  const costCodeDropdown = fillDropdown(dataCostCode)
  const costTypeDropdown = fillDropdown(dataCostType)
  const costBudgetDropdown = fillDropdown(dataBudget)
  // SET SCHEMA TO VALIDATE FORM
  const {
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm({ resolver: joiResolver(AccountSchema) })

  // CREATE NEW ITEM
  const createItem = async (data: Record<string, unknown>) => {
    try {
      await createOne('account/create', data, token)
      router.push('/chartofaccount/account')
      setErrorOnRequest('')
    } catch (error: any) {
      setErrorOnRequest(error.message)
    }
  }

  // VALIDATE IF USER IS LOGGED
  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
    }
  }, [])

  return (
    <>
      <Head>
        <title>Account - Create</title>
        <meta name="description" content="Account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <Layout permissions={permissions}>
          <main>
            {!error ? (
              <>
                {permissions.admin || permissions.account_create ? (
                  <AccountCreateComponent
                    validateHandleSubmit={handleSubmit}
                    validateSetValue={setValue}
                    validateErrors={errors}
                    dropdownCostCode={costCodeDropdown}
                    dropdownCostType={costTypeDropdown}
                    dropdownBudget={costBudgetDropdown}
                    createItem={createItem}
                    error={errorOnRequest}
                  />
                ) : (
                  <Message
                    header="Permission Access Denied"
                    icon="times"
                    content="Error"
                    color="red"
                  />
                )}
              </>
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

export default AccountCreatePage
