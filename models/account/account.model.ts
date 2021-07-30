import { CostCode } from '@models/account/costcode.model'
import { CostType } from '@models/account/costtype.model'
import { Budget } from '@models/account/budget.model'

export interface Account {
  _id: string
  costcode: CostCode
  costtype: CostType
  budget: Budget
  accountUniqueCode: string
}
