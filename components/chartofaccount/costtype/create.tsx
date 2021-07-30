// React
import React from 'react'
// Next
import Link from 'next/link'
// Styles
import {
  Button,
  Form,
  Header,
  Icon,
  Label,
  Message,
  Checkbox
} from 'semantic-ui-react'

type FormValues = {
  name: string
  description: string
  isExpense: boolean
}

export const CostTypeCreateComponent = ({
  validateRegister,
  validateErrors,
  validateHandleSubmit,
  formValues,
  handleFormValues,
  setFormValues,
  createItem,
  error
}: {
  validateRegister: any
  validateErrors: any
  validateHandleSubmit: any
  formValues: FormValues
  handleFormValues: any
  setFormValues: any
  createItem: () => void
  error: string
}): React.ReactElement => {
  return (
    <>
      <Header as="h2">
        <Icon name="suitcase" />
        <Header.Content>
          Cost Type <Header.Subheader>Create</Header.Subheader>
        </Header.Content>
      </Header>
      <Form onSubmit={validateHandleSubmit(createItem)}>
        <Form.Field>
          <label>Name</label>
          <input
            placeholder="Cost Type"
            type="text"
            name="name"
            {...validateRegister('name')}
            value={formValues.name}
            onChange={e => handleFormValues(e)}
          />
          {validateErrors.name && (
            <Label pointing color="red">
              {validateErrors.name.message}
            </Label>
          )}
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <input
            placeholder="Cost Type description"
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
          <Checkbox
            label="is expense?"
            checked={formValues.isExpense}
            onClick={() =>
              setFormValues({ ...formValues, isExpense: !formValues.isExpense })
            }
          />
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
        <Button>
          <Link href="/chartofaccount/costtype">Back</Link>
        </Button>
      </Form>
    </>
  )
}
