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

export const ExpenseLocationCreateComponent = ({
  validateHandleSubmit,
  validateSetValue,
  validateErrors,
  dropdownExpense,
  dropdownLocation,
  createItem,
  error
}: {
  validateHandleSubmit: any
  validateSetValue: any
  validateErrors: any
  dropdownExpense: DropdownValues[]
  dropdownLocation: DropdownValues[]
  createItem: (data: Record<string, unknown>) => void
  error: string
}): React.ReactElement => {
  return (
    <>
      <Header as="h2">
        <Icon name="suitcase" />
        <Header.Content>
          Expense - Location <Header.Subheader>Create</Header.Subheader>
        </Header.Content>
      </Header>
      <Form onSubmit={validateHandleSubmit(createItem)}>
        <Form.Field>
          <Form.Select
            label="Expense"
            name="expense"
            placeholder="Select expense"
            fluid
            search
            options={dropdownExpense}
            onChange={async (e, { name, value }) => {
              validateSetValue(name, value)
            }}
            error={validateErrors.expense ? true : false}
          />
          {validateErrors.expense && (
            <Label color="red">{validateErrors.expense.message}</Label>
          )}
        </Form.Field>
        <Form.Field>
          <Form.Select
            label="Location"
            name="location"
            placeholder="Select location"
            fluid
            search
            options={dropdownLocation}
            onChange={async (e, { name, value }) => {
              validateSetValue(name, value)
            }}
            error={validateErrors.location ? true : false}
          />
          {validateErrors.location && (
            <Label color="red">{validateErrors.location.message}</Label>
          )}
        </Form.Field>
        {error && (
          <Message header={error} icon="times" content="Error" color="red" />
        )}
        <Button type="submit" color="blue">
          Save
        </Button>
        <Button>
          <Link href="/expense/expense-location">Back</Link>
        </Button>
      </Form>
    </>
  )
}
