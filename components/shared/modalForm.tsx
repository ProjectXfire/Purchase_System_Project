import React, { useEffect, useState } from 'react'
// Providers
import { Controller, useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { useTranslation } from 'next-i18next'
// Styles
import { Modal, Button, Header, Form, Segment } from 'semantic-ui-react'
// Models
import { RequisitionItems } from '@models/requisition/requisition.items.model'
import { Product } from '@models/inventory/product.model'
// Schemas
import { RequisitionItemsSchema } from '@models/requisition/requisition.items.schema'

interface DropdownValues {
  key: number
  value: string
  text: string
}

export const ModalFormComponent = ({
  open,
  setOpen,
  item,
  categoriesDropdown,
  productsDropdown,
  products,
  action
}: {
  open: boolean
  setOpen: any
  item: RequisitionItems | undefined
  categoriesDropdown: DropdownValues[]
  productsDropdown: DropdownValues[]
  products: Product[]
  action: (values: any) => void
}): React.ReactElement => {
  const { t } = useTranslation('common')

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

  const [showItemOption, setShowItemOption] = useState({
    material: false,
    others: false,
    description: false,
    unitMeasure: false
  })

  useEffect(() => {
    if (item) {
      setValue('itemCategory', item.itemCategory)
      setValue('material', item.material)
      setValue('materialName', item.materialName)
      setValue('other', item.other)
      setValue('description', item.description)
      setValue('unitMeasure', item.unitMeasure)
      setValue('price', item.price)
      setValue('quantity', item.quantity)
      setValue('totalCost', item.totalCost)
      if (item.itemCategory === 'Purchase') {
        setShowItemOption({
          material: true,
          others: false,
          description: false,
          unitMeasure: true
        })
      }
      if (item.itemCategory === 'Services') {
        setShowItemOption({
          material: false,
          others: true,
          description: true,
          unitMeasure: false
        })
      }
      if (item.itemCategory === 'Petty Cash') {
        setShowItemOption({
          material: false,
          others: true,
          description: true,
          unitMeasure: true
        })
      }
    }
  }, [item])

  return (
    <Modal
      size="tiny"
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      closeOnDimmerClick={false}
    >
      <Header icon="star" content="Edit Item" />
      <Modal.Content>
        <Form onSubmit={handleSubmit(action)}>
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
            {showItemOption.material && (
              <Form.Group widths="equal">
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
              </Form.Group>
            )}
            {showItemOption.others && (
              <Form.Group widths="equal">
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
              </Form.Group>
            )}
            {showItemOption.description && (
              <Form.Group widths="equal">
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
              </Form.Group>
            )}
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
                      setValue('totalCost', getValues('price') * value)
                    }}
                    error={errors.quantity ? true : false}
                  />
                )}
              />
            </Form.Group>
            <Form.Group widths="equal">
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
          <Button type="submit" color="green">
            Save
          </Button>
          <Button type="button" color="red" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  )
}
