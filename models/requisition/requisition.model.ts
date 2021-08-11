import { Location } from '@models/contract/location.model'
// Contract
import { Contract } from '@models/contract/contract.model'
import { Account } from '@models/account/account.model'
// Expense
import { Expense } from '@models/expense/expense.model'
import { CostType } from '@models/account/costtype.model'
import { Subledger } from '@models/expense/subledger.model'
// Users & Status
import { User } from '@models/auth/user.model'
// Others
import { Priority } from './priority.model'
import { Currency } from './currency.model'
import { Requestor } from './requestor.model'
import { ShipBy } from './shipby.model'
import { ShipTo } from './shipto.model'

export interface Requisition {
  _id: string
  year: number
  reqNumber: number
  createdAt: Date
  updatedAt: Date
  createdBy: string
  createdByStatus: string
  location: Location
  code: string
  description: string
  contract: Contract | null
  account: Account | null
  expense: Expense | null
  costtype: CostType | null
  subledger: Subledger | null
  priority: Priority
  priorityJustification: string
  shipTo: ShipTo | null
  shipBy: ShipBy
  requestor: Requestor
  currency: Currency
  dateRequired: Date
  observation: string
  approvedBy: User | null
  approvedByStatus: string | null
  approvedByDate: Date | null
}
