import React, { ChangeEvent, useEffect, useState } from 'react'
// Next
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
// Providers
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Utils
import { searchItems } from '@utils/searchItems'
import { sortColumn } from '@utils/sortColumn'
// Services
import { getListSSR, deleteOne, getList } from '@services/apiRequest'
// Models
import { Permissions } from '@models/auth/permission.model'
import { Priority } from '@models/requisition/priority.model'
// Styles
import { Message } from 'semantic-ui-react'
// Components
import { Layout } from '@components/shared/layout'
import { PriorityListComponent } from '@components/requisition/priority/list'
import { ModalDeleteComponent } from '@components/shared/modalDelete'
import { ModalErrorComponent } from '@components/shared/modalError'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const response = await getListSSR('requisition/priority/list?page=1', ctx)
  return {
    props: {
      ...response,
      ...(await serverSideTranslations(ctx.locale as string, [
        'menu',
        'common'
      ]))
    }
  }
}

const PriorityListPage = ({
  user,
  token,
  permissions,
  data,
  pages,
  error
}: {
  user: string
  token: string
  permissions: Permissions
  data: Priority[]
  pages: number
  error: any
}): React.ReactElement => {
  const router = useRouter()
  const [errorOnRequest, setErrorOnRequest] = useState('')
  // INITIAL DATA FOR SEARCH AND SORT
  const [initialData, setInitialData] = useState(data)
  // SORT DATA SEARCHED
  const [dataModified, setDataModified] = useState(data)

  // SEARCH ITEM
  const [searchInputValue, setSearchInputValue] = useState('')
  const handleSearchedValues = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchInputValue(value)
    setDataModified(searchItems(initialData, ['name', 'description'], value))
  }

  // SORT BY COLUMN
  const sortByColumn = (column: string) => {
    setDataModified(sortColumn(dataModified, column))
  }

  // HANDLE PAGES
  const handlePage = async (activePage: number) => {
    try {
      const response = await getList(
        `requisition/priority/list?page=${activePage}`,
        token
      )
      setInitialData(response.data.list)
      setDataModified(response.data.list)
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
      await deleteOne('requisition/priority/delete', selectedItem.itemId, token)
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
  }, [])

  return (
    <>
      <Head>
        <title>Priority</title>
        <meta name="description" content="Requisition" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <Layout permissions={permissions}>
          <>
            <main>
              {!(error || errorOnRequest) ? (
                <PriorityListComponent
                  permissions={permissions}
                  tableData={dataModified}
                  pages={pages}
                  handlePage={handlePage}
                  searchInputValue={searchInputValue}
                  handleSearchedValues={handleSearchedValues}
                  sortByColumn={sortByColumn}
                  setSelectedItem={setSelectedItem}
                  setShowModal={setShowModal}
                />
              ) : (
                <Message
                  header={error || errorOnRequest}
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

export default PriorityListPage
