import React, { ChangeEvent } from 'react'
// Next
import Link from 'next/link'
// Providers
import { useTranslation } from 'next-i18next'
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
  Grid,
  Dropdown
} from 'semantic-ui-react'
import { HeaderTitle, TableContainer } from '@styles/globalStyleComponents'
import dateformat from 'dateformat'

interface DropdownValues {
  key: number
  value: string
  text: string
}

export const RequisitionApprovalsComponent = ({
  permissions,
  tableData = [],
  pages,
  approverStatusDropdown,
  handlePage,
  searchInputValue,
  filterByStatus,
  handleSearchedValues,
  sortByColumn,
  setOptions,
  setShowModal,
  setMessage
}: {
  permissions: Permissions
  tableData: Requisition[]
  pages: number
  approverStatusDropdown: DropdownValues[]
  handlePage: (activePage: number) => void
  searchInputValue: string
  filterByStatus: (e: any) => void
  handleSearchedValues: (e: ChangeEvent<HTMLInputElement>) => void
  sortByColumn: (column: string) => void
  setOptions: any
  setShowModal: any
  setMessage: any
}): React.ReactElement => {
  const { t } = useTranslation('common')
  return (
    <>
      <Header as="h2" floated="left">
        <Icon name="suitcase" />
        <Header.Content>
          {t('requisition')}
          <Header.Subheader>{t('list')}</Header.Subheader>
        </Header.Content>
      </Header>
      <Header as="h2" floated="right">
        <Header.Content>
          <Header.Subheader>
            <Dropdown
              clearable
              placeholder={t('select_approver_status')}
              fluid
              search
              selection
              options={approverStatusDropdown}
              onChange={async (e, { value }) => filterByStatus(value)}
            />
          </Header.Subheader>
        </Header.Content>
      </Header>
      <Item.Group>
        <Item>
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column>
                <Input
                  icon="search"
                  placeholder={t('search_input')}
                  value={searchInputValue}
                  onChange={e => handleSearchedValues(e)}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Item>
      </Item.Group>
      <TableContainer>
        <Table sortable compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell onClick={() => sortByColumn('code')}>
                <HeaderTitle>{t('requisition_code')}</HeaderTitle>
              </Table.HeaderCell>
              <Table.HeaderCell onClick={() => sortByColumn('description')}>
                <HeaderTitle>{t('description')}</HeaderTitle>
              </Table.HeaderCell>
              <Table.HeaderCell onClick={() => sortByColumn('createdBy')}>
                <HeaderTitle>{t('created_by')}</HeaderTitle>
              </Table.HeaderCell>
              <Table.HeaderCell onClick={() => sortByColumn('createdByStatus')}>
                <HeaderTitle>{t('user_status')}</HeaderTitle>
              </Table.HeaderCell>
              <Table.HeaderCell onClick={() => sortByColumn('contract.name')}>
                <HeaderTitle>{t('contract')}</HeaderTitle>
              </Table.HeaderCell>
              <Table.HeaderCell onClick={() => sortByColumn('expense.name')}>
                <HeaderTitle>{t('expense')}</HeaderTitle>
              </Table.HeaderCell>
              <Table.HeaderCell onClick={() => sortByColumn('priority.name')}>
                <HeaderTitle>{t('priority')}</HeaderTitle>
              </Table.HeaderCell>
              <Table.HeaderCell onClick={() => sortByColumn('dateRequired')}>
                <HeaderTitle>{t('date_required')}</HeaderTitle>
              </Table.HeaderCell>
              <Table.HeaderCell
                onClick={() => sortByColumn('approvedBy.email')}
              >
                <HeaderTitle>{t('approver_by')}</HeaderTitle>
              </Table.HeaderCell>
              <Table.HeaderCell
                onClick={() => sortByColumn('approvedByStatus')}
              >
                <HeaderTitle>{t('approval_status')}</HeaderTitle>
              </Table.HeaderCell>
              <Table.HeaderCell onClick={() => sortByColumn('approvedByDate')}>
                <HeaderTitle>{t('approval_date')}</HeaderTitle>
              </Table.HeaderCell>
              <Table.HeaderCell>{t('actions')}</Table.HeaderCell>
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
                  {value.contract
                    ? `${value.contract.name} ${value.contract.description}`
                    : ''}
                </Table.Cell>
                <Table.Cell>
                  {value.expense
                    ? `${value.expense.name} ${value.expense.description}`
                    : ''}
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
                  <Link href={`/requisition/approvals/detail/${value._id}`}>
                    <Button size="mini" icon>
                      <Icon name="file alternate outline" />
                    </Button>
                  </Link>
                  {value.createdByStatus === 'Closed' &&
                    permissions.approval_read &&
                    value.approvedByStatus === null && (
                      <>
                        <Button
                          color="green"
                          size="mini"
                          icon
                          onClick={() => {
                            setOptions({
                              requisitionId: value._id,
                              status: 'Approved'
                            })
                            setShowModal(true)
                            setMessage(t('approver_message_approved'))
                          }}
                        >
                          <Icon name="check" />
                        </Button>
                        <Button
                          color="red"
                          size="mini"
                          icon
                          onClick={() => {
                            setOptions({
                              requisitionId: value._id,
                              status: 'Not approved'
                            })
                            setShowModal(true)
                            setMessage(t('approver_message_reject'))
                          }}
                        >
                          <Icon name="times" />
                        </Button>
                      </>
                    )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </TableContainer>
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
