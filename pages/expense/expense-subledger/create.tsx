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
import { Expense } from '@models/expense/expense.model'
import { Subledger } from '@models/expense/subledger.model'
import { ExpenseSubledgerSchema } from '@models/expense/expense.subledger.schema'
// Styles
import { Message } from 'semantic-ui-react'
// Components
import { Layout } from '@components/shared/layout'
import { ExpenseSubledgerCreateComponent } from '@components/generalexpense/expense-subledger/create'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  let cookie
  try {
    cookie = parseCookies(ctx)
    const responseExpense = await getList('expense/list', cookie.token)
    const responseSubledger = await getList(
      'expense/subledger/list',
      cookie.token
    )
    return {
      props: {
        user: cookie.user,
        token: cookie.token,
        permissions: cookie.permissions,
        dataExpense: responseExpense.data,
        dataSubledger: responseSubledger.data,
        error: ''
      }
    }
  } catch (error: any) {
    return {
      props: {
        user: cookie.user || '',
        token: cookie.token || '',
        permissions: cookie.permissions || '',
        dataExpense: [],
        dataSubledger: [],
        error: error.message
      }
    }
  }
}

const ExpenseSubledgerCreatePage = ({
  user,
  token,
  permissions,
  dataExpense,
  dataSubledger,
  error
}: {
  user: string
  token: string
  permissions: Permissions
  dataExpense: Expense[]
  dataSubledger: Subledger[]
  error: string
}): React.ReactElement => {
  const router = useRouter()
  const [errorOnRequest, setErrorOnRequest] = useState('')

  // INIT DROPDOWN VALUES
  const expenseDropdown = fillDropdown(dataExpense)
  const subldegerDropdown = fillDropdown(dataSubledger)
  // SET SCHEMA TO VALIDATE FORM
  const {
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm({ resolver: joiResolver(ExpenseSubledgerSchema) })

  // CREATE NEW ITEM
  const createItem = async (data: Record<string, unknown>) => {
    try {
      await createOne('expense/expense-subledger/create', data, token)
      router.push('/expense/expense-subledger')
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
        <title>Expense - Subledger - Create</title>
        <meta name="description" content="Expense" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <Layout permissions={permissions}>
          <main>
            {!error ? (
              <>
                {permissions.admin || permissions.expense_create ? (
                  <ExpenseSubledgerCreateComponent
                    validateHandleSubmit={handleSubmit}
                    validateSetValue={setValue}
                    validateErrors={errors}
                    dropdownExpense={expenseDropdown}
                    dropdownSubledger={subldegerDropdown}
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

export default ExpenseSubledgerCreatePage
