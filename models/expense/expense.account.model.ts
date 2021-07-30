import { Expense } from '@models/expense/expense.model'
import { CostType } from '@models/account/costtype.model'

export interface ExpenseAccount {
  _id: string
  expense: Expense
  costtype: CostType
}
