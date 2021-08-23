import React, { ChangeEvent, useEffect, useState } from 'react'
// Next
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
// Providers
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Utils
import { parseCookies } from '@utils/parseCookies'
import { searchItems } from '@utils/searchItems'
import { sortColumn } from '@utils/sortColumn'
import { fillDropdown } from '@utils/fillDropdown'
// Services
import { createOne, deleteOne, getList, getOne } from '@services/apiRequest'
// Models
import { Permissions } from '@models/auth/permission.model'
import { ExpenseLocation } from '@models/expense/expense.location.model'
import { Expense } from '@models/expense/expense.model'
import { Location } from '@models/contract/location.model'
import { ExpenseLocationSchema } from '@models/expense/expense.location.schema'
// Styles
import { Message } from 'semantic-ui-react'
// Components
import { Layout } from '@components/shared/layout'
import { LocationsByExpenseComponent } from '@components/generalexpense/expense-location/listbyexpense'
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
    const responseLocationsByExpense = await getList(
      'expense/expense-location/locations',
      cookie.token,
      id
    )
    const responseLocation = await getList(
      'contract/location/dropdown/list',
      cookie.token
    )
    const responseExpense = await getOne('expense/read', id, cookie.token)
    return {
      props: {
        user: cookie.user,
        token: cookie.token,
        permissions: cookie.permissions,
        dataLocationsByExpense: responseLocationsByExpense.data,
        dataExpense: responseExpense.data,
        dataLocations: responseLocation.data,
        error: '',
        ...(await serverSideTranslations(ctx.locale as string, [
          'menu',
          'common'
        ]))
      }
    }
  } catch (error: any) {
    return {
      props: {
        user: cookie && cookie.user ? cookie.user : '',
        token: cookie && cookie.token ? cookie.token : '',
        permissions: cookie && cookie.permissions ? cookie.permissions : {},
        dataLocationsByExpense: [],
        dataExpense: {},
        dataLocations: [],
        error: error.message
      }
    }
  }
}

const LocationsByExpensePage = ({
  user,
  token,
  permissions,
  dataLocationsByExpense,
  dataExpense,
  dataLocations,
  error
}: {
  user: string
  token: string
  permissions: Permissions
  dataLocationsByExpense: ExpenseLocation[]
  dataExpense: Expense
  dataLocations: Location[]
  error: any
}): React.ReactElement => {
  const router = useRouter()
  const [errorOnRequest, setErrorOnRequest] = useState('')

  // SORT DATA SEARCHED
  const [dataModified, setDataModified] = useState(dataLocationsByExpense)

  // INIT DROPDOWN VALUES
  const locationDropdown = fillDropdown(dataLocations)

  const {
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm({ resolver: joiResolver(ExpenseLocationSchema) })

  // SEARCH ITEM
  const [searchInputValue, setSearchInputValue] = useState('')
  const handleSearchedValues = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchInputValue(value)
    setDataModified(
      searchItems(dataLocationsByExpense, ['location.name'], value)
    )
  }

  // SORT BY COLUMN
  const sortByColumn = (column: string) => {
    setDataModified(sortColumn(dataModified, column))
  }

  // CREATE NEW ITEM
  const addItem = async (data: Record<string, unknown>) => {
    const alreadyAssigned = dataLocationsByExpense.find(
      item => item.location._id === data.location
    )
    try {
      if (alreadyAssigned) {
        throw new Error('Location is already assigned')
      }
      await createOne('expense/expense-location/create', data, token)
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
        'expense/expense-location/delete',
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
        <title>Expense - Location</title>
        <meta name="description" content="Expense" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <Layout permissions={permissions}>
          <>
            <main>
              {!error ? (
                <LocationsByExpenseComponent
                  validateHandleSubmit={handleSubmit}
                  validateSetValue={setValue}
                  validateErrors={errors}
                  permissions={permissions}
                  dataExpense={dataExpense}
                  tableData={dataModified}
                  locationDropdown={locationDropdown}
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

export default LocationsByExpensePage
