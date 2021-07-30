import { Expense } from '@models/expense/expense.model'
import { Location } from '@models/contract/location.model'

export interface ExpenseLocation {
  _id: string
  expense: Expense
  location: Location
}
