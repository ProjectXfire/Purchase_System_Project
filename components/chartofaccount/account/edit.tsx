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

export const AccountEditComponent = ({
  validateSetValue,
  validateErrors,
  validateHandleSubmit,
  validateControl,
  dropdownCostCode,
  dropdownCostType,
  dropdownBudget,
  updateItem,
  error
}: {
  validateSetValue: any
  validateErrors: any
  validateHandleSubmit: any
  validateControl: any
  dropdownCostCode: DropdownValues[]
  dropdownCostType: DropdownValues[]
  dropdownBudget: DropdownValues[]
  updateItem: (data: Record<string, unknown>) => void
  error: string
}): React.ReactElement => {
  return (
    <>
      <Header as="h2">
        <Icon name="suitcase" />
        <Header.Content>
          Account <Header.Subheader>Edit</Header.Subheader>
        </Header.Content>
      </Header>
      <Form onSubmit={validateHandleSubmit(updateItem)}>
        <Form.Field>
          <Controller
            name="costcode"
            control={validateControl}
            render={({ field: { value } }) => (
              <Form.Select
                label="Cost Code"
                name="costcode"
                placeholder="Select cost code"
                fluid
                search
                value={value}
                options={dropdownCostCode}
                onChange={async (e, { name, value }) => {
                  validateSetValue(name, value)
                }}
                error={validateErrors.costcode ? true : false}
              />
            )}
          />
        </Form.Field>
        <Form.Field>
          <Controller
            name="costtype"
            control={validateControl}
            render={({ field: { value } }) => (
              <Form.Select
                label="Cost Type"
                name="costtype"
                placeholder="Select cost type"
                fluid
                search
                value={value}
                options={dropdownCostType}
                onChange={async (e, { name, value }) => {
                  validateSetValue(name, value)
                }}
                error={validateErrors.costtype ? true : false}
              />
            )}
          />
        </Form.Field>
        <Form.Field>
          <Controller
            name="budget"
            control={validateControl}
            render={({ field: { value } }) => (
              <Form.Select
                label="Budget"
                name="budget"
                placeholder="Select budget"
                fluid
                search
                value={value}
                options={dropdownBudget}
                onChange={async (e, { name, value }) => {
                  validateSetValue(name, value)
                }}
                error={validateErrors.budget ? true : false}
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
        <Link href="/chartofaccount/account">
          <Button type="button">Back</Button>
        </Link>
      </Form>
    </>
  )
}
