import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
// Next
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { parseCookies } from '@utils/parseCookies'
import { searchItems } from '@utils/searchItems'
import { sortColumn } from '@utils/sortColumn'
// Providers
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Context
import { AppContext } from '@contextProvider/states'
// Services
import { deleteOne, getList } from '@services/apiRequest'
// Utils
import { updateIndexPage } from '@utils/paginationIndex'
import { itemsPerPageNumber } from '@utils/variables'
// Models
import { Permissions } from '@models/auth/permission.model'
import { Requisition } from '@models/requisition/requisition.model'
// Styles
import { Message } from 'semantic-ui-react'
// Components
import { Layout } from '@components/shared/layout'
import { RequisitionListByLocationComponent } from '@components/requisition/requisition/listbylocation'
import { ModalDeleteComponent } from '@components/shared/modalDelete'
import { ModalErrorComponent } from '@components/shared/modalError'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  let cookie
  try {
    cookie = parseCookies(ctx)
    const params = ctx.params
    const id = params && params.id ? (params.id as string) : ''
    const query = ctx.query
    const year = query && query.year ? (query.year as string) : ''
    return {
      props: {
        user: cookie.user,
        token: cookie.token,
        permissions: cookie.permissions,
        locationId: id,
        year: parseInt(year),
        ...(await serverSideTranslations(ctx.locale as string, [
          'menu',
          'common'
        ]))
      }
    }
  } catch (error) {
    return {
      props: {
        user: cookie && cookie.user ? cookie.user : '',
        token: cookie && cookie.token ? cookie.token : '',
        permissions: cookie && cookie.permissions ? cookie.permissions : {},
        locationId: '',
        year: 2000
      }
    }
  }
}

const RequisitionListByLocationPage = ({
  user,
  token,
  permissions,
  locationId,
  year
}: {
  user: string
  token: string
  permissions: Permissions
  locationId: string
  year: number
}): React.ReactElement => {
  const router = useRouter()
  const [errorOnRequest, setErrorOnRequest] = useState('')
  const { state }: any = useContext(AppContext)

  // INITIAL DATA FOR SEARCH AND SORT
  const [initialData, setInitialData] = useState<Requisition[]>([])
  // SORT DATA SEARCHED
  const [dataSearched, setDataSearched] = useState<Requisition[]>([])
  const [dataModified, setDataModified] = useState<Requisition[]>([])

  const [pages, setPages] = useState(1)

  // SEARCH ITEM
  const [searchInputValue, setSearchInputValue] = useState('')
  const handleSearchedValues = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const dataFound = searchItems(
      initialData,
      [
        'code',
        'description',
        'createdBy',
        'contract.name',
        'contract.description',
        'dateRequired',
        'approvedBy.email',
        'approvedByStatus',
        'approvedByDate'
      ],
      value
    )
    const pages = Math.ceil(dataFound.length / itemsPerPageNumber)
    setPages(pages)
    const { start, end } = updateIndexPage(1)
    setSearchInputValue(value)
    setDataSearched(dataFound)
    setDataModified(dataFound.slice(start, end))
  }

  // SORT BY COLUMN
  const sortByColumn = (column: string) => {
    setDataModified(sortColumn(dataModified, column))
  }

  // HANDLE PAGES
  const handlePage = async (activePage: number) => {
    const { start, end } = updateIndexPage(activePage)
    setDataModified(dataSearched.slice(start, end))
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

  // GET REQUISITIONS BY LOCATION
  const fetchRequisitions = async () => {
    try {
      const responseRequisition = await getList(
        `requisition/list/${state.selectedLocation || locationId}?year=${
          state.selectedYear === 0 ? year : state.selectedYear
        }`,
        token
      )
      const pages = Math.ceil(
        responseRequisition.data.length / itemsPerPageNumber
      )
      const { start, end } = updateIndexPage(1)
      setPages(pages)
      setInitialData(responseRequisition.data)
      setDataSearched(responseRequisition.data)
      setDataModified(responseRequisition.data.slice(start, end))
    } catch (error: any) {
      setErrorOnRequest(error.message)
    }
  }

  // VALIDATE IF USER IS LOGGED
  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
    } else {
      fetchRequisitions()
    }
  }, [state.selectedLocation, state.selectedYear])

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
                <RequisitionListByLocationComponent
                  user={user}
                  selectLocationContext={state.selectedLocation}
                  selectLocationParam={locationId}
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

export default RequisitionListByLocationPage
