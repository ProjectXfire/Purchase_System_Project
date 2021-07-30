// React
import React from 'react'
// Next
import Link from 'next/link'
// Styles
import { Button, Form, Header, Icon, Label, Message } from 'semantic-ui-react'

type FormValues = {
  name: string
  description: string
}

export const ContractTypeEditComponent = ({
  validateRegister,
  validateErrors,
  validateHandleSubmit,
  formValues,
  handleFormValues,
  editItem,
  error
}: {
  validateRegister: any
  validateErrors: any
  validateHandleSubmit: any
  formValues: FormValues
  handleFormValues: any
  editItem: () => void
  error: string
}): React.ReactElement => {
  return (
    <>
      <Header as="h2">
        <Icon name="suitcase" />
        <Header.Content>
          Contract Type <Header.Subheader>Edit</Header.Subheader>
        </Header.Content>
      </Header>
      <Form onSubmit={validateHandleSubmit(editItem)}>
        <Form.Field>
          <label>Name</label>
          <input
            placeholder="Type"
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
            placeholder="Type description"
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
          <Link href="/contract/type">Back</Link>
        </Button>
      </Form>
    </>
  )
}