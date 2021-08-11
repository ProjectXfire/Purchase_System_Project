// React
import React from 'react'
// Next
import Link from 'next/link'
// Models
import { Product } from '@models/inventory/product.model'
// Styles
import { Header, Icon, Table, Button } from 'semantic-ui-react'

export const ProductDetailComponent = ({
  data
}: {
  data: Product
}): React.ReactElement => {
  return (
    <>
      <Header as="h2">
        <Icon name="suitcase" />
        <Header.Content>
          Product <Header.Subheader>Detail</Header.Subheader>
        </Header.Content>
      </Header>
      <Table definition>
        <Table.Body>
          <Table.Row>
            <Table.Cell width="3">Part Number</Table.Cell>
            <Table.Cell>{data.partNumber}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Description</Table.Cell>
            <Table.Cell>{data.description}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Measure</Table.Cell>
            <Table.Cell>{data.unitMeasure}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Price</Table.Cell>
            <Table.Cell>{data.unitPrice}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Link href="/inventory/product">
        <Button type="button">Back</Button>
      </Link>
    </>
  )
}
