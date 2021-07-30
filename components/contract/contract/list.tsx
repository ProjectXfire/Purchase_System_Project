import React, { ChangeEvent } from 'react'
// Next
import Link from 'next/link'
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
  return (
    <>
      <Header as="h2" floated="left">
        <Icon name="suitcase" />
        <Header.Content>
          Contract <Header.Subheader>List</Header.Subheader>
        </Header.Content>
      </Header>
      {(permissions.admin || permissions.contract_create) && (
        <Header floated="right">
          <Header.Content>
            <Link href="/contract/create">
              <Button color="blue">
                <Icon name="plus" /> Add contract
              </Button>
            </Link>
          </Header.Content>
        </Header>
      )}
      <Input
        icon="search"
        placeholder="Search..."
        value={searchInputValue}
        onChange={e => handleSearchedValues(e)}
      />
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell onClick={() => sortByColumn('name')}>
              <HeaderTitle>Name</HeaderTitle>
            </Table.HeaderCell>
            <Table.HeaderCell onClick={() => sortByColumn('description')}>
              <HeaderTitle>Description</HeaderTitle>
            </Table.HeaderCell>
            <Table.HeaderCell onClick={() => sortByColumn('areaUnit')}>
              <HeaderTitle>Area Unit</HeaderTitle>
            </Table.HeaderCell>
            <Table.HeaderCell
              onClick={() => sortByColumn('areaUnitDescription')}
            >
              <HeaderTitle>Area Unit Description</HeaderTitle>
            </Table.HeaderCell>
            <Table.HeaderCell onClick={() => sortByColumn('clientCode')}>
              <HeaderTitle>Client Code</HeaderTitle>
            </Table.HeaderCell>
            <Table.HeaderCell onClick={() => sortByColumn('location.name')}>
              <HeaderTitle>Location</HeaderTitle>
            </Table.HeaderCell>
            <Table.HeaderCell onClick={() => sortByColumn('contractType.name')}>
              <HeaderTitle>Contract Type</HeaderTitle>
            </Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
            <Table.HeaderCell>Assign</Table.HeaderCell>
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
                {(permissions.admin || permissions.contract_remove) && (
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
                  <Button color="blue">Accounts</Button>
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
