import React, { ChangeEvent, useEffect, useState, useContext } from 'react'
// Next
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
// Utils
import { Cookie } from '@models/auth/cookie.model'
import { parseCookies } from '@utils/parseCookies'
import { searchItems } from '@utils/searchItems'
import { sortColumn } from '@utils/sortColumn'
// Context
import { AppContext } from '@contextProvider/states'
// Services
import { deleteOne, getList } from '@services/apiRequest'
// Models
import { Location } from '@models/contract/location.model'
import { Permissions } from '@models/auth/permission.model'
import { Requisition } from '@models/requisition/requisition.model'
// Styles
import { Message } from 'semantic-ui-react'
// Components
import { Layout } from '@components/shared/layout'
import { RequisitionListComponent } from '@components/requisition/requisition/list'
import { ModalDeleteComponent } from '@components/shared/modalDelete'
import { ModalErrorComponent } from '@components/shared/modalError'
import { fillDropdown } from '@utils/fillDropdown'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  let cookie: Cookie
  try {
    cookie = parseCookies(ctx)
    return {
      props: {
        user: cookie.user,
        token: cookie.token,
        permissions: cookie.permissions,
        locations: cookie.locations
      }
    }
  } catch (error) {
    return {
      props: {
        user: '',
        token: '',
        permissions: {},
        locations: []
      }
    }
  }
}

const RequisitionListPage = ({
  user,
  token,
  permissions,
  locations
}: {
  user: string
  token: string
  permissions: Permissions
  locations: Location[]
}): React.ReactElement => {
  const router = useRouter()
  const [errorOnRequest, setErrorOnRequest] = useState('')
  const [loader, setLoader] = useState(false)

  // GET CONTEXT
  const { state, dispatch }: any = useContext(AppContext)

  // INIT DROPDOWN
  const locationDropdown = fillDropdown(locations)

  const [selectedLocation, setSelectedLocation] = useState('')
  // PAGES
  const [pages, setPages] = useState(1)
  // HANDLE DATA BY LOCATION
  const handleDataListById = (id: string) => {
    getData(id)
    dispatch({
      type: 'SELECT_LOCATION',
      payload: id
    })
  }
  // GET DATA
  const getData = async (id?: string) => {
    try {
      setLoader(true)
      const response = await getList(
        `requisition/list/${id || state.selectedLocation}?page=1`,
        token
      )
      setInitialData(response.data.list)
      setDataModified(response.data.list)
      setPages(response.data.pages)
      setLoader(false)
    } catch (error: any) {
      setErrorOnRequest(error.message)
      setLoader(false)
    }
  }

  // INITIAL DATA FOR SEARCH AND SORT
  const [initialData, setInitialData] = useState<Requisition[]>([])
  // SORT DATA SEARCHED
  const [dataModified, setDataModified] = useState<Requisition[]>([])

  // SEARCH ITEM
  const [searchInputValue, setSearchInputValue] = useState('')
  const handleSearchedValues = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchInputValue(value)
    setDataModified(
      searchItems(
        initialData,
        [
          'code',
          'description',
          'createdBy',
          'contract.name',
          'contract.description',
          'dateRequired',
          'approvedBy.email',
          'approvedByStatus.name',
          'approvedByDate'
        ],
        value
      )
    )
  }

  // SORT BY COLUMN
  const sortByColumn = (column: string) => {
    setDataModified(sortColumn(dataModified, column))
  }

  // HANDLE PAGES
  const handlePage = async (activePage: number) => {
    try {
      const response = await getList(
        `requisition/list/${selectedLocation}?page=${activePage}`,
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
      await deleteOne('requisition/delete', selectedItem.itemId, token)
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
      if (state.selectedLocation) {
        getData()
      }
    }
  }, [])

  console.log('hola')

  return (
    <>
      <Head>
        <title>Requisition</title>
        <meta name="description" content="Requisition" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <Layout permissions={permissions}>
          <>
            <main>
              {!errorOnRequest ? (
                <RequisitionListComponent
                  user={user}
                  permissions={permissions}
                  locationDropdown={locationDropdown}
                  setSelectedLocation={setSelectedLocation}
                  handleDataListById={handleDataListById}
                  tableData={dataModified}
                  pages={pages}
                  loader={loader}
                  handlePage={handlePage}
                  searchInputValue={searchInputValue}
                  handleSearchedValues={handleSearchedValues}
                  sortByColumn={sortByColumn}
                  setSelectedItem={setSelectedItem}
                  setShowModal={setShowModal}
                />
              ) : (
                <Message
                  header={errorOnRequest}
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

export default RequisitionListPage
