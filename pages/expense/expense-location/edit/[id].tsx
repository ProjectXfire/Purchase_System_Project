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
import { Location } from '@models/contract/location.model'
import { ExpenseLocation } from '@models/expense/expense.location.model'
import { ExpenseLocationSchema } from '@models/expense/expense.location.schema'
// Styles
import { Message } from 'semantic-ui-react'
// Components
import { Layout } from '@components/shared/layout'
import { ExpenseLocationEditComponent } from '@components/generalexpense/expense-location/edit'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  let cookie
  try {
    const params = ctx.params
    const id = params && params.id ? (params.id as string) : ''
    cookie = parseCookies(ctx)
    const responseExpenseLocation = await getOne(
      'expense/expense-location/read',
      id,
      cookie.token
    )
    const responseExpense = await getList('expense/list', cookie.token)
    const responseLocation = await getList(
      'contract/location/list',
      cookie.token
    )

    return {
      props: {
        user: cookie.user,
        token: cookie.token,
        permissions: cookie.permissions,
        dataExpenseLocation: responseExpenseLocation.data,
        dataExpenses: responseExpense.data,
        dataLocations: responseLocation.data,
        error: ''
      }
    }
  } catch (error: any) {
    return {
      props: {
        user: cookie.user || '',
        token: cookie.token || '',
        permissions: cookie.permissions || '',
        dataExpenseLocation: {},
        dataExpenses: [],
        dataLocations: [],
        error: error.message
      }
    }
  }
}

const ExpenseLocationEditPage = ({
  user,
  token,
  permissions,
  dataExpenseLocation,
  dataExpenses,
  dataLocations,
  error
}: {
  user: string
  token: string
  permissions: Permissions
  dataExpenseLocation: ExpenseLocation
  dataExpenses: Expense[]
  dataLocations: Location[]
  error: string
}): React.ReactElement => {
  const router = useRouter()
  const [errorOnRequest, setErrorOnRequest] = useState('')

  // INIT DROPDOWN VALUES
  const locationDropdown = fillDropdown(dataLocations)
  const expenseDropdown = fillDropdown(dataExpenses)
  // SET SCHEMA TO VALIDATE FORM
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    control
  } = useForm({ resolver: joiResolver(ExpenseLocationSchema) })

  // EDIT ITEM
  const editItem = async (data: Record<string, unknown>) => {
    try {
      await updateOne(
        'expense/expense-location/edit',
        dataExpenseLocation._id,
        data,
        token
      )
      router.push('/expense/expense-location')
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
      setValue('expense', dataExpenseLocation.expense._id, {
        shouldValidate: true
      })
      setValue('location', dataExpenseLocation.location._id, {
        shouldValidate: true
      })
    }
  }, [])

  return (
    <>
      <Head>
        <title>Expense - Location - Edit</title>
        <meta name="description" content="Expense" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <Layout permissions={permissions}>
          <main>
            {!error ? (
              <>
                {permissions.admin || permissions.expense_edit ? (
                  <ExpenseLocationEditComponent
                    validateSetValue={setValue}
                    validateHandleSubmit={handleSubmit}
                    validateErrors={errors}
                    validateControl={control}
                    dropdownExpense={expenseDropdown}
                    dropdownLocation={locationDropdown}
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

export default ExpenseLocationEditPage
