// React
import React from 'react'
import { Controller } from 'react-hook-form'
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
  Segment,
  TextArea
} from 'semantic-ui-react'

interface DropdownValues {
  key: number
  value: string
  text: string
}

export const RequisitionCreateComponent = ({
  validateSetValue,
  validateControl,
  validateErrors,
  validateHandleSubmit,
  user,
  fillDropdownByLocation,
  selected,
  setSelected,
  fillDropdownAccountByContract,
  contractAccountDropdown,
  fillDropdownExpenseOptions,
  expenseAccountDropdown,
  expenseSubledgerDropdown,
  userStatusDropdown,
  locationsDropdown,
  prioritiesDropdown,
  requestorsDropdown,
  currenciesDropdown,
  shiptoDropdown,
  shipbyDropdown,
  expensesDropdown,
  contractsDropdown,
  approversDropdown,
  approverStatusDropdown,
  createItem,
  error
}: {
  validateSetValue: any
  validateControl: any
  validateErrors: any
  validateHandleSubmit: any
  user: string
  fillDropdownByLocation: (id: string) => void
  selected: Record<string, unknown>
  setSelected: any
  fillDropdownAccountByContract: (id: string) => void
  contractAccountDropdown: DropdownValues[]
  fillDropdownExpenseOptions: (id: string) => void
  expenseAccountDropdown: DropdownValues[]
  expenseSubledgerDropdown: DropdownValues[]
  userStatusDropdown: DropdownValues[]
  locationsDropdown: DropdownValues[]
  prioritiesDropdown: DropdownValues[]
  requestorsDropdown: DropdownValues[]
  currenciesDropdown: DropdownValues[]
  shiptoDropdown: DropdownValues[]
  shipbyDropdown: DropdownValues[]
  expensesDropdown: DropdownValues[]
  contractsDropdown: DropdownValues[]
  approversDropdown: DropdownValues[]
  approverStatusDropdown: DropdownValues[]
  createItem: () => void
  error: string
}): React.ReactElement => {
  return (
    <>
      <Header as="h2">
        <Icon name="suitcase" />
        <Header.Content>
          Requisition <Header.Subheader>Create</Header.Subheader>
        </Header.Content>
      </Header>
      <Form onSubmit={validateHandleSubmit(createItem)}>
        <Segment>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Created by"
              placeholder="Create by"
              name="createdBy"
              readOnly={true}
              value={user || ''}
            />
            <Form.Select
              fluid
              search
              label="Locations"
              options={locationsDropdown}
              placeholder="Select location"
              name="location"
              onChange={async (e, { name, value }) => {
                validateSetValue(name, value)
                validateSetValue('contract', null)
                validateSetValue('account', null)
                validateSetValue('expense', null)
                validateSetValue('costtype', null)
                validateSetValue('subledger', null)
                fillDropdownByLocation(value as string)
                setSelected({ selectedContract: true, selectedExpense: true })
              }}
              error={validateErrors.location ? true : false}
            />
            <Form.Input
              fluid
              label="Description"
              placeholder="Req. description"
              name="description"
              onChange={async (e, { name, value }) => {
                validateSetValue(name, value)
              }}
              error={validateErrors.description ? true : false}
            />
          </Form.Group>
        </Segment>
        {contractsDropdown.length > 0 && selected.selectedContract && (
          <>
            <Label basic size="large" color="blue">
              Contract
            </Label>
            <Segment>
              <Form.Group widths="equal">
                <Controller
                  name="contract"
                  control={validateControl}
                  render={({ field: { value } }) => (
                    <Form.Select
                      fluid
                      search
                      label="Contract"
                      options={contractsDropdown}
                      placeholder="Select contract"
                      name="contract"
                      value={value}
                      onChange={async (e, { name, value }) => {
                        validateSetValue(name, value)
                        validateSetValue('account', null)
                        setSelected({ ...selected, selectedExpense: false })
                        fillDropdownAccountByContract(value as string)
                      }}
                      error={validateErrors.contract ? true : false}
                    />
                  )}
                />

                <Controller
                  name="account"
                  control={validateControl}
                  render={({ field: { value } }) => (
                    <Form.Select
                      fluid
                      search
                      label="Account"
                      options={contractAccountDropdown}
                      placeholder="Select account"
                      name="account"
                      value={value}
                      onChange={async (e, { name, value }) => {
                        validateSetValue(name, value)
                      }}
                      error={validateErrors.account ? true : false}
                    />
                  )}
                />
              </Form.Group>
            </Segment>
          </>
        )}
        {expensesDropdown.length > 0 && selected.selectedExpense && (
          <>
            <Label basic size="large" color="blue">
              Expense
            </Label>
            <Segment>
              <Form.Group widths="equal">
                <Controller
                  name="expense"
                  control={validateControl}
                  render={({ field: { value } }) => (
                    <Form.Select
                      fluid
                      search
                      label="Expense"
                      options={expensesDropdown}
                      placeholder="Select expense"
                      name="expense"
                      value={value}
                      onChange={async (e, { name, value }) => {
                        validateSetValue(name, value)
                        validateSetValue('costtype', null)
                        validateSetValue('subledger', null)
                        setSelected({ ...selected, selectedContract: false })
                        fillDropdownExpenseOptions(value as string)
                      }}
                      error={validateErrors.expense ? true : false}
                    />
                  )}
                />
                <Controller
                  name="costtype"
                  control={validateControl}
                  render={({ field: { value } }) => (
                    <Form.Select
                      fluid
                      search
                      label="Account"
                      options={expenseAccountDropdown}
                      placeholder="Select account"
                      name="costtype"
                      value={value}
                      onChange={async (e, { name, value }) => {
                        validateSetValue(name, value)
                        setSelected({ ...selected, selectedContract: false })
                      }}
                      error={validateErrors.costtype ? true : false}
                    />
                  )}
                />
                <Controller
                  name="subledger"
                  control={validateControl}
                  render={({ field: { value } }) => (
                    <Form.Select
                      fluid
                      search
                      clearable
                      label="Subledger"
                      options={expenseSubledgerDropdown}
                      placeholder="Select subledger"
                      name="subledger"
                      value={value}
                      onChange={async (e, { name, value }) => {
                        validateSetValue(name, value === '' ? null : value)
                        setSelected({ ...selected, selectedContract: false })
                      }}
                    />
                  )}
                />
              </Form.Group>
            </Segment>
          </>
        )}
        <Label basic size="large" color="blue">
          Priority
        </Label>
        <Segment>
          <Form.Group widths="equal">
            <Form.Select
              fluid
              search
              label="Priority"
              options={prioritiesDropdown}
              placeholder="Select priority"
              name="priority"
              onChange={async (e, { name, value }) => {
                validateSetValue(name, value)
              }}
              error={validateErrors.priority ? true : false}
            />
            <Form.Input
              fluid
              label="Justification"
              placeholder="Justify the priority"
              name="priorityJustification"
              onChange={async (e, { name, value }) => {
                validateSetValue(name, value)
              }}
              error={validateErrors.priorityJustification ? true : false}
            />
          </Form.Group>
        </Segment>
        <Label basic size="large" color="blue">
          Shipments
        </Label>
        <Segment>
          <Form.Group widths="equal">
            <Form.Select
              fluid
              search
              label="Requestor"
              options={requestorsDropdown}
              placeholder="Select requestor"
              name="requestor"
              onChange={async (e, { name, value }) => {
                validateSetValue(name, value)
              }}
              error={validateErrors.requestor ? true : false}
            />
            <Form.Select
              fluid
              search
              label="Currency"
              options={currenciesDropdown}
              placeholder="Select currency"
              name="currency"
              onChange={async (e, { name, value }) => {
                validateSetValue(name, value)
              }}
              error={validateErrors.currency ? true : false}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Select
              fluid
              search
              label="Ship to"
              options={shiptoDropdown}
              placeholder="Select ship to"
              name="shipTo"
              onChange={async (e, { name, value }) => {
                validateSetValue(name, value)
              }}
              error={validateErrors.shipTo ? true : false}
            />
            <Form.Select
              fluid
              search
              label="Ship by"
              options={shipbyDropdown}
              placeholder="Select ship by"
              name="shipBy"
              onChange={async (e, { name, value }) => {
                validateSetValue(name, value)
              }}
              error={validateErrors.shipBy ? true : false}
            />
          </Form.Group>
        </Segment>
        <Label basic size="large" color="blue">
          Observations
        </Label>
        <Segment basic>
          <Form.Group widths="equal">
            <TextArea
              placeholder="Any observation to the requisition"
              name="observation"
              onChange={async (e, { name, value }) => {
                validateSetValue(name, value)
              }}
            />
          </Form.Group>
        </Segment>
        <Label basic size="large" color="blue">
          Status
        </Label>
        <Segment>
          <Form.Group widths="equal">
            <Controller
              name="createdByStatus"
              control={validateControl}
              render={({ field: { value } }) => (
                <Form.Select
                  fluid
                  search
                  label="User Status"
                  disabled
                  options={userStatusDropdown}
                  placeholder="Select status"
                  name="createdByStatus"
                  value={value}
                  onChange={async (e, { name, value }) => {
                    validateSetValue(name, value)
                  }}
                  error={validateErrors.createdByStatus ? true : false}
                />
              )}
            />
            <Form.Input
              fluid
              label="Date required"
              placeholder="Date required"
              name="dateRequired"
              type="date"
              onChange={async (e, { name, value }) => {
                validateSetValue(name, value)
              }}
              error={validateErrors.dateRequired ? true : false}
            />
          </Form.Group>
        </Segment>
        <Label basic size="large" color="blue">
          Approver
        </Label>
        <Segment>
          <Form.Group widths="equal">
            <Controller
              name="approvedBy"
              control={validateControl}
              render={({ field: { value } }) => (
                <Form.Select
                  fluid
                  search
                  label="Approver"
                  options={approversDropdown}
                  placeholder="Select approver"
                  name="approvedBy"
                  value={value}
                  onChange={async (e, { name, value }) => {
                    validateSetValue(name, value)
                  }}
                  error={validateErrors.approvedBy ? true : false}
                />
              )}
            />
            <Controller
              name="approvedByStatus"
              control={validateControl}
              render={({ field: { value } }) => (
                <Form.Select
                  fluid
                  search
                  clearable
                  label="Approval status"
                  options={approverStatusDropdown}
                  placeholder="Select status"
                  name="approvedByStatus"
                  value={value}
                  disabled
                  onChange={async (e, { name, value }) => {
                    validateSetValue(name, value)
                  }}
                  error={validateErrors.approvedByStatus ? true : false}
                />
              )}
            />
            <Form.Input
              fluid
              label="Approval date"
              placeholder="Approval date"
              name="approvedByDate"
              type="date"
              disabled
              onChange={async (e, { name, value }) => {
                validateSetValue(name, value)
              }}
              error={validateErrors.approvedByDate ? true : false}
            />
          </Form.Group>
        </Segment>
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
        <Link href="/requisition">
          <Button type="button">Back</Button>
        </Link>
      </Form>
    </>
  )
}
