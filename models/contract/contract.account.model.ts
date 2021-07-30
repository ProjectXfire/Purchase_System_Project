import { Contract } from '@models/contract/contract.model'
import { Account } from '@models/account/account.model'

export interface ContractAccount {
  _id: string
  contract: Contract
  account: Account
}
