// React
import React from 'react'
import { Controller } from 'react-hook-form'
// Next
import Link from 'next/link'
// Styles
import { Button, Header, Icon, Form, Message } from 'semantic-ui-react'

interface DropdownValues {
  key: number
  value: string
  text: string
}

export const ExpenseLocationEditComponent = ({
  validateSetValue,
  validateHandleSubmit,
  validateErrors,
  validateControl,
  dropdownExpense,
  dropdownLocation,
  editItem,
  error
}: {
  validateSetValue: any
  validateHandleSubmit: any
  validateErrors: any
  validateControl: any
  dropdownExpense: DropdownValues[]
  dropdownLocation: DropdownValues[]
  editItem: (data: Record<string, unknown>) => void
  error: string
}): React.ReactElement => {
  return (
    <>
      <Header as="h2">
        <Icon name="suitcase" />
        <Header.Content>
          Expense - Location
          <Header.Subheader>Edit</Header.Subheader>
        </Header.Content>
      </Header>
      <Form onSubmit={validateHandleSubmit(editItem)}>
        <Form.Field>
          <Controller
            name="expense"
            control={validateControl}
            render={({ field: { value } }) => (
              <Form.Select
                label="Expense"
                name="expense"
                placeholder="Select expense"
                fluid
                search
                value={value}
                options={dropdownExpense}
                onChange={async (e, { name, value }) => {
                  validateSetValue(name, value)
                }}
                error={validateErrors.expense ? true : false}
              />
            )}
          />
        </Form.Field>
        <Form.Field>
          <Controller
            name="location"
            control={validateControl}
            render={({ field: { value } }) => (
              <Form.Select
                label="Location"
                name="location"
                placeholder="Select location"
                fluid
                search
                value={value}
                options={dropdownLocation}
                onChange={async (e, { name, value }) => {
                  validateSetValue(name, value)
                }}
                error={validateErrors.location ? true : false}
              />
            )}
          />
        </Form.Field>
        {error && (
          <Message header={error} icon="times" content="Error" color="red" />
        )}
        <Button type="submit" color="blue">
          Save
        </Button>
        <Button type="submit">
          <Link href="/expense/expense-location">Back</Link>
        </Button>
      </Form>
    </>
  )
}
