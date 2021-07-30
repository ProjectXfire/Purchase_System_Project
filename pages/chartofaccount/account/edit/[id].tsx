// React
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
// Next
import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
// Providers
import { joiResolver } from '@hookform/resolvers/joi'
// Utils
import { parseCookies } from '@utils/parseCookies'
import { fillDropdown } from '@utils/fillDropdown'
// Services
import { getList, getOne, updateOne } from '@services/apiRequest'
// Models
import { Permissions } from '@models/auth/permission.model'
import { AccountSchema } from '@models/account/account.schema'
import { Account } from '@models/account/account.model'
import { CostCode } from '@models/account/costcode.model'
import { CostType } from '@models/account/costtype.model'
import { Budget } from '@models/account/budget.model'
// Styles
import { Message } from 'semantic-ui-react'
// Components
import { Layout } from '@components/shared/layout'
import { AccountEditComponent } from '@components/chartofaccount/account/edit'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  let cookie
  try {
    cookie = parseCookies(ctx)
    const params = ctx.params
    const id = params && params.id ? (params.id as string) : ''
    const responseAccount = await getOne('account/read', id, cookie.token)
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
        dataAccount: responseAccount.data,
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
        dataAccount: {},
        dataCostCode: [],
        dataCostType: [],
        dataBudget: [],
        error: error.message
      }
    }
  }
}

const AccountEditPage = ({
  user,
  token,
  permissions,
  dataAccount,
  dataCostCode,
  dataCostType,
  dataBudget,
  error
}: {
  user: string
  token: string
  permissions: Permissions
  dataAccount: Account
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
    setValue,
    handleSubmit,
    control
  } = useForm({
    resolver: joiResolver(AccountSchema)
  })

  // EDIT ITEM
  const updateItem = async (data: Record<string, unknown>) => {
    try {
      await updateOne('account/edit', dataAccount._id, data, token)
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
    } else {
      setValue('costcode', dataAccount.costcode._id, { shouldValidate: true })
      setValue('costtype', dataAccount.costtype._id, { shouldValidate: true })
      setValue('budget', dataAccount.budget._id, { shouldValidate: true })
    }
  }, [])

  return (
    <>
      <Head>
        <title>Account - Edit</title>
        <meta name="description" content="Account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <Layout permissions={permissions}>
          <main>
            {!error ? (
              <>
                {permissions.admin || permissions.account_edit ? (
                  <AccountEditComponent
                    validateSetValue={setValue}
                    validateErrors={errors}
                    validateHandleSubmit={handleSubmit}
                    validateControl={control}
                    dropdownCostCode={costCodeDropdown}
                    dropdownCostType={costTypeDropdown}
                    dropdownBudget={costBudgetDropdown}
                    updateItem={updateItem}
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

export default AccountEditPage
