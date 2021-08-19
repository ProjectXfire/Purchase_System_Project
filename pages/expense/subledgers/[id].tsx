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
import { ExpenseSubledger } from '@models/expense/expense.subledger.model'
import { Expense } from '@models/expense/expense.model'
import { Subledger } from '@models/expense/subledger.model'
import { ExpenseSubledgerSchema } from '@models/expense/expense.subledger.schema'
// Styles
import { Message } from 'semantic-ui-react'
// Components
import { Layout } from '@components/shared/layout'
import { SubledgersByExpenseComponent } from '@components/generalexpense/expense-subledger/listbyexpense'
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
    const responseSubledgerByExpense = await getList(
      'expense/expense-subledger/subledgers',
      cookie.token,
      id
    )
    const responseSubledger = await getList(
      'expense/subledger/list',
      cookie.token
    )
    const responseExpense = await getOne('expense/read', id, cookie.token)
    return {
      props: {
        user: cookie.user,
        token: cookie.token,
        permissions: cookie.permissions,
        dataSubledgersByExpense: responseSubledgerByExpense.data,
        dataExpense: responseExpense.data,
        dataSubledgers: responseSubledger.data,
        error: ''
      }
    }
  } catch (error: any) {
    return {
      props: {
        user: cookie && cookie.user ? cookie.user : '',
        token: cookie && cookie.token ? cookie.token : '',
        permissions: cookie && cookie.permissions ? cookie.permissions : {},
        dataSubledgersByExpense: [],
        dataExpense: {},
        dataSubledgers: [],
        error: error.message
      }
    }
  }
}

const SubledgersByExpensePage = ({
  user,
  token,
  permissions,
  dataSubledgersByExpense,
  dataExpense,
  dataSubledgers,
  error
}: {
  user: string
  token: string
  permissions: Permissions
  dataSubledgersByExpense: ExpenseSubledger[]
  dataExpense: Expense
  dataSubledgers: Subledger[]
  error: any
}): React.ReactElement => {
  const router = useRouter()
  const [errorOnRequest, setErrorOnRequest] = useState('')

  // SORT DATA SEARCHED
  const [dataModified, setDataModified] = useState(dataSubledgersByExpense)

  // INIT DROPDOWN VALUES
  const subledgerDropdown = fillDropdown(dataSubledgers)

  const {
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm({ resolver: joiResolver(ExpenseSubledgerSchema) })

  // SEARCH ITEM
  const [searchInputValue, setSearchInputValue] = useState('')
  const handleSearchedValues = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchInputValue(value)
    setDataModified(
      searchItems(dataSubledgersByExpense, ['subledger.name'], value)
    )
  }

  // SORT BY COLUMN
  const sortByColumn = (column: string) => {
    setDataModified(sortColumn(dataModified, column))
  }

  // CREATE NEW ITEM
  const addItem = async (data: Record<string, unknown>) => {
    const alreadyAssigned = dataSubledgersByExpense.find(
      item => item.subledger._id === data.subledger
    )
    try {
      if (alreadyAssigned) {
        throw new Error('Subledger is already assigned')
      }
      await createOne('expense/expense-subledger/create', data, token)
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
        'expense/expense-subledger/delete',
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
        <title>Expense - Subledger</title>
        <meta name="description" content="Expense" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <Layout permissions={permissions}>
          <>
            <main>
              {!error ? (
                <SubledgersByExpenseComponent
                  validateHandleSubmit={handleSubmit}
                  validateSetValue={setValue}
                  validateErrors={errors}
                  permissions={permissions}
                  dataExpense={dataExpense}
                  tableData={dataModified}
                  subledgerDropdown={subledgerDropdown}
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

export default SubledgersByExpensePage
