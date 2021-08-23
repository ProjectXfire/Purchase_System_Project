import React, { ChangeEvent } from 'react'
// Next
import Link from 'next/link'
// Providers
import { useTranslation } from 'next-i18next'
// Models
import { Permissions } from '@models/auth/permission.model'
import { Budget } from '@models/account/budget.model'
// Styles
import {
  Table,
  Header,
  Icon,
  Button,
  Input,
  Pagination
} from 'semantic-ui-react'
import { HeaderTitle } from '@styles/globalStyleComponents'

interface SelectedItems {
  itemId: string
  itemName: string
}

export const BudgetListComponent = ({
  permissions,
  tableData = [],
  pages,
  handlePage,
  searchInputValue,
  handleSearchedValues,
  sortByColumn,
  setSelectedItem,
  setShowModal
}: {
  permissions: Permissions
  tableData: Budget[]
  pages: number
  handlePage: (activePage: number) => void
  searchInputValue: string
  handleSearchedValues: (e: ChangeEvent<HTMLInputElement>) => void
  sortByColumn: (column: string) => void
  setSelectedItem: (value: SelectedItems) => void
  setShowModal: (value: boolean) => void
}): React.ReactElement => {
  const { t } = useTranslation('common')
  return (
    <>
      <Header as="h2" floated="left">
        <Icon name="suitcase" />
        <Header.Content>
          {t('budget')} <Header.Subheader>{t('list')}</Header.Subheader>
        </Header.Content>
      </Header>
      {(permissions.admin || permissions.expense_create) && (
        <Header floated="right">
          <Header.Content>
            <Link href="/chartofaccount/budget/create">
              <Button color="blue">
                <Icon name="plus" /> {t('add_button_budget')}
              </Button>
            </Link>
          </Header.Content>
        </Header>
      )}
      <Input
        icon="search"
        placeholder={t('search_input')}
        value={searchInputValue}
        onChange={e => handleSearchedValues(e)}
      />
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell onClick={() => sortByColumn('name')}>
              <HeaderTitle>{t('name')}</HeaderTitle>
            </Table.HeaderCell>
            <Table.HeaderCell onClick={() => sortByColumn('description')}>
              <HeaderTitle>{t('description')}</HeaderTitle>
            </Table.HeaderCell>
            <Table.HeaderCell>{t('actions')}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tableData.map(value => (
            <Table.Row key={value._id}>
              <Table.Cell>{value.name}</Table.Cell>
              <Table.Cell>{value.description}</Table.Cell>
              <Table.Cell>
                <Link href={`/chartofaccount/budget/detail/${value._id}`}>
                  <Button icon>
                    <Icon name="file alternate outline" />
                  </Button>
                </Link>
                {(permissions.admin || permissions.expense_edit) && (
                  <Link href={`/chartofaccount/budget/edit/${value._id}`}>
                    <Button icon>
                      <Icon name="edit" />
                    </Button>
                  </Link>
                )}
                {(permissions.admin || permissions.expense_delete) && (
                  <Button
                    icon
                    color="red"
                    onClick={() => {
                      setSelectedItem({
                        itemId: value._id,
                        itemName: `${value.name} ${value.description}`
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
      <Pagination
        boundaryRange={0}
        defaultActivePage={1}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        siblingRange={1}
        totalPages={pages}
        onPageChange={(e, { activePage }: any) => handlePage(activePage)}
      />
    </>
  )
}
