import React, { ChangeEvent } from 'react'
// Next
import Link from 'next/link'
// Providers
import { useTranslation } from 'next-i18next'
// Models
import { Permissions } from '@models/auth/permission.model'
import { Contract } from '@models/contract/contract.model'
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

export const ContractListComponent = ({
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
  tableData: Contract[]
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
          {t('contract')} <Header.Subheader> {t('list')}</Header.Subheader>
        </Header.Content>
      </Header>
      {(permissions.admin || permissions.contract_create) && (
        <Header floated="right">
          <Header.Content>
            <Link href="/contract/create">
              <Button color="blue">
                <Icon name="plus" /> {t('add_button_contract')}
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
            <Table.HeaderCell onClick={() => sortByColumn('areaUnit')}>
              <HeaderTitle>{t('area_unit')}</HeaderTitle>
            </Table.HeaderCell>
            <Table.HeaderCell
              onClick={() => sortByColumn('areaUnitDescription')}
            >
              <HeaderTitle>{t('description')}</HeaderTitle>
            </Table.HeaderCell>
            <Table.HeaderCell onClick={() => sortByColumn('clientCode')}>
              <HeaderTitle>{t('client_code')}</HeaderTitle>
            </Table.HeaderCell>
            <Table.HeaderCell onClick={() => sortByColumn('location.name')}>
              <HeaderTitle>{t('location')}</HeaderTitle>
            </Table.HeaderCell>
            <Table.HeaderCell onClick={() => sortByColumn('contractType.name')}>
              <HeaderTitle>{t('contract_type')}</HeaderTitle>
            </Table.HeaderCell>
            <Table.HeaderCell>{t('actions')}</Table.HeaderCell>
            <Table.HeaderCell>{t('assing')}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tableData.map(value => (
            <Table.Row key={value._id}>
              <Table.Cell>{value.name}</Table.Cell>
              <Table.Cell>{value.description}</Table.Cell>
              <Table.Cell>{value.areaUnit}</Table.Cell>
              <Table.Cell>{value.areaUnitDescription}</Table.Cell>
              <Table.Cell>{value.clientCode}</Table.Cell>
              <Table.Cell>{value.location.name}</Table.Cell>
              <Table.Cell>{value.contractType.name}</Table.Cell>
              <Table.Cell>
                <Link href={`/contract/detail/${value._id}`}>
                  <Button icon>
                    <Icon name="file alternate outline" />
                  </Button>
                </Link>
                {(permissions.admin || permissions.contract_edit) && (
                  <Link href={`/contract/edit/${value._id}`}>
                    <Button icon>
                      <Icon name="edit" />
                    </Button>
                  </Link>
                )}
                {(permissions.admin || permissions.contract_delete) && (
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
              <Table.Cell>
                <Link href={`/contract/accounts/${value._id}`}>
                  <Button color="blue">{t('accounts')}</Button>
                </Link>
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
