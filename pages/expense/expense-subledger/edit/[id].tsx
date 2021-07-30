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
import { Subledger } from '@models/expense/subledger.model'
import { ExpenseSubledger } from '@models/expense/expense.subledger.model'
import { ExpenseSubledgerSchema } from '@models/expense/expense.subledger.schema'
// Styles
import { Message } from 'semantic-ui-react'
// Components
import { Layout } from '@components/shared/layout'
import { ExpenseSubledgerEditComponent } from '@components/generalexpense/expense-subledger/edit'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  let cookie
  try {
    const params = ctx.params
    const id = params && params.id ? (params.id as string) : ''
    cookie = parseCookies(ctx)
    const responseExpenseSubledger = await getOne(
      'expense/expense-subledger/read',
      id,
      cookie.token
    )
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
        dataExpenseSubledger: responseExpenseSubledger.data,
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
        dataExpenseSubledger: {},
        dataExpense: [],
        dataSubledger: [],
        error: error.message
      }
    }
  }
}

const ExpenseSubledgerEditPage = ({
  user,
  token,
  permissions,
  dataExpenseSubledger,
  dataExpense,
  dataSubledger,
  error
}: {
  user: string
  token: string
  permissions: Permissions
  dataExpenseSubledger: ExpenseSubledger
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
    setValue,
    control
  } = useForm({ resolver: joiResolver(ExpenseSubledgerSchema) })

  // EDIT ITEM
  const editItem = async (data: Record<string, unknown>) => {
    try {
      await updateOne(
        'expense/expense-subledger/edit',
        dataExpenseSubledger._id,
        data,
        token
      )
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
    } else {
      setValue('expense', dataExpenseSubledger.expense._id, {
        shouldValidate: true
      })
      setValue('subledger', dataExpenseSubledger.subledger._id, {
        shouldValidate: true
      })
    }
  }, [])

  return (
    <>
      <Head>
        <title>Expense - Subledger - Edit</title>
        <meta name="description" content="Expense" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <Layout permissions={permissions}>
          <main>
            {!error ? (
              <>
                {permissions.admin || permissions.expense_edit ? (
                  <ExpenseSubledgerEditComponent
                    validateSetValue={setValue}
                    validateHandleSubmit={handleSubmit}
                    validateErrors={errors}
                    validateControl={control}
                    dropdownExpense={expenseDropdown}
                    dropdownSubledger={subldegerDropdown}
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

export default ExpenseSubledgerEditPage
