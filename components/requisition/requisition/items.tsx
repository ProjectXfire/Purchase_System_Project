import React from 'react'
// Providers
import { useTranslation } from 'next-i18next'
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
  const { t } = useTranslation('common')
  return (
    <>
      <Header as="h2">
        <Icon name="suitcase" />
        <Header.Content>
          {t('items')} <Header.Subheader>{t('list')}</Header.Subheader>
        </Header.Content>
      </Header>
      <Table compact size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{t('category')}</Table.HeaderCell>
            <Table.HeaderCell>{t('product')}</Table.HeaderCell>
            <Table.HeaderCell>{t('services&others')}</Table.HeaderCell>
            <Table.HeaderCell>{t('description')}</Table.HeaderCell>
            <Table.HeaderCell>UM</Table.HeaderCell>
            <Table.HeaderCell>{t('price')}</Table.HeaderCell>
            <Table.HeaderCell>{t('qtty')}</Table.HeaderCell>
            <Table.HeaderCell>{t('total')}</Table.HeaderCell>
            {showActionsButton && (
              <Table.HeaderCell>{t('actions')}</Table.HeaderCell>
            )}
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
        <Label color="red">
          {t('total')}: {totalOrder.toFixed(2)}
        </Label>
      </Total>
    </>
  )
}
