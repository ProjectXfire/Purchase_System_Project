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

export const ContractCreateComponent = ({
  validateHandleSubmit,
  validateSetValue,
  validateErrors,
  locationDropdown,
  typeDropdown,
  areaUnitDropdown,
  createItem,
  error
}: {
  validateHandleSubmit: any
  validateSetValue: any
  validateErrors: any
  locationDropdown: DropdownValues[]
  typeDropdown: DropdownValues[]
  areaUnitDropdown: DropdownValues[]
  createItem: (data: Record<string, unknown>) => void
  error: string
}): React.ReactElement => {
  return (
    <>
      <Header as="h2">
        <Icon name="suitcase" />
        <Header.Content>
          Contract <Header.Subheader>Create</Header.Subheader>
        </Header.Content>
      </Header>
      <Form onSubmit={validateHandleSubmit(createItem)}>
        <Form.Group widths="equal">
          <Form.Field>
            <Form.Input
              label="Contract"
              placeholder="Contract"
              type="text"
              name="name"
              onChange={async (e, { name, value }) => {
                validateSetValue(name, value)
              }}
            />
            {validateErrors.name && (
              <Label pointing color="red">
                {validateErrors.name.message}
              </Label>
            )}
          </Form.Field>
          <Form.Field>
            <Form.Input
              label="Contract description"
              placeholder="Contract description"
              type="text"
              name="description"
              onChange={async (e, { name, value }) => {
                validateSetValue(name, value)
              }}
            />
            {validateErrors.description && (
              <Label pointing color="red">
                {validateErrors.description.message}
              </Label>
            )}
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <Form.Select
              label="Area unit"
              name="areaUnit"
              placeholder="Select Area Unit"
              fluid
              search
              options={areaUnitDropdown}
              onChange={async (e, { name, value }) => {
                validateSetValue(name, value)
              }}
              error={validateErrors.areaUnit ? true : false}
            />
            {validateErrors.areaUnit && (
              <Label pointing color="red">
                {validateErrors.areaUnit.message}
              </Label>
            )}
          </Form.Field>
          <Form.Field>
            <Form.Input
              label="Area Unit description"
              placeholder="Area Unit description"
              type="text"
              name="areaUnitDescription"
              onChange={async (e, { name, value }) => {
                validateSetValue(name, value)
              }}
            />
            {validateErrors.areaUnitDescription && (
              <Label pointing color="red">
                {validateErrors.areaUnitDescription.message}
              </Label>
            )}
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <Form.Input
              label="Client Code"
              placeholder="Client Code"
              type="text"
              name="clientCode"
              onChange={async (e, { name, value }) => {
                validateSetValue(name, value)
              }}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <Form.Select
            label="Location"
            name="location"
            placeholder="Select location"
            fluid
            search
            options={locationDropdown}
            onChange={async (e, { name, value }) => {
              validateSetValue(name, value)
            }}
            error={validateErrors.location ? true : false}
          />
          {validateErrors.location && (
            <Label color="red">{validateErrors.location.message}</Label>
          )}
        </Form.Field>
        <Form.Field>
          <Form.Select
            label="Type"
            name="contractType"
            placeholder="Select type"
            fluid
            search
            options={typeDropdown}
            onChange={async (e, { name, value }) => {
              validateSetValue(name, value)
            }}
            error={validateErrors.contractType ? true : false}
          />
          {validateErrors.contractType && (
            <Label color="red">{validateErrors.contractType.message}</Label>
          )}
        </Form.Field>
        {error && (
          <Message header={error} icon="times" content="Error" color="red" />
        )}
        <Button type="submit" color="blue">
          Save
        </Button>
        <Button>
          <Link href="/contract">Back</Link>
        </Button>
      </Form>
    </>
  )
}
