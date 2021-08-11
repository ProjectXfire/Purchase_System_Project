// React
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
// Next
import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
// Providers
import { joiResolver } from '@hookform/resolvers/joi'
import { AxiosResponse } from 'axios'
import dateformat from 'dateformat'
// Utils
import { parseCookies } from '@utils/parseCookies'
import {
  fillDropdown,
  fillDropdownContract,
  fillDropdownAccount,
  fillDropdownOnlyName,
  userStatusDropdown,
  approverStatusDropdown,
  categoriesDropdown
} from '@utils/fillDropdown'
// Services
import { createOne, getList, getOne, updateOne } from '@services/apiRequest'
// Models
import { Cookie } from '@models/auth/cookie.model'
import { Permissions } from '@models/auth/permission.model'
import { Requisition } from '@models/requisition/requisition.model'
import { Location } from '@models/contract/location.model'
import { Priority } from '@models/requisition/priority.model'
import { Requestor } from '@models/requisition/requestor.model'
import { Currency } from '@models/requisition/currency.model'
import { ShipTo } from '@models/requisition/shipto.model'
import { ShipBy } from '@models/requisition/shipby.model'
import { Contract } from '@models/contract/contract.model'
import { ContractAccount } from '@models/contract/contract.account.model'
import { Account } from '@models/account/account.model'
import { Expense } from '@models/expense/expense.model'
import { ExpenseLocation } from '@models/expense/expense.location.model'
import { ExpenseAccount } from '@models/expense/expense.account.model'
import { CostType } from '@models/account/costtype.model'
import { Subledger } from '@models/expense/subledger.model'
import { ExpenseSubledger } from '@models/expense/expense.subledger.model'
import { User } from '@models/auth/user.model'
import { Product } from '@models/inventory/product.model'
// Schemas
import { RequisitionSchema } from '@models/requisition/requisition.schema'
// Styles
import { Message } from 'semantic-ui-react'
// Components
import { Layout } from '@components/shared/layout'
import { ModalComponent } from '@components/shared/modal'
import { HeaderRequisitionFormComponent } from '@components/requisition/requisition/requisition-header'
import { BodyRequisitionFormComponent } from '@components/requisition/requisition/requisition-body'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  let cookie: Cookie = {
    token: '',
    user: '',
    approver: '',
    roles: [],
    locations: [],
    permissions: {}
  }
  try {
    cookie = parseCookies(ctx)
    const params = ctx.params
    const id = params && params.id ? (params.id as string) : ''
    const requisition = await getOne('requisition/read', id, cookie.token)
    const requisitionItems = await getList(
      'requisition/items/list',
      cookie.token,
      id
    )
    const approvers = await getList(
      `user/approvers?approver=true&location=${requisition.data.location._id}`,
      cookie.token
    )
    const priorities = await getList('requisition/priority/list', cookie.token)
    const requestors = await getList('requisition/requestor/list', cookie.token)
    const currencies = await getList('requisition/currency/list', cookie.token)
    const shipto = await getList('requisition/ship-to/list', cookie.token)
    const shipby = await getList('requisition/ship-by/list', cookie.token)
    const products = await getList('requisition/item/list', cookie.token)
    return {
      props: {
        user: cookie.user,
        token: cookie.token,
        permissions: cookie.permissions,
        locations: cookie.locations,
        requisition: requisition.data,
        requisitionItems: requisitionItems.data,
        priorities: priorities.data,
        requestors: requestors.data,
        currencies: currencies.data,
        shipto: shipto.data,
        shipby: shipby.data,
        approvers: approvers.data,
        products: products.data
      }
    }
  } catch (error) {
    return {
      props: {
        user: cookie.user || '',
        token: cookie.token || '',
        permissions: cookie.permissions || [],
        locations: cookie.locations || [],
        requisition: {},
        requisitionItems: [],
        priorities: [],
        requestors: [],
        currencies: [],
        shipto: [],
        shipby: [],
        approvers: {},
        products: []
      }
    }
  }
}

interface DropdownValues {
  key: number
  value: string
  text: string
}

const ItemsPage = ({
  user,
  token,
  permissions,
  locations,
  requisition,
  requisitionItems,
  priorities,
  requestors,
  currencies,
  shipto,
  shipby,
  approvers,
  products
}: {
  user: string
  token: string
  permissions: Permissions
  locations: Location[]
  requisition: Requisition
  requisitionItems: any[]
  priorities: Priority[]
  requestors: Requestor[]
  currencies: Currency[]
  shipto: ShipTo[]
  shipby: ShipBy[]
  approvers: User[]
  products: Product[]
}): React.ReactElement => {
  const router = useRouter()
  const [errorOnRequest, setErrorOnRequest] = useState('')
  const [selected, setSelected] = useState({
    selectedContract: true,
    selectedExpense: true
  })

  // SET SCHEMA TO VALIDATE FORM
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    control
  } = useForm({ resolver: joiResolver(RequisitionSchema) })

  // INIT DROPDOWNS
  const locationsDropdown = fillDropdownOnlyName(locations)
  const prioritiesDropdown = fillDropdown(priorities)
  const requestorsDropdown = fillDropdown(requestors)
  const currenciesDropdown = fillDropdown(currencies)
  const shiptoDropdown = fillDropdown(shipto)
  const shipbyDropdown = fillDropdown(shipby)
  const productsDropdown = fillDropdown(products)

  // APPROVERS
  const [approversDropdown, setApproversDropdown] = useState<DropdownValues[]>(
    []
  )
  const fillDropdownApproversByLocation = async (locationId: string) => {
    try {
      const responseApprovers: AxiosResponse = await getList(
        `user?approver=true&location=${locationId}`,
        token
      )
      setApproversDropdown(fillDropdownOnlyName(responseApprovers.data))
    } catch (error: any) {
      setErrorOnRequest(error.message)
    }
  }

  // CONTRACTS
  const [contractDropdown, setContractDropdown] = useState<DropdownValues[]>([])
  const fillDropdownContractsByLocation = async (locationId: string) => {
    try {
      const responseContract: AxiosResponse = await getList(
        'contract/locations',
        token,
        locationId
      )
      const getContractsFound = responseContract.data.filter(
        (item: Contract) => item.location._id === locationId
      )
      setContractDropdown(fillDropdownContract(getContractsFound))
    } catch (error: any) {
      setErrorOnRequest(error.message)
    }
  }
  const [contractAccountDropdown, setContractAccountDropdown] = useState<
    DropdownValues[]
  >([])
  const fillDropdownAccountsByContract = async (contractId: string) => {
    try {
      const responseContractAccount: AxiosResponse = await getList(
        'contract/account/list',
        token,
        contractId
      )
      const getAccountsFound: Account[] = []
      responseContractAccount.data.forEach((item: ContractAccount) => {
        if (item.contract._id === contractId) {
          getAccountsFound.push(item.account)
        }
      })
      setContractAccountDropdown(fillDropdownAccount(getAccountsFound))
    } catch (error: any) {
      setErrorOnRequest(error.message)
    }
  }

  // EXPENSES
  const [expenseDropdown, setExpenseDropdown] = useState<DropdownValues[]>([])
  const [expenseAccountDropdown, setExpenseAccountDropdown] = useState<
    DropdownValues[]
  >([])
  const [expenseSubledgerDropdown, setExpenseSubledgerDropdown] = useState<
    DropdownValues[]
  >([])
  const fillDropdownExpensesByLocation = async (locationId: string) => {
    try {
      const responseExpense: AxiosResponse = await getList(
        'expense/expense-location/location/expenses',
        token,
        locationId
      )
      const getExpensesFound: Expense[] = []
      responseExpense.data.forEach((item: ExpenseLocation) => {
        if (item.location._id === locationId) {
          getExpensesFound.push(item.expense)
        }
      })
      setExpenseDropdown(fillDropdown(getExpensesFound))
    } catch (error: any) {
      setErrorOnRequest(error.message)
    }
  }
  const fillDropdownExpenseOptions = async (expenseId: string) => {
    try {
      const responseExpenseAccounts: AxiosResponse = await getList(
        'expense/expense-account/accounts',
        token,
        expenseId
      )
      const responseExpenseSubledgers: AxiosResponse = await getList(
        'expense/expense-subledger/subledgers',
        token,
        expenseId
      )
      const getAccountsFound: CostType[] = []
      responseExpenseAccounts.data.forEach((item: ExpenseAccount) => {
        if (item.expense._id === expenseId) {
          getAccountsFound.push(item.costtype)
        }
      })
      const getSubledgersFound: Subledger[] = []
      responseExpenseSubledgers.data.forEach((item: ExpenseSubledger) => {
        if (item.expense._id === expenseId) {
          getSubledgersFound.push(item.subledger)
        }
      })
      setExpenseAccountDropdown(fillDropdown(getAccountsFound))
      setExpenseSubledgerDropdown(fillDropdown(getSubledgersFound))
    } catch (error: any) {
      setErrorOnRequest(error.message)
    }
  }

  // EDIT ITEM
  const [modal, setModal] = useState(false)
  const [message, setMessage] = useState('')
  const [accept, setAccept] = useState(false)
  const changeUserStatus = async () => {
    if (getValues('createdByStatus') === 'Open') {
      setModal(true)
      setMessage('saves changes?')
      setAccept(true)
    }
    if (getValues('createdByStatus') === 'Canceled') {
      setModal(true)
      setMessage(
        'Are you sure to cancel the requisition?, after that you can not modified it'
      )
      setAccept(true)
    }
    if (getValues('createdByStatus') === 'Closed') {
      if (requisitionItems.length === 0) {
        setModal(true)
        setMessage(
          'You must insert al least one item to the requisition before closed it'
        )
        setAccept(false)
      } else {
        setModal(true)
        setMessage(
          'Are you sure to closed the requisition?, after that will be send to approve'
        )
        setAccept(true)
      }
    }
  }
  const editItem = async () => {
    try {
      await updateOne('requisition/edit', requisition._id, getValues(), token)
      router.push('/requisition')
      setErrorOnRequest('')
    } catch (error: any) {
      setErrorOnRequest(error.message)
    }
  }

  // ADD SUB ITEMS
  const addSubItems = async (data: Record<string, unknown>) => {
    data.requisition = requisition._id
    try {
      await createOne('requisition/items/create', data, token)
      setErrorOnRequest('')
      window.location.reload()
    } catch (error: any) {
      setErrorOnRequest(error.message)
    }
  }

  // VALIDATE IF USER IS LOGGED
  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
    } else {
      setApproversDropdown(fillDropdownOnlyName(approvers))
      if (requisition.contract && requisition.contract._id) {
        fillDropdownContractsByLocation(requisition.location._id)
        fillDropdownAccountsByContract(requisition.contract._id)
      }
      if (requisition.expense && requisition.expense._id) {
        fillDropdownExpensesByLocation(requisition.location._id)
        fillDropdownExpenseOptions(requisition.expense._id)
      }
      setValue('createdBy', requisition.createdBy)
      setValue('createdByStatus', requisition.createdByStatus, {
        shouldValidate: true
      })
      setValue('location', requisition.location._id)
      setValue('description', requisition.description)
      setValue(
        'contract',
        requisition.contract && requisition.contract._id
          ? requisition.contract._id
          : null
      )
      setValue(
        'account',
        requisition.account && requisition.account._id
          ? requisition.account._id
          : null
      )
      setValue(
        'expense',
        requisition.expense && requisition.expense._id
          ? requisition.expense._id
          : null
      )
      setValue(
        'costtype',
        requisition.costtype && requisition.costtype._id
          ? requisition.costtype._id
          : null
      )
      setValue(
        'subledger',
        requisition.subledger && requisition.subledger._id
          ? requisition.subledger._id
          : null
      )
      setValue('priority', requisition.priority._id)
      setValue('priorityJustification', requisition.priorityJustification)
      setValue('requestor', requisition.requestor._id)
      setValue('currency', requisition.currency._id)
      setValue('shipTo', requisition.shipTo?._id)
      setValue('shipBy', requisition.shipBy._id)
      setValue(
        'approvedBy',
        requisition.approvedBy && requisition.approvedBy._id
          ? requisition.approvedBy._id
          : null
      )
      setValue('approvedByStatus', requisition.approvedByStatus)
      setValue('approvedByDate', requisition.approvedByDate)
      setValue(
        'dateRequired',
        dateformat(requisition.dateRequired, 'yyyy-mm-dd')
      )
      setValue('observation', requisition.observation)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Requisition - Create</title>
        <meta name="description" content="Requisition" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <Layout permissions={permissions}>
          <main>
            {permissions.admin || permissions.req_create ? (
              <>
                <HeaderRequisitionFormComponent
                  validateSetValue={setValue}
                  validateControl={control}
                  validateErrors={errors}
                  validateHandleSubmit={handleSubmit}
                  fillDropdownApproversByLocation={
                    fillDropdownApproversByLocation
                  }
                  fillDropdownContractsByLocation={
                    fillDropdownContractsByLocation
                  }
                  fillDropdownExpensesByLocation={
                    fillDropdownExpensesByLocation
                  }
                  selected={selected}
                  setSelected={setSelected}
                  fillDropdownAccountsByContract={
                    fillDropdownAccountsByContract
                  }
                  contractAccountDropdown={contractAccountDropdown}
                  fillDropdownExpenseOptions={fillDropdownExpenseOptions}
                  expenseSubledgerDropdown={expenseSubledgerDropdown}
                  expenseAccountDropdown={expenseAccountDropdown}
                  userStatusDropdown={userStatusDropdown}
                  locationsDropdown={locationsDropdown}
                  prioritiesDropdown={prioritiesDropdown}
                  requestorsDropdown={requestorsDropdown}
                  currenciesDropdown={currenciesDropdown}
                  shiptoDropdown={shiptoDropdown}
                  shipbyDropdown={shipbyDropdown}
                  expensesDropdown={expenseDropdown}
                  contractsDropdown={contractDropdown}
                  approversDropdown={approversDropdown}
                  approverStatusDropdown={approverStatusDropdown}
                  changeUserStatus={changeUserStatus}
                  error={errorOnRequest}
                />
                <BodyRequisitionFormComponent
                  tableData={requisitionItems}
                  categoriesDropdown={categoriesDropdown}
                  productsDropdown={productsDropdown}
                  products={products}
                  addSubItems={addSubItems}
                />
                <ModalComponent
                  open={modal}
                  setOpen={setModal}
                  message={message}
                  setValue={setValue}
                  action={editItem}
                  acceptButton={accept}
                />
              </>
            ) : (
              <Message
                header="Permission Access Denied"
                icon="times"
                content="Error"
                color="red"
              />
            )}
          </main>
        </Layout>
      )}
    </>
  )
}

export default ItemsPage
