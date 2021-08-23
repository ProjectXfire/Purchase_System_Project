import React, { ChangeEvent } from 'react'
// Next
import Link from 'next/link'
// Providers
import { useTranslation } from 'next-i18next'
// Models
import { Permissions } from '@models/auth/permission.model'
import { ContractAccount } from '@models/contract/contract.account.model'
import { Contract } from '@models/contract/contract.model'
// Styles
import {
  Table,
  Header,
  Icon,
  Button,
  Input,
  Form,
  Label,
  Message
} from 'semantic-ui-react'
import { HeaderTitle } from '@styles/globalStyleComponents'

interface SelectedItems {
  itemId: string
  itemName: string
}

interface DropdownValues {
  key: number
  value: string
  text: string
}

export const ContractAccountsComponent = ({
  validateHandleSubmit,
  validateSetValue,
  validateErrors,
  permissions,
  dataContract,
  tableData = [],
  accountDropdown,
  searchInputValue,
  handleSearchedValues,
  sortByColumn,
  setSelectedItem,
  addItem,
  setShowModal,
  error
}: {
  validateHandleSubmit: any
  validateSetValue: any
  validateErrors: any
  permissions: Permissions
  dataContract: Contract
  tableData: ContractAccount[]
  accountDropdown: DropdownValues[]
  searchInputValue: string
  handleSearchedValues: (e: ChangeEvent<HTMLInputElement>) => void
  sortByColumn: (column: string) => void
  setSelectedItem: (value: SelectedItems) => void
  addItem: any
  setShowModal: (value: boolean) => void
  error: string
}): React.ReactElement => {
  const { t } = useTranslation('common')
  return (
    <>
      <Header as="h2">
        <Icon name="suitcase" />
        <Header.Content>
          {dataContract.name} {dataContract.description}
          <Header.Subheader>{t('list')}</Header.Subheader>
        </Header.Content>
      </Header>
      <Input
        icon="search"
        placeholder={t('search_input')}
        value={searchInputValue}
        onChange={e => handleSearchedValues(e)}
      />
      {tableData.length > 0 ? (
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell onClick={() => sortByColumn('contract.name')}>
                <HeaderTitle>{t('contract')}</HeaderTitle>
              </Table.HeaderCell>
              <Table.HeaderCell
                onClick={() => sortByColumn('account.costcode.name')}
              >
                <HeaderTitle>{t('account')}</HeaderTitle>
              </Table.HeaderCell>
              <Table.HeaderCell>{t('actions')}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tableData.map(value => (
              <Table.Row key={value._id}>
                <Table.Cell>
                  {value.contract.name} {value.contract.description}
                </Table.Cell>
                <Table.Cell>
                  {` ${value.account.costcode.name} ${value.account.costcode.description} -
                    ${value.account.costtype.name} ${value.account.costtype.description} -
                    ${value.account.budget.name} ${value.account.budget.description}`}
                </Table.Cell>
                <Table.Cell>
                  {(permissions.admin || permissions.expense_delete) && (
                    <Button
                      icon
                      color="red"
                      onClick={() => {
                        setSelectedItem({
                          itemId: value._id,
                          itemName: `
                          ${value.account.costcode.name} ${value.account.costcode.description} -
                          ${value.account.costtype.name} ${value.account.costtype.description} -
                          ${value.account.budget.name} ${value.account.budget.description}
                          `
                        })
                        setShowModal(true)
                      }}
                    >
                      <Icon name="trash" />
                    </Button>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <Message header="No data assigned" icon="times" content="Empty" />
      )}
      <Form onSubmit={validateHandleSubmit(addItem)}>
        <Form.Field>
          <Form.Select
            label={t('account')}
            name="account"
            placeholder={t('select_account')}
            fluid
            search
            options={accountDropdown}
            onChange={async (e, { name, value }) => {
              validateSetValue(name, value)
            }}
            error={validateErrors.account ? true : false}
          />
          {validateErrors.account && (
            <Label color="red">{validateErrors.account.message}</Label>
          )}
        </Form.Field>
        {error && (
          <Message header={error} icon="times" content="Error" color="red" />
        )}
        <Button type="submit" color="blue">
          {t('add_button_account')}
        </Button>
        <Link href="/contract">
          <Button type="button">{t('back_button')}</Button>
        </Link>
      </Form>
    </>
  )
}
