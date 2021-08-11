// React
import React from 'react'
// Next
import Link from 'next/link'
// Styles
import { Button, Form, Header, Icon, Label, Message } from 'semantic-ui-react'

type FormValues = {
  partNumber: string
  description: string
  unitMeasure: string
  unitPrice: number
}

export const ProductCreateComponent = ({
  validateRegister,
  validateErrors,
  validateHandleSubmit,
  formValues,
  handleFormValues,
  createItem,
  error
}: {
  validateRegister: any
  validateErrors: any
  validateHandleSubmit: any
  formValues: FormValues
  handleFormValues: any
  createItem: () => void
  error: string
}): React.ReactElement => {
  return (
    <>
      <Header as="h2">
        <Icon name="suitcase" />
        <Header.Content>
          Product <Header.Subheader>Create</Header.Subheader>
        </Header.Content>
      </Header>
      <Form onSubmit={validateHandleSubmit(createItem)}>
        <Form.Field>
          <label>Part Number</label>
          <input
            placeholder="Product"
            type="text"
            name="partNumber"
            {...validateRegister('partNumber')}
            value={formValues.partNumber}
            onChange={e => handleFormValues(e)}
          />
          {validateErrors.partNumber && (
            <Label pointing color="red">
              {validateErrors.partNumber.message}
            </Label>
          )}
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <input
            placeholder="Product description"
            type="text"
            name="description"
            {...validateRegister('description')}
            value={formValues.description}
            onChange={e => handleFormValues(e)}
          />
          {validateErrors.description && (
            <Label pointing color="red">
              {validateErrors.description.message}
            </Label>
          )}
        </Form.Field>
        <Form.Field>
          <label>Measure</label>
          <input
            placeholder="Ex. kg"
            type="text"
            name="unitMeasure"
            {...validateRegister('unitMeasure')}
            value={formValues.unitMeasure}
            onChange={e => handleFormValues(e)}
          />
          {validateErrors.unitMeasure && (
            <Label pointing color="red">
              {validateErrors.unitMeasure.message}
            </Label>
          )}
        </Form.Field>
        <Form.Field>
          <label>Price</label>
          <input
            placeholder="Ex. kg"
            type="number"
            name="unitPrice"
            {...validateRegister('unitPrice')}
            value={formValues.unitPrice}
            onChange={e => handleFormValues(e)}
          />
          {validateErrors.unitPrice && (
            <Label pointing color="red">
              {validateErrors.unitPrice.message}
            </Label>
          )}
        </Form.Field>
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
        <Link href="/inventory/product">
          <Button type="button">Back</Button>
        </Link>
      </Form>
    </>
  )
}
