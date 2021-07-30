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

export const ExpenseSubledgerCreateComponent = ({
  validateHandleSubmit,
  validateSetValue,
  validateErrors,
  dropdownExpense,
  dropdownSubledger,
  createItem,
  error
}: {
  validateHandleSubmit: any
  validateSetValue: any
  validateErrors: any
  dropdownExpense: DropdownValues[]
  dropdownSubledger: DropdownValues[]
  createItem: (data: Record<string, unknown>) => void
  error: string
}): React.ReactElement => {
  return (
    <>
      <Header as="h2">
        <Icon name="suitcase" />
        <Header.Content>
          Expense - Subledger <Header.Subheader>Create</Header.Subheader>
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
            label="Subledger"
            name="subledger"
            placeholder="Select subledger"
            fluid
            search
            options={dropdownSubledger}
            onChange={async (e, { name, value }) => {
              validateSetValue(name, value)
            }}
            error={validateErrors.subledger ? true : false}
          />
          {validateErrors.subledger && (
            <Label color="red">{validateErrors.subledger.message}</Label>
          )}
        </Form.Field>
        {error && (
          <Message header={error} icon="times" content="Error" color="red" />
        )}
        <Button type="submit" color="blue">
          Save
        </Button>
        <Button>
          <Link href="/expense/expense-subledger">Back</Link>
        </Button>
      </Form>
    </>
  )
}
