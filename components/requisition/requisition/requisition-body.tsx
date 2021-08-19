import React, { useEffect, useState } from 'react'
// Providers
import { Controller, useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
// Utils
import { totalValue } from '@utils/getTotal'
// Models
import { Product } from '@models/inventory/product.model'
import { RequisitionItems } from '@models/requisition/requisition.items.model'
// Schema
import { RequisitionItemsSchema } from '@models/requisition/requisition.items.schema'
// Styles
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react'
// Components
import { ItemsListComponent } from '@components/requisition/requisition/items'
import { ModalFormComponent } from '@components/shared/modalForm'

interface DropdownValues {
  key: number
  value: string
  text: string
}

export const BodyRequisitionFormComponent = ({
  validateSetValue,
  items,
  categoriesDropdown,
  productsDropdown,
  products
}: {
  validateSetValue: any
  items: RequisitionItems[]
  categoriesDropdown: DropdownValues[]
  productsDropdown: DropdownValues[]
  products: Product[]
}): React.ReactElement => {
  const [showItemOption, setShowItemOption] = useState({
    material: false,
    others: false,
    description: false,
    unitMeasure: false
  })

  // SET SCHEMA TO VALIDATE FORM
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    control
  } = useForm({ resolver: joiResolver(RequisitionItemsSchema) })

  // COMPLETE PRODUCT DATA
  const setProductData = (id: string) => {
    const getProduct = products.find(item => item._id === id)
    if (getProduct && getProduct._id) {
      setValue(
        'materialName',
        `${getProduct.partNumber} ${getProduct.description}`
      )
      setValue('price', getProduct.unitPrice)
      setValue('unitMeasure', getProduct.unitMeasure)
    }
  }

  // ADD SUB ITEMS
  const [addedItems, setAddedItems] = useState<RequisitionItems[]>(items)
  const [totalOrder, setTotalOrder] = useState(totalValue(items))
  const [duplicatedMaterialAddedMessage, setDuplicatedAddedMessage] =
    useState('')
  const addSubItems = (data: RequisitionItems) => {
    const allAddedItems = addedItems
    if (data.material) {
      const exist = allAddedItems.find(item => item.material === data.material)
      if (exist) {
        setDuplicatedAddedMessage('Material is already added, insert a new one')
      } else {
        data.itemId = addedItems.length + 1
        allAddedItems.push(data)
        setAddedItems(allAddedItems)
        validateSetValue('items', allAddedItems)
        const total = totalValue(allAddedItems)
        setTotalOrder(total)
        setValue('itemCategory', null)
        setValue('material', null)
        setValue('materialName', '')
        setValue('other', '')
        setValue('description', '')
        setValue('unitMeasure', '')
        setValue('price', 0)
        setValue('quantity', 0)
        setValue('totalCost', 0)
        setDuplicatedAddedMessage('')
      }
    } else {
      data.itemId = addedItems.length + 1
      allAddedItems.push(data)
      setAddedItems(allAddedItems)
      validateSetValue('items', allAddedItems)
      const total = totalValue(allAddedItems)
      setTotalOrder(total)
      setValue('itemCategory', null)
      setValue('material', null)
      setValue('materialName', '')
      setValue('other', '')
      setValue('description', '')
      setValue('unitMeasure', '')
      setValue('price', 0)
      setValue('quantity', 0)
      setValue('totalCost', 0)
      setDuplicatedAddedMessage('')
    }
  }

  // EDIT SUB ITEMS
  const [openEditModal, setOpenEditModal] = useState(false)
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1)
  const editSubItems = (updateItem: RequisitionItems) => {
    const updateItems = addedItems
    updateItems.splice(selectedItemIndex, 1, updateItem)
    const total = totalValue(updateItems)
    setTotalOrder(total)
    setAddedItems(updateItems)
    validateSetValue('items', updateItems)
    setOpenEditModal(false)
  }

  // DELETE SUB ITEMS
  const deleteSubItems = (indexItem: number) => {
    const addedItemsUpdate = addedItems.filter(
      (item, index) => index !== indexItem
    )
    validateSetValue('items', addedItemsUpdate)
    setAddedItems(addedItemsUpdate)
    const total = totalValue(addedItemsUpdate)
    setTotalOrder(total)
  }

  useEffect(() => {
    setValue('itemCategory', null)
    setValue('material', null)
    setValue('materialName', '')
    setValue('other', '')
    setValue('description', '')
    setValue('unitMeasure', '')
    setValue('price', 0)
    setValue('quantity', 0)
    setValue('totalCost', 0)
  }, [addedItems])

  return (
    <>
      <ItemsListComponent
        tableData={addedItems}
        totalOrder={totalOrder}
        deleteSubItems={deleteSubItems}
        setOpenEditModal={setOpenEditModal}
        setSelectedItemIndex={setSelectedItemIndex}
      />
      <ModalFormComponent
        open={openEditModal}
        setOpen={setOpenEditModal}
        item={addedItems.find((item, index) => index === selectedItemIndex)}
        categoriesDropdown={categoriesDropdown}
        productsDropdown={productsDropdown}
        products={products}
        action={editSubItems}
      />
      {duplicatedMaterialAddedMessage && (
        <Message negative>
          <Message.Header>
            <Icon name="help" /> Duplicated material
          </Message.Header>
          <p>{duplicatedMaterialAddedMessage}</p>
        </Message>
      )}
      <Form onSubmit={handleSubmit(addSubItems)}>
        <Segment>
          <Form.Group widths="equal">
            <Controller
              name="itemCategory"
              control={control}
              render={({ field: { value } }) => (
                <Form.Select
                  fluid
                  search
                  label="Category"
                  options={categoriesDropdown}
                  placeholder="Select category"
                  name="itemCategory"
                  value={value}
                  onChange={async (e, { name, value }) => {
                    setValue(name, value)
                    setValue('material', null)
                    setValue('materialName', '')
                    setValue('other', '')
                    setValue('description', '')
                    setValue('price', 0)
                    setValue('quantity', 0)
                    setValue('totalCost', 0)
                    if (value === 'Services') {
                      setShowItemOption({
                        material: false,
                        others: true,
                        description: true,
                        unitMeasure: false
                      })
                    }
                    if (value === 'Purchase') {
                      setShowItemOption({
                        material: true,
                        others: false,
                        description: false,
                        unitMeasure: true
                      })
                    }
                    if (value === 'Petty Cash') {
                      setShowItemOption({
                        material: false,
                        others: true,
                        description: true,
                        unitMeasure: true
                      })
                    }
                  }}
                  error={errors.itemCategory ? true : false}
                />
              )}
            />
          </Form.Group>
          <Form.Group widths="equal">
            {showItemOption.material && (
              <Controller
                name="material"
                control={control}
                render={({ field: { value } }) => (
                  <Form.Select
                    fluid
                    search
                    clearable
                    label="Material"
                    options={productsDropdown}
                    placeholder="Select material"
                    name="material"
                    value={value}
                    onChange={async (e: any, { name, value }) => {
                      setValue(name, value)
                      setProductData(value as string)
                    }}
                    error={errors.material ? true : false}
                  />
                )}
              />
            )}
            {showItemOption.others && (
              <Controller
                name="other"
                control={control}
                render={({ field: { value } }) => (
                  <Form.Input
                    fluid
                    label="Others"
                    placeholder="Services or other materials"
                    name="other"
                    value={value || ''}
                    onChange={async (e, { name, value }) => {
                      setValue(name, value)
                    }}
                    error={errors.other ? true : false}
                  />
                )}
              />
            )}
            {showItemOption.description && (
              <Controller
                name="description"
                control={control}
                render={({ field: { value } }) => (
                  <Form.Input
                    fluid
                    label="Description"
                    placeholder="Description"
                    name="description"
                    value={value || ''}
                    onChange={async (e, { name, value }) => {
                      setValue(name, value)
                    }}
                    error={errors.description ? true : false}
                  />
                )}
              />
            )}
          </Form.Group>
          <Form.Group widths="equal">
            {showItemOption.unitMeasure && (
              <Controller
                name="unitMeasure"
                control={control}
                render={({ field: { value } }) => (
                  <Form.Input
                    fluid
                    label="Unit Measure"
                    placeholder="Unit Measure"
                    name="unitMeasure"
                    value={value || ''}
                    onChange={async (e, { name, value }: any) => {
                      setValue(name, value)
                    }}
                    error={errors.unitMeasure ? true : false}
                  />
                )}
              />
            )}
            <Controller
              name="price"
              control={control}
              render={({ field: { value } }) => (
                <Form.Input
                  fluid
                  label="Price"
                  placeholder="Price"
                  name="price"
                  type="number"
                  value={value || 0}
                  onChange={async (e, { name, value }: any) => {
                    setValue(name, value)
                    setValue('totalCost', getValues('quantity') * value)
                  }}
                  error={errors.price ? true : false}
                />
              )}
            />
            <Controller
              name="quantity"
              control={control}
              render={({ field: { value } }) => (
                <Form.Input
                  fluid
                  label="Quantity"
                  placeholder="Quantity"
                  name="quantity"
                  type="number"
                  value={value || 0}
                  onChange={async (e, { name, value }: any) => {
                    setValue(name, value)
                    setValue(
                      'totalCost',
                      (getValues('price') * value).toFixed(2)
                    )
                  }}
                  error={errors.quantity ? true : false}
                />
              )}
            />
            <Controller
              name="totalCost"
              control={control}
              render={({ field: { value } }) => (
                <Form.Input
                  fluid
                  label="Total value"
                  placeholder="Total value"
                  name="totalCost"
                  type="number"
                  readOnly={true}
                  value={value || 0}
                  onChange={async (e, { name, value }) => {
                    setValue(name, value)
                  }}
                  error={errors.totalCost ? true : false}
                />
              )}
            />
          </Form.Group>
        </Segment>
        <Button type="submit" color="blue">
          Add item
        </Button>
      </Form>
    </>
  )
}
