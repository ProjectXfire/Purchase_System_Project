// React
import React from 'react'
// Next
import Link from 'next/link'
// Providers
import { useTranslation } from 'next-i18next'
// Models
import { Contract } from '@models/contract/contract.model'
// Styles
import { Header, Icon, Table, Button } from 'semantic-ui-react'

export const ContractDetailComponent = ({
  data
}: {
  data: Contract
}): React.ReactElement => {
  const { t } = useTranslation('common')
  return (
    <>
      <Header as="h2">
        <Icon name="suitcase" />
        <Header.Content>
          {t('contract')} <Header.Subheader>{t('detail')}</Header.Subheader>
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
            <Table.Cell>{t('area_unit')}</Table.Cell>
            <Table.Cell>{data.areaUnit}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{t('description')}</Table.Cell>
            <Table.Cell>{data.areaUnitDescription}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{t('client_code')}</Table.Cell>
            <Table.Cell>{data.clientCode}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{t('location')}</Table.Cell>
            <Table.Cell>{data.location.name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{t('contract_type')}</Table.Cell>
            <Table.Cell>{data.contractType.name}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Link href="/contract">
        <Button type="button">{t('back_button')}</Button>
      </Link>
    </>
  )
}
