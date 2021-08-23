// React
import React from 'react'
import { Controller } from 'react-hook-form'
// Next
import Link from 'next/link'
// Providers
import { useTranslation } from 'next-i18next'
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

export const RequisitionByLocationCreateComponent = ({
  validateSetValue,
  validateControl,
  validateErrors,
  validateHandleSubmit,
  user,
  locationId,
  locationName,
  selected,
  setSelected,
  fillDropdownAccountByContract,
  contractAccountDropdown,
  fillDropdownExpenseOptions,
  expenseAccountDropdown,
  expenseSubledgerDropdown,
  userStatusDropdown,
  prioritiesDropdown,
  requestorsDropdown,
  currenciesDropdown,
  shiptoDropdown,
  shipbyDropdown,
  expensesDropdown,
  contractsDropdown,
  approversDropdown,
  createItem,
  error
}: {
  validateSetValue: any
  validateControl: any
  validateErrors: any
  validateHandleSubmit: any
  user: string
  locationId: string
  locationName: string
  selected: Record<string, unknown>
  setSelected: any
  fillDropdownAccountByContract: (id: string) => void
  contractAccountDropdown: DropdownValues[]
  fillDropdownExpenseOptions: (id: string) => void
  expenseAccountDropdown: DropdownValues[]
  expenseSubledgerDropdown: DropdownValues[]
  userStatusDropdown: DropdownValues[]
  prioritiesDropdown: DropdownValues[]
  requestorsDropdown: DropdownValues[]
  currenciesDropdown: DropdownValues[]
  shiptoDropdown: DropdownValues[]
  shipbyDropdown: DropdownValues[]
  expensesDropdown: DropdownValues[]
  contractsDropdown: DropdownValues[]
  approversDropdown: DropdownValues[]
  createItem: () => void
  error: string
}): React.ReactElement => {
  const { t } = useTranslation('common')
  return (
    <>
      <Header as="h2">
        <Icon name="suitcase" />
        <Header.Content>
          {t('requisition')}
          <Header.Subheader>
            {t('create')} - {locationName}
          </Header.Subheader>
        </Header.Content>
      </Header>
      <Form onSubmit={validateHandleSubmit(createItem)}>
        <Segment>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label={t('created_by')}
              placeholder={t('created_by')}
              name="createdBy"
              readOnly={true}
              value={user || ''}
            />
            <Form.Input
              fluid
              label={t('description')}
              placeholder={t('description')}
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
              {t('contract')}
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
                      label={t('contract')}
                      options={contractsDropdown}
                      placeholder={t('select_contract')}
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
                      label={t('account')}
                      options={contractAccountDropdown}
                      placeholder={t('select_account')}
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
              {t('expense')}
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
                      label={t('expense')}
                      options={expensesDropdown}
                      placeholder={t('select_expense')}
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
                      label={t('costtype')}
                      options={expenseAccountDropdown}
                      placeholder={t('select_costtype')}
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
                      label={t('subledger')}
                      options={expenseSubledgerDropdown}
                      placeholder={t('select_subledger')}
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
          {t('priority')}
        </Label>
        <Segment>
          <Form.Group widths="equal">
            <Form.Select
              fluid
              search
              label={t('priority')}
              options={prioritiesDropdown}
              placeholder={t('select_priority')}
              name="priority"
              onChange={async (e, { name, value }) => {
                validateSetValue(name, value)
              }}
              error={validateErrors.priority ? true : false}
            />
            <Form.Input
              fluid
              label={t('justify')}
              placeholder={t('justify')}
              name="priorityJustification"
              onChange={async (e, { name, value }) => {
                validateSetValue(name, value)
              }}
              error={validateErrors.priorityJustification ? true : false}
            />
          </Form.Group>
        </Segment>
        <Label basic size="large" color="blue">
          {t('shipments')}
        </Label>
        <Segment>
          <Form.Group widths="equal">
            <Form.Select
              fluid
              search
              label={t('requestor')}
              options={requestorsDropdown}
              placeholder={t('select_requestor')}
              name="requestor"
              onChange={async (e, { name, value }) => {
                validateSetValue(name, value)
              }}
              error={validateErrors.requestor ? true : false}
            />
            <Form.Select
              fluid
              search
              label={t('currency')}
              options={currenciesDropdown}
              placeholder={t('select_currency')}
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
              label={t('shipto')}
              options={shiptoDropdown}
              placeholder={t('select_shipto')}
              name="shipTo"
              onChange={async (e, { name, value }) => {
                validateSetValue(name, value)
              }}
              error={validateErrors.shipTo ? true : false}
            />
            <Form.Select
              fluid
              search
              label={t('shipby')}
              options={shipbyDropdown}
              placeholder={t('select_shipby')}
              name="shipBy"
              onChange={async (e, { name, value }) => {
                validateSetValue(name, value)
              }}
              error={validateErrors.shipBy ? true : false}
            />
          </Form.Group>
        </Segment>
        <Label basic size="large" color="blue">
          {t('observations')}
        </Label>
        <Segment basic>
          <Form.Group widths="equal">
            <TextArea
              placeholder={t('observations_placeholder')}
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
                  label={t('user_status')}
                  disabled
                  options={userStatusDropdown}
                  placeholder={t('select_user_status')}
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
              label={t('date_required')}
              placeholder={t('date_required')}
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
          {t('approver')}
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
                  label={t('approver')}
                  options={approversDropdown}
                  placeholder={t('select_approver')}
                  name="approvedBy"
                  value={value}
                  onChange={async (e, { name, value }) => {
                    validateSetValue(name, value)
                  }}
                  error={validateErrors.approvedBy ? true : false}
                />
              )}
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
          {t('save_button')}
        </Button>
        <Link
          href={`/requisition/${locationId}?year=${new Date().getFullYear()}`}
        >
          <Button type="button">{t('back_button')}</Button>
        </Link>
      </Form>
    </>
  )
}
