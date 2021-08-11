import React from 'react'
// Models
import { RequisitionItems } from '@models/requisition/requisition.items.model'
// Styles
import { Header, Icon, Table } from 'semantic-ui-react'

export const ItemsListComponent = ({
  tableData
}: {
  tableData: RequisitionItems[]
}): React.ReactElement => {
  return (
    <>
      <Header as="h2">
        <Icon name="suitcase" />
        <Header.Content>
          Items <Header.Subheader>Products & Services</Header.Subheader>
        </Header.Content>
      </Header>
      <Table compact size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Material</Table.HeaderCell>
            <Table.HeaderCell>Services & Others</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Unit Measure</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Qtty</Table.HeaderCell>
            <Table.HeaderCell>Total price</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tableData.map(value => (
            <Table.Row key={value._id}>
              <Table.Cell>{value.itemCategory}</Table.Cell>
              <Table.Cell>
                {value.material
                  ? `${value.material.partNumber} ${value.material.description}`
                  : ''}
              </Table.Cell>
              <Table.Cell>{value.other}</Table.Cell>
              <Table.Cell>{value.description}</Table.Cell>
              <Table.Cell>{value.unitMeasure}</Table.Cell>
              <Table.Cell>{value.price}</Table.Cell>
              <Table.Cell>{value.quantity}</Table.Cell>
              <Table.Cell>{value.totalCost}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  )
}
