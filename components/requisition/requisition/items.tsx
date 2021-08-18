import React, { useEffect, useState } from 'react'
// Models
import { RequisitionItems } from '@models/requisition/requisition.items.model'
// Styles
import { Button, Header, Icon, Label, Table } from 'semantic-ui-react'
import { Total } from '@styles/globalStyleComponents'
import Link from 'next/link'

export const ItemsListComponent = ({
  tableData,
  showActionsButton = true,
  setShowDeleteModal,
  setSelectedItem
}: {
  tableData: RequisitionItems[]
  showActionsButton?: boolean
  setShowDeleteModal?: any
  setSelectedItem?: any
}): React.ReactElement => {
  const [totalOrder, setTotalOrder] = useState(0)

  useEffect(() => {
    const total = tableData.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.totalCost
    }, 0)
    setTotalOrder(total)
  }, [totalOrder])

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
              {showActionsButton && (
                <Table.Cell>
                  <Link href={`/requisition/items/edit/${value._id}`}>
                    <Button icon="edit"></Button>
                  </Link>
                  <Button
                    color="red"
                    icon="trash"
                    onClick={() => {
                      setShowDeleteModal(true)
                      setSelectedItem({
                        itemId: value._id,
                        itemName:
                          value.material && value.material._id
                            ? `${value.material.partNumber} ${value.material.description}`
                            : `${value.other} - ${value.description}`
                      })
                    }}
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
