// React
import React from 'react'
// Next
import Link from 'next/link'
// Styles
import { Button, Header, Icon, Form, Message, Label } from 'semantic-ui-react'

interface DropdownValues {
  key: number
  value: string
  text: string
}

export const AccountCreateComponent = ({
  validateHandleSubmit,
  validateSetValue,
  validateErrors,
  dropdownCostCode,
  dropdownCostType,
  dropdownBudget,
  createItem,
  error
}: {
  validateHandleSubmit: any
  validateSetValue: any
  validateErrors: any
  dropdownCostCode: DropdownValues[]
  dropdownCostType: DropdownValues[]
  dropdownBudget: DropdownValues[]
  createItem: (data: Record<string, unknown>) => void
  error: string
}): React.ReactElement => {
  return (
    <>
      <Header as="h2">
        <Icon name="suitcase" />
        <Header.Content>
          Account <Header.Subheader>Create</Header.Subheader>
        </Header.Content>
      </Header>
      <Form onSubmit={validateHandleSubmit(createItem)}>
        <Form.Field>
          <Form.Select
            label="Cost Code"
            name="costcode"
            placeholder="Select cost code"
            fluid
            search
            options={dropdownCostCode}
            onChange={async (e, { name, value }) => {
              validateSetValue(name, value)
            }}
            error={validateErrors.costcode ? true : false}
          />
          {validateErrors.costcode && (
            <Label color="red">{validateErrors.costcode.message}</Label>
          )}
        </Form.Field>
        <Form.Field>
          <Form.Select
            label="Cost Type"
            name="costtype"
            placeholder="Select cost type"
            fluid
            search
            options={dropdownCostType}
            onChange={async (e, { name, value }) => {
              validateSetValue(name, value)
            }}
            error={validateErrors.costtype ? true : false}
          />
          {validateErrors.costtype && (
            <Label color="red">{validateErrors.costtype.message}</Label>
          )}
        </Form.Field>
        <Form.Field>
          <Form.Select
            label="Budget"
            name="budget"
            placeholder="Select budget"
            fluid
            search
            options={dropdownBudget}
            onChange={async (e, { name, value }) => {
              validateSetValue(name, value)
            }}
            error={validateErrors.budget ? true : false}
          />
          {validateErrors.budget && (
            <Label color="red">{validateErrors.budget.message}</Label>
          )}
        </Form.Field>
        {error && (
          <Message header={error} icon="times" content="Error" color="red" />
        )}
        <Button type="submit" color="blue">
          Save
        </Button>
        <Button>
          <Link href="/chartofaccount/account">Back</Link>
        </Button>
      </Form>
    </>
  )
}
