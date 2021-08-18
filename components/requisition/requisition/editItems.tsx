import Link from 'next/link'
import React from 'react'
import { Controller } from 'react-hook-form'
// Provider
import { Button, Form, Header, Icon, Message, Segment } from 'semantic-ui-react'

interface DropdownValues {
  key: number
  value: string
  text: string
}

export const RequisitionItemsEditComponent = ({
  validateControl,
  validateSetValue,
  validateGetValues,
  validateErrors,
  validateHandleSubmit,
  requisitionId,
  productsDropdown,
  categoriesDropdown,
  showItemOption,
  setShowItemOption,
  setProductData,
  editItem,
  error
}: {
  validateControl: any
  validateSetValue: any
  validateGetValues: any
  validateErrors: any
  validateHandleSubmit: any
  requisitionId: string
  productsDropdown: DropdownValues[]
  categoriesDropdown: DropdownValues[]
  showItemOption: any
  setShowItemOption: any
  setProductData: (id: string) => void
  editItem: () => void
  error: string
}): React.ReactElement => {
  return (
    <>
      <Header as="h2">
        <Icon name="suitcase" />
        <Header.Content>
          Item <Header.Subheader>Edit</Header.Subheader>
        </Header.Content>
      </Header>
      <Form onSubmit={validateHandleSubmit(editItem)}>
        <Segment>
          <Form.Group widths="equal">
            <Controller
              name="itemCategory"
              control={validateControl}
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
                    validateSetValue(name, value)
                    validateSetValue('material', null)
                    validateSetValue('other', '')
                    validateSetValue('description', '')
                    validateSetValue('price', 0)
                    validateSetValue('quantity', 0)
                    validateSetValue('totalCost', 0)
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
                  error={validateErrors.itemCategory ? true : false}
                />
              )}
            />
          </Form.Group>
          <Form.Group widths="equal">
            {showItemOption.material && (
              <Controller
                name="material"
                control={validateControl}
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
                      validateSetValue(name, value)
                      setProductData(value as string)
                    }}
                    error={validateErrors.material ? true : false}
                  />
                )}
              />
            )}
            {showItemOption.others && (
              <Controller
                name="other"
                control={validateControl}
                render={({ field: { value } }) => (
                  <Form.Input
                    fluid
                    label="Others"
                    placeholder="Services or other materials"
                    name="other"
                    value={value || ''}
                    onChange={async (e, { name, value }) => {
                      validateSetValue(name, value)
                    }}
                    error={validateErrors.other ? true : false}
                  />
                )}
              />
            )}
            {showItemOption.description && (
              <Controller
                name="description"
                control={validateControl}
                render={({ field: { value } }) => (
                  <Form.Input
                    fluid
                    label="Description"
                    placeholder="Description"
                    name="description"
                    value={value || ''}
                    onChange={async (e, { name, value }) => {
                      validateSetValue(name, value)
                    }}
                    error={validateErrors.description ? true : false}
                  />
                )}
              />
            )}
          </Form.Group>
          <Form.Group widths="equal">
            {showItemOption.unitMeasure && (
              <Controller
                name="unitMeasure"
                control={validateControl}
                render={({ field: { value } }) => (
                  <Form.Input
                    fluid
                    label="Unit Measure"
                    placeholder="Unit Measure"
                    name="unitMeasure"
                    value={value || ''}
                    onChange={async (e, { name, value }: any) => {
                      validateSetValue(name, value)
                    }}
                    error={validateErrors.unitMeasure ? true : false}
                  />
                )}
              />
            )}
            <Controller
              name="price"
              control={validateControl}
              render={({ field: { value } }) => (
                <Form.Input
                  fluid
                  label="Price"
                  placeholder="Price"
                  name="price"
                  type="number"
                  value={value || 0}
                  onChange={async (e, { name, value }: any) => {
                    validateSetValue(name, value)
                    validateSetValue(
                      'totalCost',
                      validateGetValues('quantity') * value
                    )
                  }}
                  error={validateErrors.price ? true : false}
                />
              )}
            />
            <Controller
              name="quantity"
              control={validateControl}
              render={({ field: { value } }) => (
                <Form.Input
                  fluid
                  label="Quantity"
                  placeholder="Quantity"
                  name="quantity"
                  type="number"
                  value={value || 0}
                  onChange={async (e, { name, value }: any) => {
                    validateSetValue(name, value)
                    validateSetValue(
                      'totalCost',
                      validateGetValues('price') * value
                    )
                  }}
                  error={validateErrors.quantity ? true : false}
                />
              )}
            />
            <Controller
              name="totalCost"
              control={validateControl}
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
                    validateSetValue(name, value)
                  }}
                  error={validateErrors.totalCost ? true : false}
                />
              )}
            />
          </Form.Group>
        </Segment>
        {error && (
          <Message
            header={error}
            icon="times"
            content="Server error"
            color="red"
          />
        )}
        <Button type="submit" color="blue">
          Save
        </Button>
        <Link href={`/requisition/items/${requisitionId}`}>
          <Button type="button">Back</Button>
        </Link>
      </Form>
    </>
  )
}
