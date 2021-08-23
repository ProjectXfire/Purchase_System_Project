// React
import React from 'react'
// Next
import Link from 'next/link'
// Providers
import dateformat from 'dateformat'
import { useTranslation } from 'next-i18next'
// Models
import { Requisition } from '@models/requisition/requisition.model'
// Styles
import { Header, Icon, Table, Button, Grid, Divider } from 'semantic-ui-react'
import { TitleLabel } from '@styles/globalStyleComponents'
// Components
import { ItemsListComponent } from '@components/requisition/requisition/items'
import { totalValue } from '@utils/getTotal'

export const RequisitionDetailComponent = ({
  requisition,
  disableButtonBack
}: {
  requisition: Requisition
  disableButtonBack?: boolean
}): React.ReactElement => {
  const { t } = useTranslation('common')
  return (
    <>
      <Header as="h2">
        <Icon name="suitcase" />
        <Header.Content>
          {t('requisition')} <Header.Subheader>{t('detail')}</Header.Subheader>
        </Header.Content>
      </Header>
      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column>
            <Table definition size="small">
              <Table.Body>
                <Table.Row>
                  <Table.Cell width="3">{t('requisition_code')}</Table.Cell>
                  <Table.Cell>{requisition.code}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{t('location')}</Table.Cell>
                  <Table.Cell>{requisition.location.name}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{t('description')}</Table.Cell>
                  <Table.Cell>{requisition.description}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column>
            <Table definition size="small">
              <Table.Body>
                <Table.Row>
                  <Table.Cell>{t('date_required')}</Table.Cell>
                  <Table.Cell>
                    {dateformat(requisition.dateRequired, 'yyyy-mm-dd')}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{t('observations')}</Table.Cell>
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
            <TitleLabel>{t('shipments')}</TitleLabel>
            <Table definition size="small">
              <Table.Body>
                <Table.Row>
                  <Table.Cell>{t('currency')}</Table.Cell>
                  <Table.Cell>
                    {requisition.currency ? `${requisition.currency.name}` : ''}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{t('requestor')}</Table.Cell>
                  <Table.Cell>
                    {requisition.requestor
                      ? `${requisition.requestor.name}`
                      : ''}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{t('shipby')}</Table.Cell>
                  <Table.Cell>{requisition.shipBy.name}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{t('shipto')}</Table.Cell>
                  <Table.Cell>
                    {requisition.shipTo ? `${requisition.shipTo.name}` : ''}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column>
            <TitleLabel>{t('priority')}</TitleLabel>
            <Table definition size="small">
              <Table.Body>
                <Table.Row>
                  <Table.Cell>{t('priority')}</Table.Cell>
                  <Table.Cell>{`${requisition.priority.name} ${requisition.priority.description}`}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{t('justify')}</Table.Cell>
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
            <TitleLabel>{t('contract')}</TitleLabel>
            <Table definition size="small">
              <Table.Body>
                <Table.Row>
                  <Table.Cell width="3">{t('contract')}</Table.Cell>
                  <Table.Cell>
                    {requisition.contract
                      ? `${requisition.contract.name} ${requisition.contract.description}`
                      : ''}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width="3">{t('contract_type')}</Table.Cell>
                  <Table.Cell>
                    {requisition.contract
                      ? `${requisition.contract.contractType.name}`
                      : ''}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{t('area_unit')}</Table.Cell>
                  <Table.Cell>
                    {requisition.contract
                      ? `${requisition.contract.areaUnit} ${requisition.contract.areaUnitDescription}`
                      : ''}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{t('account')}</Table.Cell>
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
            <TitleLabel>{t('expense')}</TitleLabel>
            <Table definition size="small">
              <Table.Body>
                <Table.Row>
                  <Table.Cell width="3">{t('expense')}</Table.Cell>
                  <Table.Cell>
                    {requisition.expense
                      ? `${requisition.expense.name} ${requisition.expense.description}`
                      : ''}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{t('costtype')}</Table.Cell>
                  <Table.Cell>
                    {requisition.costtype
                      ? `${requisition.costtype.name} - ${requisition.costtype.description}`
                      : ''}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{t('subledger')}</Table.Cell>
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
            <TitleLabel>{t('created_by')}</TitleLabel>
            <Table definition size="small">
              <Table.Body>
                <Table.Row>
                  <Table.Cell width="3">{t('created_by')}</Table.Cell>
                  <Table.Cell>{requisition.createdBy}</Table.Cell>
                </Table.Row>
                <Table.Row warning>
                  <Table.Cell>{t('user_status')}</Table.Cell>
                  <Table.Cell>{requisition.createdByStatus}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column>
            <TitleLabel>{t('approver')}</TitleLabel>
            <Table definition size="small">
              <Table.Body>
                <Table.Row>
                  <Table.Cell width="3">{t('approver_by')}</Table.Cell>
                  <Table.Cell>
                    {requisition.approvedBy
                      ? `${requisition.approvedBy.email}`
                      : ''}
                  </Table.Cell>
                </Table.Row>
                <Table.Row warning>
                  <Table.Cell>{t('approval_status')}</Table.Cell>
                  <Table.Cell>
                    {requisition.approvedByStatus
                      ? `${requisition.approvedByStatus}`
                      : ''}
                  </Table.Cell>
                </Table.Row>
                <Table.Row warning>
                  <Table.Cell>{t('approval_date')}</Table.Cell>
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
        tableData={requisition.items}
        showActionsButton={false}
        totalOrder={totalValue(requisition.items)}
      />
      {!disableButtonBack && (
        <Link
          href={`/requisition/${requisition.location._id}?year=${requisition.year}`}
        >
          <Button type="button">{t('back_button')}</Button>
        </Link>
      )}
    </>
  )
}
