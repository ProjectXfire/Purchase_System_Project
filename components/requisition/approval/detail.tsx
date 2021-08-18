// React
import React from 'react'
// Next
import Link from 'next/link'
// Providers
import dateformat from 'dateformat'
// Models
import { Requisition } from '@models/requisition/requisition.model'
import { RequisitionItems } from '@models/requisition/requisition.items.model'
// Styles
import { Header, Icon, Table, Button, Grid, Divider } from 'semantic-ui-react'
import { TitleLabel } from '@styles/globalStyleComponents'
// Components
import { ItemsListComponent } from '@components/requisition/requisition/items'

export const RequisitionApprovalDetailComponent = ({
  requisition,
  requisitionItems
}: {
  requisition: Requisition
  requisitionItems: RequisitionItems[]
}): React.ReactElement => {
  return (
    <>
      <Header as="h2">
        <Icon name="suitcase" />
        <Header.Content>
          Requisition <Header.Subheader>Detail</Header.Subheader>
        </Header.Content>
      </Header>
      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column>
            <Table definition size="small">
              <Table.Body>
                <Table.Row>
                  <Table.Cell width="3">Nº Req.</Table.Cell>
                  <Table.Cell>{requisition.code}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Location</Table.Cell>
                  <Table.Cell>{requisition.location.name}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Description</Table.Cell>
                  <Table.Cell>{requisition.description}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column>
            <Table definition size="small">
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Date required</Table.Cell>
                  <Table.Cell>
                    {dateformat(requisition.dateRequired, 'yyyy-mm-dd')}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Observation</Table.Cell>
                  <Table.Cell>{requisition.observation}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider />
      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column>
            <TitleLabel>Shipment</TitleLabel>
            <Table definition size="small">
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Currency</Table.Cell>
                  <Table.Cell>
                    {requisition.currency ? `${requisition.currency.name}` : ''}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Requestor</Table.Cell>
                  <Table.Cell>
                    {requisition.requestor
                      ? `${requisition.requestor.name}`
                      : ''}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Ship by</Table.Cell>
                  <Table.Cell>{requisition.shipBy.name}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Ship to</Table.Cell>
                  <Table.Cell>
                    {requisition.shipTo ? `${requisition.shipTo.name}` : ''}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column>
            <TitleLabel>Priority</TitleLabel>
            <Table definition size="small">
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Priority</Table.Cell>
                  <Table.Cell>{`${requisition.priority.name} ${requisition.priority.description}`}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Justification</Table.Cell>
                  <Table.Cell>{requisition.priorityJustification}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider />
      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column>
            <TitleLabel>Contract</TitleLabel>
            <Table definition size="small">
              <Table.Body>
                <Table.Row>
                  <Table.Cell width="3">Contract</Table.Cell>
                  <Table.Cell>
                    {requisition.contract
                      ? `${requisition.contract.name} ${requisition.contract.description}`
                      : ''}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width="3">Type</Table.Cell>
                  <Table.Cell>
                    {requisition.contract
                      ? `${requisition.contract.contractType.name}`
                      : ''}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Area Unit</Table.Cell>
                  <Table.Cell>
                    {requisition.contract
                      ? `${requisition.contract.areaUnit} ${requisition.contract.areaUnitDescription}`
                      : ''}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Account</Table.Cell>
                  <Table.Cell>
                    {requisition.account
                      ? `${requisition.account.costcode.name} ${requisition.account.costcode.description} -
                  ${requisition.account.costtype.name} ${requisition.account.costtype.description} -
                  ${requisition.account.budget.name} ${requisition.account.budget.description}`
                      : ''}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column>
            <TitleLabel>Expense</TitleLabel>
            <Table definition size="small">
              <Table.Body>
                <Table.Row>
                  <Table.Cell width="3">Expense</Table.Cell>
                  <Table.Cell>
                    {requisition.expense
                      ? `${requisition.expense.name} ${requisition.expense.description}`
                      : ''}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Cost Type</Table.Cell>
                  <Table.Cell>
                    {requisition.costtype
                      ? `${requisition.costtype.name} - ${requisition.costtype.description}`
                      : ''}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Subledger</Table.Cell>
                  <Table.Cell>
                    {requisition.subledger
                      ? `${requisition.subledger.name} - ${requisition.subledger.description}`
                      : ''}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider />
      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column>
            <TitleLabel>Originator</TitleLabel>
            <Table definition size="small">
              <Table.Body>
                <Table.Row>
                  <Table.Cell width="3">Created by</Table.Cell>
                  <Table.Cell>{requisition.createdBy}</Table.Cell>
                </Table.Row>
                <Table.Row warning>
                  <Table.Cell>Status</Table.Cell>
                  <Table.Cell>{requisition.createdByStatus}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column>
            <TitleLabel>Approval</TitleLabel>
            <Table definition size="small">
              <Table.Body>
                <Table.Row>
                  <Table.Cell width="3">Approved by</Table.Cell>
                  <Table.Cell>
                    {requisition.approvedBy
                      ? `${requisition.approvedBy.email}`
                      : ''}
                  </Table.Cell>
                </Table.Row>
                <Table.Row warning>
                  <Table.Cell>Status</Table.Cell>
                  <Table.Cell>
                    {requisition.approvedByStatus
                      ? `${requisition.approvedByStatus}`
                      : ''}
                  </Table.Cell>
                </Table.Row>
                <Table.Row warning>
                  <Table.Cell>Approval date</Table.Cell>
                  <Table.Cell>
                    {requisition.approvedByDate
                      ? `${dateformat(
                          requisition.approvedByDate,
                          'yyyy-mm-dd'
                        )}`
                      : ''}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider />
      <ItemsListComponent
        tableData={requisitionItems}
        showActionsButton={false}
      />
      <Link href="/requisition/approvals/list">
        <Button type="button">Back</Button>
      </Link>
    </>
  )
}
