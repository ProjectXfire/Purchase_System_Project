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
import { getList, getOne, updateOne } from '@services/apiRequest'
// Models
import { Permissions } from '@models/auth/permission.model'
import { Expense } from '@models/expense/expense.model'
import { CostType } from '@models/account/costtype.model'
import { ExpenseAccount } from '@models/expense/expense.account.model'
import { ExpenseAccountSchema } from '@models/expense/expense.account.schema'
// Styles
import { Message } from 'semantic-ui-react'
// Components
import { Layout } from '@components/shared/layout'
import { ExpenseAccountEditComponet } from '@components/generalexpense/expense-account/edit'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  let cookie
  try {
    const params = ctx.params
    const id = params && params.id ? (params.id as string) : ''
    cookie = parseCookies(ctx)
    const responseExpenseAccount = await getOne(
      'expense/expense-account/read',
      id,
      cookie.token
    )
    const responseExpense = await getList('expense/list', cookie.token)
    const responseAccount = await getList(
      'account/costtype/expense/dropdown/list',
      cookie.token
    )
    return {
      props: {
        user: cookie.user,
        token: cookie.token,
        permissions: cookie.permissions,
        dataExpenseAccount: responseExpenseAccount.data,
        dataExpense: responseExpense.data,
        dataAccount: responseAccount.data,
        error: ''
      }
    }
  } catch (error: any) {
    return {
      props: {
        user: cookie.user || '',
        token: cookie.token || '',
        permissions: cookie.permissions || '',
        dataExpenseAccount: {},
        dataExpense: [],
        dataAccount: [],
        error: error.message
      }
    }
  }
}

const ExpenseAccountEditPage = ({
  user,
  token,
  permissions,
  dataExpenseAccount,
  dataExpense,
  dataAccount,
  error
}: {
  user: string
  token: string
  permissions: Permissions
  dataExpenseAccount: ExpenseAccount
  dataExpense: Expense[]
  dataAccount: CostType[]
  error: string
}): React.ReactElement => {
  const router = useRouter()
  const [errorOnRequest, setErrorOnRequest] = useState('')

  // INIT DROPDOWN VALUES
  const expenseDropdown = fillDropdown(dataExpense)
  const accountDropdown = fillDropdown(dataAccount)
  // SET SCHEMA TO VALIDATE FORM
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    control
  } = useForm({ resolver: joiResolver(ExpenseAccountSchema) })

  // EDIT ITEM
  const editItem = async (data: Record<string, unknown>) => {
    try {
      await updateOne(
        'expense/expense-account/edit',
        dataExpenseAccount._id,
        data,
        token
      )
      router.push('/expense/expense-account')
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
      setValue('expense', dataExpenseAccount.expense._id, {
        shouldValidate: true
      })
      setValue('costtype', dataExpenseAccount.costtype._id, {
        shouldValidate: true
      })
    }
  }, [])

  return (
    <>
      <Head>
        <title>Expense - Account - Edit</title>
        <meta name="description" content="Expense" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <Layout permissions={permissions}>
          <main>
            {!error ? (
              <>
                {permissions.admin || permissions.expense_edit ? (
                  <ExpenseAccountEditComponet
                    validateSetValue={setValue}
                    validateHandleSubmit={handleSubmit}
                    validateErrors={errors}
                    validateControl={control}
                    dropdownExpense={expenseDropdown}
                    dropdownAccount={accountDropdown}
                    editItem={editItem}
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

export default ExpenseAccountEditPage
