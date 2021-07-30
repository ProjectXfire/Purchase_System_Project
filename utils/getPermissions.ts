import { Permissions } from '@models/auth/permission.model'

export const permissions = (roles: string[]): Permissions => {
  // USER PERMISSIONS

  // ADMIN
  const admin = roles.find((rol: string) => rol === 'admin')
  // ACCOUNT
  const accountRead = roles.find((rol: string) => rol === 'account_read')
  const accountCreate = roles.find((rol: string) => rol === 'account_create')
  const accountEdit = roles.find((rol: string) => rol === 'account_edit')
  const accountRemove = roles.find((rol: string) => rol === 'account_remove')
  // EXPENSE
  const expenseRead = roles.find((rol: string) => rol === 'expense_read')
  const expenseCreate = roles.find((rol: string) => rol === 'expense_create')
  const expenseEdit = roles.find((rol: string) => rol === 'expense_edit')
  const expenseRemove = roles.find((rol: string) => rol === 'expense_remove')
  // CONTRACT
  const contractRead = roles.find((rol: string) => rol === 'contract_read')
  const contractCreate = roles.find((rol: string) => rol === 'contract_create')
  const contractEdit = roles.find((rol: string) => rol === 'contract_edit')
  const contractRemove = roles.find((rol: string) => rol === 'contract_remove')
  // REQUISITION
  const reqRead = roles.find((rol: string) => rol === 'req_read')
  const reqCreate = roles.find((rol: string) => rol === 'req_create')
  const reqEdit = roles.find((rol: string) => rol === 'req_edit')
  const reqRemove = roles.find((rol: string) => rol === 'req_remove')

  return {
    admin: admin || '',
    account_read: accountRead || '',
    account_create: accountCreate || '',
    account_edit: accountEdit || '',
    account_remove: accountRemove || '',
    expense_read: expenseRead || '',
    expense_create: expenseCreate || '',
    expense_edit: expenseEdit || '',
    expense_remove: expenseRemove || '',
    contract_read: contractRead || '',
    contract_create: contractCreate || '',
    contract_edit: contractEdit || '',
    contract_remove: contractRemove || '',
    req_read: reqRead || '',
    req_create: reqCreate || '',
    req_edit: reqEdit || '',
    req_remove: reqRemove || ''
  }
}
