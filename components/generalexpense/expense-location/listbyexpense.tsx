import React, { ChangeEvent } from 'react'
// Next
import Link from 'next/link'
// Providers
import { useTranslation } from 'next-i18next'
// Models
import { Permissions } from '@models/auth/permission.model'
import { ExpenseLocation } from '@models/expense/expense.location.model'
import { Expense } from '@models/expense/expense.model'
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

export const LocationsByExpenseComponent = ({
  validateHandleSubmit,
  validateSetValue,
  validateErrors,
  permissions,
  dataExpense,
  tableData = [],
  locationDropdown,
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
  dataExpense: Expense
  tableData: ExpenseLocation[]
  locationDropdown: DropdownValues[]
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
          {dataExpense.name} {dataExpense.description}
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
              <Table.HeaderCell onClick={() => sortByColumn('expense.name')}>
                <HeaderTitle>{t('expense')}</HeaderTitle>
              </Table.HeaderCell>
              <Table.HeaderCell onClick={() => sortByColumn('location.name')}>
                <HeaderTitle>{t('location')}</HeaderTitle>
              </Table.HeaderCell>
              <Table.HeaderCell>{t('actions')}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tableData.map(value => (
              <Table.Row key={value._id}>
                <Table.Cell>
                  {value.expense.name} {value.expense.description}
                </Table.Cell>
                <Table.Cell>{value.location.name}</Table.Cell>
                <Table.Cell>
                  {(permissions.admin || permissions.expense_delete) && (
                    <Button
                      icon
                      color="red"
                      onClick={() => {
                        setSelectedItem({
                          itemId: value._id,
                          itemName: `
                        ${value.expense.name} ${value.expense.description} -
                        ${value.location.name}
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
            label={t('location')}
            name="location"
            placeholder={t('select_location')}
            fluid
            search
            options={locationDropdown}
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
          {t('add_button_location')}
        </Button>
        <Link href="/expense">
          <Button type="button">{t('back_button')}</Button>
        </Link>
      </Form>
    </>
  )
}
