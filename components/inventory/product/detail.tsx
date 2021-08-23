// React
import React from 'react'
// Next
import Link from 'next/link'
// Providers
import { useTranslation } from 'next-i18next'
// Models
import { Product } from '@models/inventory/product.model'
// Styles
import { Header, Icon, Table, Button } from 'semantic-ui-react'

export const ProductDetailComponent = ({
  data
}: {
  data: Product
}): React.ReactElement => {
  const { t } = useTranslation('common')
  return (
    <>
      <Header as="h2">
        <Icon name="suitcase" />
        <Header.Content>
          {t('product')} <Header.Subheader>{t('detail')}</Header.Subheader>
        </Header.Content>
      </Header>
      <Table definition>
        <Table.Body>
          <Table.Row>
            <Table.Cell width="3">{t('part_number')}</Table.Cell>
            <Table.Cell>{data.partNumber}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{t('description')}</Table.Cell>
            <Table.Cell>{data.description}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{t('unit_measure')}</Table.Cell>
            <Table.Cell>{data.unitMeasure}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{t('price')}</Table.Cell>
            <Table.Cell>{data.unitPrice}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Link href="/inventory/product">
        <Button type="button">{t('back_button')}</Button>
      </Link>
    </>
  )
}
