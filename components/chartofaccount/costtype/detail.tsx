// React
import React from 'react'
// Next
import Link from 'next/link'
// Providers
import { useTranslation } from 'next-i18next'
// Models
import { CostType } from '@models/account/costtype.model'
// Styles
import { Header, Icon, Table, Button, Checkbox } from 'semantic-ui-react'

export const CostTypeDetailComponent = ({
  data
}: {
  data: CostType
}): React.ReactElement => {
  const { t } = useTranslation('common')
  return (
    <>
      <Header as="h2">
        <Icon name="suitcase" />
        <Header.Content>
          {t('costtype')} <Header.Subheader>{t('detail')}</Header.Subheader>
        </Header.Content>
      </Header>
      <Table definition>
        <Table.Body>
          <Table.Row>
            <Table.Cell width="3">{t('name')}</Table.Cell>
            <Table.Cell>{data.name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{t('description')}</Table.Cell>
            <Table.Cell>{data.description}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{t('is_expense')}</Table.Cell>
            <Table.Cell>
              <Checkbox checked={data.isExpense} />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Link href="/chartofaccount/costtype">
        <Button type="button">{t('back_button')}</Button>
      </Link>
    </>
  )
}
