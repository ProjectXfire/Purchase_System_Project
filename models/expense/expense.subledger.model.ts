import { Expense } from '@models/expense/expense.model'
import { Subledger } from '@models/expense/subledger.model'

export interface ExpenseSubledger {
  _id: string
  expense: Expense
  subledger: Subledger
}
