import React, { ChangeEvent, useEffect, useState } from 'react'
// Next
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
// Utils
import { searchItems } from '@utils/searchItems'
import { sortColumn } from '@utils/sortColumn'
import { parseCookies } from '@utils/parseCookies'
import { approverStatusDropdown } from '@utils/fillDropdown'
// Services
import { updateOne, getList } from '@services/apiRequest'
// Models
import { Permissions } from '@models/auth/permission.model'
import { Requisition } from '@models/requisition/requisition.model'
// Styles
import { Message } from 'semantic-ui-react'
// Components
import { Layout } from '@components/shared/layout'
import { RequisitionApprovalsComponent } from '@components/requisition/approval/list'
import { ModalComponent } from '@components/shared/modal'
import { ModalErrorComponent } from '@components/shared/modalError'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  let cookie
  try {
    cookie = parseCookies(ctx)
    const responseRequisitions = await getList(
      `requisition/list/approver/${cookie.userId}?page=1`,
      cookie.token
    )
    return {
      props: {
        user: cookie.user,
        userId: cookie.userId,
        token: cookie.token,
        permissions: cookie.permissions,
        requisitions: responseRequisitions.data.list,
        pages: responseRequisitions.data.pages,
        error: ''
      }
    }
  } catch (error: any) {
    return {
      props: {
        user: cookie && cookie.user ? cookie.user : '',
        userId: cookie && cookie.userId ? cookie.userId : '',
        token: cookie && cookie.token ? cookie.token : '',
        permissions: cookie && cookie.permissions ? cookie.permissions : {},
        requisitions: [],
        pages: 1,
        error: error.message
      }
    }
  }
}

const RequisitionApprovalsPage = ({
  user,
  userId,
  token,
  permissions,
  requisitions,
  pages,
  error
}: {
  user: string
  userId: string
  token: string
  permissions: Permissions
  requisitions: Requisition[]
  pages: number
  error: string
}): React.ReactElement => {
  const router = useRouter()
  const [errorOnRequest, setErrorOnRequest] = useState('')
  // INITIAL DATA FOR SEARCH AND SORT
  const [initialData, setInitialData] = useState(requisitions)
  // SORT DATA SEARCHED
  const [dataModified, setDataModified] = useState(requisitions)

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
          'approvedByStatus',
          'approvedByDate'
        ],
        value
      )
    )
  }

  // FILTER BY STATUS
  const filterByStatus = (value: any) => {
    switch (value) {
      case 'Approved':
        setDataModified(
          initialData.filter(item => item.approvedByStatus === 'Approved')
        )
        break
      case 'Not approved':
        setDataModified(
          initialData.filter(item => item.approvedByStatus === 'Not approved')
        )
        break
      case 'To approve':
        setDataModified(
          initialData.filter(
            item =>
              item.approvedByStatus === null &&
              item.createdByStatus === 'Closed'
          )
        )
        break
      default:
        setDataModified(initialData)
        break
    }
  }

  // SORT BY COLUMN
  const sortByColumn = (column: string) => {
    setDataModified(sortColumn(dataModified, column))
  }

  // HANDLE PAGES
  const handlePage = async (activePage: number) => {
    try {
      const response = await getList(
        `requisition/list/approver/${userId}?page=${activePage}`,
        token
      )
      setInitialData(response.data.list)
      setDataModified(response.data.list)
    } catch (error: any) {
      setErrorOnRequest(error.message)
    }
  }

  // UPDATE APPROVER STATE
  const [showModal, setShowModal] = useState(false)
  const [showModalError, setShowModalError] = useState({
    showModal: false,
    errorMessage: ''
  })
  const [message, setMessage] = useState('')
  const [options, setOptions] = useState({
    requisitionId: '',
    status: ''
  })
  const updateApproverState = async (option: string, comment: string) => {
    try {
      if (option === 'ok') {
        const updateValues = {
          observation: comment,
          approvedByStatus: options.status,
          approvedByDate: new Date()
        }
        await updateOne(
          'requisition/edit',
          options.requisitionId,
          updateValues,
          token
        )
        setShowModal(false)
        window.location.reload()
      } else {
        setShowModal(false)
      }
    } catch (error: any) {
      setShowModal(false)
      setShowModalError({
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
        <title>Approvals</title>
        <meta name="description" content="Requisition" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <Layout permissions={permissions}>
          <>
            <main>
              {!(error || errorOnRequest) ? (
                <RequisitionApprovalsComponent
                  permissions={permissions}
                  tableData={dataModified}
                  pages={pages}
                  approverStatusDropdown={approverStatusDropdown}
                  handlePage={handlePage}
                  searchInputValue={searchInputValue}
                  filterByStatus={filterByStatus}
                  handleSearchedValues={handleSearchedValues}
                  sortByColumn={sortByColumn}
                  setOptions={setOptions}
                  setShowModal={setShowModal}
                  setMessage={setMessage}
                />
              ) : (
                <Message
                  header={error || errorOnRequest}
                  icon="times"
                  content="Server error"
                  color="red"
                />
              )}
              <ModalComponent
                open={showModal}
                setOpen={setShowModal}
                message={message}
                action={updateApproverState}
                acceptButton={true}
                comment={true}
              />
              <ModalErrorComponent
                setShowErrorModal={setShowModalError}
                showErrorModal={showModalError.showModal}
                errorMessage={showModalError.errorMessage}
              />
            </main>
          </>
        </Layout>
      )}
    </>
  )
}

export default RequisitionApprovalsPage
