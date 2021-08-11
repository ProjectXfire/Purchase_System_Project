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
// Utils
import { parseCookies } from '@utils/parseCookies'
import {
  fillDropdown,
  fillDropdownContract,
  fillDropdownAccount,
  fillDropdownOnlyName,
  userStatusDropdown,
  approverStatusDropdown
} from '@utils/fillDropdown'
// Services
import { createOne, getList } from '@services/apiRequest'
// Models
import { Cookie } from '@models/auth/cookie.model'
import { Permissions } from '@models/auth/permission.model'
import { RequisitionSchema } from '@models/requisition/requisition.schema'
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
// Styles
import { Message } from 'semantic-ui-react'
// Components
import { Layout } from '@components/shared/layout'
import { RequisitionCreateComponent } from '@components/requisition/requisition/create'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  let cookie: Cookie
  try {
    cookie = parseCookies(ctx)
    const priorities = await getList('requisition/priority/list', cookie.token)
    const requestors = await getList('requisition/requestor/list', cookie.token)
    const currencies = await getList('requisition/currency/list', cookie.token)
    const shipto = await getList('requisition/ship-to/list', cookie.token)
    const shipby = await getList('requisition/ship-by/list', cookie.token)
    return {
      props: {
        user: cookie.user,
        token: cookie.token,
        permissions: cookie.permissions,
        locations: cookie.locations,
        priorities: priorities.data,
        requestors: requestors.data,
        currencies: currencies.data,
        shipto: shipto.data,
        shipby: shipby.data
      }
    }
  } catch (error) {
    return {
      props: {
        user: '',
        token: '',
        permissions: {},
        locations: [],
        priorities: [],
        requestors: [],
        currencies: [],
        shipto: [],
        shipby: []
      }
    }
  }
}

interface DropdownValues {
  key: number
  value: string
  text: string
}

const RequistionCreatePage = ({
  user,
  token,
  permissions,
  locations,
  priorities,
  requestors,
  currencies,
  shipto,
  shipby
}: {
  user: string
  token: string
  permissions: Permissions
  locations: Location[]
  priorities: Priority[]
  requestors: Requestor[]
  currencies: Currency[]
  shipto: ShipTo[]
  shipby: ShipBy[]
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

  // INIT DROPDOWNS CONTRACTS, EXPENSES AND APPROVERS BY LOCATION
  const [contractDropdown, setContractDropdown] = useState<DropdownValues[]>([])
  const [expenseDropdown, setExpenseDropdown] = useState<DropdownValues[]>([])
  const [approversDropdown, setApproversDropdown] = useState<DropdownValues[]>(
    []
  )
  const fillDropdownByLocation = async (locationId: string) => {
    try {
      const responseContract: AxiosResponse = await getList(
        'contract/locations',
        token,
        locationId
      )
      const getContractsFound = responseContract.data.filter(
        (item: Contract) => item.location._id === locationId
      )
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
      const responseApprovers: AxiosResponse = await getList(
        `user/approvers?approver=true&location=${locationId}`,
        token
      )
      setValue('contract', null)
      setValue('account', null)
      setValue('expense', null)
      setValue('costtype', null)
      setValue('subledger', null)
      setValue('approvedBy', null)
      setContractDropdown(fillDropdownContract(getContractsFound))
      setExpenseDropdown(fillDropdown(getExpensesFound))
      setApproversDropdown(fillDropdownOnlyName(responseApprovers.data))
    } catch (error: any) {
      setErrorOnRequest(error.message)
    }
  }

  // CONTRACT OPTIONS
  const [contractAccountDropdown, setContractAccountDropdown] = useState<
    DropdownValues[]
  >([])
  const fillDropdownAccountByContract = async (contractId: string) => {
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

  // EXPENSE OPTIONS
  const [expenseAccountDropdown, setExpenseAccountDropdown] = useState<
    DropdownValues[]
  >([])
  const [expenseSubledgerDropdown, setExpenseSubledgerDropdown] = useState<
    DropdownValues[]
  >([])
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

  // CREATE NEW ITEM
  const createItem = async () => {
    try {
      await createOne('requisition/create', getValues(), token)
      router.push('/requisition')
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
      setValue('createdBy', user, { shouldValidate: true })
      setValue('createdByStatus', 'Open', {
        shouldValidate: true
      })
      setValue('location', null)
      setValue('description', '')
      setValue('contract', null)
      setValue('account', null)
      setValue('expense', null)
      setValue('costtype', null)
      setValue('subledger', null)
      setValue('priority', null)
      setValue('priorityJustification', '')
      setValue('requestor', null)
      setValue('currency', null)
      setValue('shipTo', null)
      setValue('shipBy', null)
      setValue('approvedBy', null)
      setValue('approvedByStatus', null)
      setValue('observation', '')
      setValue('dateRequired', null)
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
              <RequisitionCreateComponent
                validateSetValue={setValue}
                validateControl={control}
                validateErrors={errors}
                validateHandleSubmit={handleSubmit}
                user={user}
                fillDropdownByLocation={fillDropdownByLocation}
                selected={selected}
                setSelected={setSelected}
                fillDropdownAccountByContract={fillDropdownAccountByContract}
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
                createItem={createItem}
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
          </main>
        </Layout>
      )}
    </>
  )
}

export default RequistionCreatePage
