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
import { fillDropdownAccount } from '@utils/fillDropdown'
// Services
import { createOne, deleteOne, getList, getOne } from '@services/apiRequest'
// Models
import { Permissions } from '@models/auth/permission.model'
import { ContractAccount } from '@models/contract/contract.account.model'
import { Contract } from '@models/contract/contract.model'
import { Account } from '@models/account/account.model'
import { ContractAccountSchema } from '@models/contract/contract.account.schema'
// Styles
import { Message } from 'semantic-ui-react'
// Components
import { Layout } from '@components/shared/layout'
import { ContractAccountsComponent } from '@components/contract/account/listbycontract'
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
    const responseAccountsByContract = await getList(
      'contract/account/list',
      cookie.token,
      id
    )
    const responseAccount = await getList('account/dropdown/list', cookie.token)
    const responseContract = await getOne('contract/read', id, cookie.token)
    return {
      props: {
        user: cookie.user,
        token: cookie.token,
        permissions: cookie.permissions,
        dataAccountsByContract: responseAccountsByContract.data,
        dataContract: responseContract.data,
        dataAccounts: responseAccount.data,
        error: ''
      }
    }
  } catch (error: any) {
    return {
      props: {
        user: cookie.user || '',
        token: cookie.token || '',
        permissions: cookie.permissions || '',
        dataAccountsByContract: [],
        dataContract: {},
        dataAccounts: [],
        error: error.message
      }
    }
  }
}

const ContractAccountsPage = ({
  user,
  token,
  permissions,
  dataAccountsByContract,
  dataContract,
  dataAccounts,
  error
}: {
  user: string
  token: string
  permissions: Permissions
  dataAccountsByContract: ContractAccount[]
  dataContract: Contract
  dataAccounts: Account[]
  error: any
}): React.ReactElement => {
  const router = useRouter()
  const [errorOnRequest, setErrorOnRequest] = useState('')

  // SORT DATA SEARCHED
  const [dataModified, setDataModified] = useState(dataAccountsByContract)

  // INIT DROPDOWN VALUES
  const accountDropdown = fillDropdownAccount(dataAccounts)

  const {
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm({ resolver: joiResolver(ContractAccountSchema) })

  // SEARCH ITEM
  const [searchInputValue, setSearchInputValue] = useState('')
  const handleSearchedValues = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchInputValue(value)
    setDataModified(
      searchItems(
        dataAccountsByContract,
        [
          'account.costcode.name',
          'account.costcode.description',
          'account.costtype.name',
          'account.costtype.description',
          'account.budget.name',
          'account.budget.description'
        ],
        value
      )
    )
  }

  // SORT BY COLUMN
  const sortByColumn = (column: string) => {
    setDataModified(sortColumn(dataModified, column))
  }

  // CREATE NEW ITEM
  const addItem = async (data: Record<string, unknown>) => {
    try {
      await createOne('contract/account/create', data, token)
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
      await deleteOne('contract/account/delete', selectedItem.itemId, token)
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
    }
    setValue('contract', dataContract._id)
  }, [])

  return (
    <>
      <Head>
        <title>Contract - Accounts</title>
        <meta name="description" content="Expense" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <Layout permissions={permissions}>
          <>
            <main>
              {!error ? (
                <ContractAccountsComponent
                  validateHandleSubmit={handleSubmit}
                  validateSetValue={setValue}
                  validateErrors={errors}
                  permissions={permissions}
                  dataContract={dataContract}
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

export default ContractAccountsPage
