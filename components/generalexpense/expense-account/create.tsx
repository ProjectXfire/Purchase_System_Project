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

export const ExpenseAccountCreateComponent = ({
  validateHandleSubmit,
  validateSetValue,
  validateErrors,
  dropdownExpense,
  dropdownAccount,
  createItem,
  error
}: {
  validateHandleSubmit: any
  validateSetValue: any
  validateErrors: any
  dropdownExpense: DropdownValues[]
  dropdownAccount: DropdownValues[]
  createItem: (data: Record<string, unknown>) => void
  error: string
}): React.ReactElement => {
  return (
    <>
      <Header as="h2">
        <Icon name="suitcase" />
        <Header.Content>
          Expense - Account<Header.Subheader>Create</Header.Subheader>
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
            label="Cost Type"
            name="costtype"
            placeholder="Select cost type"
            fluid
            search
            options={dropdownAccount}
            onChange={async (e, { name, value }) => {
              validateSetValue(name, value)
            }}
            error={validateErrors.costtype ? true : false}
          />
          {validateErrors.costtype && (
            <Label color="red">{validateErrors.costtype.message}</Label>
          )}
        </Form.Field>
        {error && (
          <Message header={error} icon="times" content="Error" color="red" />
        )}
        <Button type="submit" color="blue">
          Save
        </Button>
        <Button>
          <Link href="/expense/expense-account">Back</Link>
        </Button>
      </Form>
    </>
  )
}
