import React, { ChangeEvent } from 'react'
// Next
import Link from 'next/link'
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
  return (
    <>
      <Header as="h2">
        <Icon name="suitcase" />
        <Header.Content>
          {dataContract.name} {dataContract.description}
          <Header.Subheader>List</Header.Subheader>
        </Header.Content>
      </Header>
      <Input
        icon="search"
        placeholder="Search..."
        value={searchInputValue}
        onChange={e => handleSearchedValues(e)}
      />
      {tableData.length > 0 ? (
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell onClick={() => sortByColumn('contract.name')}>
                <HeaderTitle>Contract</HeaderTitle>
              </Table.HeaderCell>
              <Table.HeaderCell
                onClick={() => sortByColumn('account.costcode.name')}
              >
                <HeaderTitle>Account</HeaderTitle>
              </Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
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
                  {(permissions.admin || permissions.expense_remove) && (
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
            label="Account"
            name="account"
            placeholder="Select account"
            fluid
            search
            options={accountDropdown}
            onChange={async (e, { name, value }) => {
              validateSetValue(name, value)
            }}
            error={validateErrors.location ? true : false}
          />
          {validateErrors.location && (
            <Label color="red">{validateErrors.location.message}</Label>
          )}
        </Form.Field>
        {error && (
          <Message header={error} icon="times" content="Error" color="red" />
        )}
        <Button type="submit" color="blue">
          Add
        </Button>
        <Button>
          <Link href="/contract">Back</Link>
        </Button>
      </Form>
    </>
  )
}
