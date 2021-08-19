import React from 'react'
// Models
import { RequisitionItems } from '@models/requisition/requisition.items.model'
// Styles
import { Button, Header, Icon, Label, Table } from 'semantic-ui-react'
import { Total } from '@styles/globalStyleComponents'

export const ItemsListComponent = ({
  tableData,
  totalOrder = 0,
  showActionsButton = true,
  deleteSubItems = () => true,
  setOpenEditModal,
  setSelectedItemIndex
}: {
  tableData: RequisitionItems[]
  totalOrder?: number
  showActionsButton?: boolean
  deleteSubItems?: (index: number) => void
  setOpenEditModal?: any
  setSelectedItemIndex?: any
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
            <Table.HeaderCell>UM</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Qtty</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
            {showActionsButton && <Table.HeaderCell>Actions</Table.HeaderCell>}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tableData.map((value, index) => (
            <Table.Row key={index}>
              <Table.Cell>{value.itemCategory}</Table.Cell>
              <Table.Cell>
                {value.materialName ? `${value.materialName}` : ''}
              </Table.Cell>
              <Table.Cell>{value.other}</Table.Cell>
              <Table.Cell>{value.description}</Table.Cell>
              <Table.Cell>{value.unitMeasure}</Table.Cell>
              <Table.Cell>{value.price}</Table.Cell>
              <Table.Cell>{value.quantity}</Table.Cell>
              <Table.Cell>{value.totalCost}</Table.Cell>
              {showActionsButton && (
                <Table.Cell>
                  <Button
                    icon="edit"
                    onClick={() => {
                      setOpenEditModal(true)
                      setSelectedItemIndex(index)
                    }}
                  ></Button>
                  <Button
                    color="red"
                    icon="trash"
                    onClick={() => deleteSubItems(index)}
                  ></Button>
                </Table.Cell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Total>
        <Label color="red">Total: {totalOrder.toFixed(2)}</Label>
      </Total>
    </>
  )
}
