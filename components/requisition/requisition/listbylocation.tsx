import React, { ChangeEvent } from 'react'
// Next
import Link from 'next/link'
// Providers
import dateformat from 'dateformat'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
// Models
import { Permissions } from '@models/auth/permission.model'
import { Requisition } from '@models/requisition/requisition.model'
// Styles
import {
  Table,
  Header,
  Icon,
  Button,
  Input,
  Pagination,
  Item,
  Grid
} from 'semantic-ui-react'
import { TableContainer } from '@styles/globalStyleComponents'
// Components
import { HeaderTitle } from '@styles/globalStyleComponents'

interface SelectedItems {
  itemId: string
  itemName: string
}

export const RequisitionListByLocationComponent = ({
  user,
  selectLocationContext,
  selectLocationParam,
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
  user: string
  selectLocationContext: string
  selectLocationParam: string
  permissions: Permissions
  tableData: Requisition[]
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
          Requisition<Header.Subheader>List</Header.Subheader>
        </Header.Content>
      </Header>
      {(permissions.admin || permissions.req_create) && (
        <Header floated="right">
          <Header.Content>
            <ReactHTMLTableToExcel
              id="exportbutton"
              table="requisitionlist"
              filename="requisitionsExcel"
              className="ui primary button"
              sheet="data"
              buttonText="Export to excel"
            />
            <Link
              href={`/requisition/create/${
                selectLocationContext || selectLocationParam
              }`}
            >
              <Button color="blue">
                <Icon name="plus" /> Add requisition
              </Button>
            </Link>
          </Header.Content>
        </Header>
      )}
      <Item.Group>
        <Item>
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column>
                <Input
                  icon="search"
                  placeholder="Search..."
                  value={searchInputValue}
                  onChange={e => handleSearchedValues(e)}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Item>
      </Item.Group>
      <TableContainer>
        <Table sortable compact id="requisitionlist">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell onClick={() => sortByColumn('code')}>
                <HeaderTitle>Req. Code</HeaderTitle>
              </Table.HeaderCell>
              <Table.HeaderCell onClick={() => sortByColumn('description')}>
                <HeaderTitle>Description</HeaderTitle>
              </Table.HeaderCell>
              <Table.HeaderCell onClick={() => sortByColumn('createdBy')}>
                <HeaderTitle>Created by</HeaderTitle>
              </Table.HeaderCell>
              <Table.HeaderCell onClick={() => sortByColumn('createdByStatus')}>
                <HeaderTitle>User Status</HeaderTitle>
              </Table.HeaderCell>
              <Table.HeaderCell
                onClick={() => sortByColumn('contract.contractType.name')}
              >
                <HeaderTitle>Type</HeaderTitle>
              </Table.HeaderCell>
              <Table.HeaderCell onClick={() => sortByColumn('contract.name')}>
                <HeaderTitle>Contract</HeaderTitle>
              </Table.HeaderCell>
              <Table.HeaderCell
                onClick={() => sortByColumn('contract.description')}
              >
                <HeaderTitle>Description</HeaderTitle>
              </Table.HeaderCell>
              <Table.HeaderCell onClick={() => sortByColumn('expense.name')}>
                <HeaderTitle>Expense</HeaderTitle>
              </Table.HeaderCell>
              <Table.HeaderCell
                onClick={() => sortByColumn('expense.description')}
              >
                <HeaderTitle>Description</HeaderTitle>
              </Table.HeaderCell>
              <Table.HeaderCell onClick={() => sortByColumn('priority.name')}>
                <HeaderTitle>Priority</HeaderTitle>
              </Table.HeaderCell>
              <Table.HeaderCell onClick={() => sortByColumn('dateRequired')}>
                <HeaderTitle>Date required</HeaderTitle>
              </Table.HeaderCell>
              <Table.HeaderCell
                onClick={() => sortByColumn('approvedBy.email')}
              >
                <HeaderTitle>Approver by</HeaderTitle>
              </Table.HeaderCell>
              <Table.HeaderCell
                onClick={() => sortByColumn('approvedByStatus')}
              >
                <HeaderTitle>Approval Status</HeaderTitle>
              </Table.HeaderCell>
              <Table.HeaderCell onClick={() => sortByColumn('approvedByDate')}>
                <HeaderTitle>Approval Date</HeaderTitle>
              </Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
              <Table.HeaderCell>Items</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tableData.map(value => (
              <Table.Row key={value._id}>
                <Table.Cell>{value.code}</Table.Cell>
                <Table.Cell>{value.description}</Table.Cell>
                <Table.Cell>{value.createdBy}</Table.Cell>
                <Table.Cell
                  positive={value.createdByStatus === 'Closed'}
                  negative={value.createdByStatus !== 'Closed'}
                >
                  {value.createdByStatus}
                </Table.Cell>
                <Table.Cell>
                  {value.contract && value.contract.contractType
                    ? `${value.contract.contractType.name}`
                    : ''}
                </Table.Cell>
                <Table.Cell>
                  {value.contract ? `${value.contract.name}` : ''}
                </Table.Cell>
                <Table.Cell>
                  {value.contract ? `${value.contract.description}` : ''}
                </Table.Cell>
                <Table.Cell>
                  {value.expense ? `${value.expense.name}` : ''}
                </Table.Cell>
                <Table.Cell>
                  {value.expense ? `${value.expense.description}` : ''}
                </Table.Cell>
                <Table.Cell>{value.priority.name}</Table.Cell>
                <Table.Cell>
                  {dateformat(value.dateRequired, 'yyyy-mm-dd')}
                </Table.Cell>
                <Table.Cell>
                  {value.approvedBy ? `${value.approvedBy.email}` : ''}
                </Table.Cell>
                <Table.Cell
                  positive={
                    !value.approvedByStatus
                      ? false
                      : value.approvedByStatus === 'Approved'
                      ? true
                      : false
                  }
                  negative={
                    !value.approvedByStatus
                      ? true
                      : value.approvedByStatus !== 'Approved'
                      ? true
                      : false
                  }
                >
                  {value.approvedByStatus ? `${value.approvedByStatus}` : ''}
                </Table.Cell>
                <Table.Cell>
                  {value.approvedByDate
                    ? `${dateformat(value.dateRequired, 'yyyy-mm-dd')}`
                    : ''}
                </Table.Cell>
                <Table.Cell>
                  <Link href={`/requisition/detail/${value._id}`}>
                    <Button size="mini" icon>
                      <Icon name="file alternate outline" />
                    </Button>
                  </Link>
                  {permissions.admin && (
                    <Button
                      icon
                      color="red"
                      size="mini"
                      onClick={() => {
                        setSelectedItem({
                          itemId: value._id,
                          itemName: `${value.code} ${value.description}`
                        })
                        setShowModal(true)
                      }}
                    >
                      <Icon name="trash" />
                    </Button>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {(permissions.admin ||
                    (permissions.req_create &&
                      value.createdBy === user &&
                      value.createdByStatus === 'Open') ||
                    (permissions.req_edit &&
                      value.createdBy === user &&
                      value.createdByStatus === 'Open')) && (
                    <Link href={`/requisition/items/${value._id}`}>
                      <Button size="mini" color="blue">
                        Edit
                      </Button>
                    </Link>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </TableContainer>
      <br />
      <Pagination
        size="mini"
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
