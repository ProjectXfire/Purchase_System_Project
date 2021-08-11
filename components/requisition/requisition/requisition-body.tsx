import React, { useEffect, useState } from 'react'
// Providers
import { Controller, useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
// Models
import { Product } from '@models/inventory/product.model'
import { RequisitionItems } from '@models/requisition/requisition.items.model'
// Schema
import { RequisitionItemsSchema } from '@models/requisition/requisition.items.schema'
// Styles
import { Button, Form, Segment } from 'semantic-ui-react'
// Components
import { ItemsListComponent } from '@components/requisition/requisition/items'

interface DropdownValues {
  key: number
  value: string
  text: string
}

export const BodyRequisitionFormComponent = ({
  tableData,
  categoriesDropdown,
  productsDropdown,
  products,
  addSubItems
}: {
  tableData: RequisitionItems[]
  categoriesDropdown: DropdownValues[]
  productsDropdown: DropdownValues[]
  products: Product[]
  addSubItems: (data: Record<string, unknown>) => void
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
      setValue('price', getProduct.unitPrice)
      setValue('unitMeasure', getProduct.unitMeasure)
    }
  }

  useEffect(() => {
    setValue('itemCategory', null)
    setValue('material', null)
    setValue('other', '')
    setValue('description', '')
    setValue('unitMeasure', '')
    setValue('price', 0)
    setValue('quantity', 0)
    setValue('totalCost', 0)
  }, [])

  return (
    <>
      <ItemsListComponent tableData={tableData} />
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
                    onChange={async (e, { name, value }) => {
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
                    setValue('totalCost', getValues('price') * value)
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
