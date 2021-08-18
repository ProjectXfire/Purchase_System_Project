import React, { ChangeEvent, useEffect, useState } from 'react'
// Next
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
// Providers
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
// Utils
import { parseCookies } from '@utils/parseCookies'
import { searchItems } from '@utils/searchItems'
import { sortColumn } from '@utils/sortColumn'
import { fillDropdown } from '@utils/fillDropdown'
// Services
import { createOne, deleteOne, getList, getOne } from '@services/apiRequest'
// Models
import { Permissions } from '@models/auth/permission.model'
import { ExpenseAccount } from '@models/expense/expense.account.model'
import { Expense } from '@models/expense/expense.model'
import { CostType } from '@models/account/costtype.model'
import { ExpenseAccountSchema } from '@models/expense/expense.account.schema'
// Styles
import { Message } from 'semantic-ui-react'
// Components
import { Layout } from '@components/shared/layout'
import { AccountsByExpenseComponent } from '@components/generalexpense/expense-account/listbyexpense'
import { ModalDeleteComponent } from '@components/shared/modalDelete'
import { ModalErrorComponent } from '@components/shared/modalError'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  let cookie
  try {
    const params = ctx.params
    const id = params && params.id ? (params.id as string) : ''
    cookie = parseCookies(ctx)
    const responseAccountByExpense = await getList(
      'expense/expense-account/accounts',
      cookie.token,
      id
    )
    const responseAccount = await getList(
      'account/costtype/expense/list',
      cookie.token
    )
    const responseExpense = await getOne('expense/read', id, cookie.token)
    return {
      props: {
        user: cookie.user,
        token: cookie.token,
        permissions: cookie.permissions,
        dataAccountsByExpense: responseAccountByExpense.data,
        dataExpense: responseExpense.data,
        dataAccounts: responseAccount.data,
        error: ''
      }
    }
  } catch (error: any) {
    return {
      props: {
        user: cookie && cookie.user ? cookie.user : '',
        token: cookie && cookie.token ? cookie.token : '',
        permissions: cookie && cookie.permissions ? cookie.permissions : {},
        dataAccountsByExpense: [],
        dataExpense: {},
        dataAccounts: [],
        error: error.message
      }
    }
  }
}

const AccountsByExpensePage = ({
  user,
  token,
  permissions,
  dataAccountsByExpense,
  dataExpense,
  dataAccounts,
  error
}: {
  user: string
  token: string
  permissions: Permissions
  dataAccountsByExpense: ExpenseAccount[]
  dataExpense: Expense
  dataAccounts: CostType[]
  error: any
}): React.ReactElement => {
  const router = useRouter()
  const [errorOnRequest, setErrorOnRequest] = useState('')

  // SORT DATA SEARCHED
  const [dataModified, setDataModified] = useState(dataAccountsByExpense)

  // INIT DROPDOWN VALUES
  const accountDropdown = fillDropdown(dataAccounts)

  const {
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm({ resolver: joiResolver(ExpenseAccountSchema) })

  // SEARCH ITEM
  const [searchInputValue, setSearchInputValue] = useState('')
  const handleSearchedValues = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchInputValue(value)
    setDataModified(
      searchItems(dataAccountsByExpense, ['costtype.name'], value)
    )
  }

  // SORT BY COLUMN
  const sortByColumn = (column: string) => {
    setDataModified(sortColumn(dataModified, column))
  }

  // CREATE NEW ITEM
  const addItem = async (data: Record<string, unknown>) => {
    try {
      await createOne('expense/expense-account/create', data, token)
      window.location.reload()
    } catch (error: any) {
      setErrorOnRequest(error.message)
    }
  }

  // DELETE ITEM
  const [showModal, setShowModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState({
    showModal: false,
    errorMessage: ''
  })
  const [selectedItem, setSelectedItem] = useState({
    itemId: '',
    itemName: ''
  })
  const deleteItem = async () => {
    try {
      await deleteOne(
        'expense/expense-account/delete',
        selectedItem.itemId,
        token
      )
      setSelectedItem({
        itemId: '',
        itemName: ''
      })
      setShowModal(false)
      window.location.reload()
    } catch (error: any) {
      setShowModal(false)
      setShowErrorModal({
        showModal: true,
        errorMessage: error.message
      })
    }
  }

  // VALIDATE IF USER IS LOGGED
  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
    } else {
      setValue('expense', dataExpense._id)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Expense - Account</title>
        <meta name="description" content="Expense" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <Layout permissions={permissions}>
          <>
            <main>
              {!error ? (
                <AccountsByExpenseComponent
                  validateHandleSubmit={handleSubmit}
                  validateSetValue={setValue}
                  validateErrors={errors}
                  permissions={permissions}
                  dataExpense={dataExpense}
                  tableData={dataModified}
                  accountDropdown={accountDropdown}
                  searchInputValue={searchInputValue}
                  handleSearchedValues={handleSearchedValues}
                  sortByColumn={sortByColumn}
                  setSelectedItem={setSelectedItem}
                  addItem={addItem}
                  setShowModal={setShowModal}
                  error={errorOnRequest}
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
            <ModalDeleteComponent
              showModal={showModal}
              setShowModal={setShowModal}
              headerText="Delete"
              message="Are you sure to delete?"
              deleteItemText={selectedItem.itemName}
              deleteAction={deleteItem}
            />
            <ModalErrorComponent
              setShowErrorModal={setShowErrorModal}
              showErrorModal={showErrorModal.showModal}
              errorMessage={showErrorModal.errorMessage}
            />
          </>
        </Layout>
      )}
    </>
  )
}

export default AccountsByExpensePage
