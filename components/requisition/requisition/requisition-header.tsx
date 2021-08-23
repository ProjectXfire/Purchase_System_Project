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

export const HeaderRequisitionFormComponent = ({
  validateSetValue,
  validateControl,
  validateErrors,
  validateHandleSubmit,
  locationId,
  year,
  fillDropdownApproversByLocation,
  fillDropdownContractsByLocation,
  fillDropdownExpensesByLocation,
  selected,
  setSelected,
  fillDropdownAccountsByContract,
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
  changeUserStatus,
  error
}: {
  validateSetValue: any
  validateControl: any
  validateErrors: any
  validateHandleSubmit: any
  locationId: string
  year: number
  fillDropdownApproversByLocation: (id: string) => void
  fillDropdownContractsByLocation: (id: string) => void
  fillDropdownExpensesByLocation: (id: string) => void
  selected: Record<string, unknown>
  setSelected: any
  fillDropdownAccountsByContract: (id: string) => void
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
  changeUserStatus: () => void
  error: string
}): React.ReactElement => {
  const { t } = useTranslation('common')
  return (
    <>
      <Header as="h2">
        <Icon name="suitcase" />
        <Header.Content>
          {t('requisition')} <Header.Subheader>{t('items')}</Header.Subheader>
        </Header.Content>
      </Header>
      <Form onSubmit={validateHandleSubmit(changeUserStatus)}>
        <Segment>
          <Form.Group widths="equal">
            <Controller
              name="createdBy"
              control={validateControl}
              render={({ field: { value } }) => (
                <Form.Input
                  fluid
                  label={t('created_by')}
                  placeholder={t('created_by')}
                  name="createdBy"
                  readOnly={true}
                  value={value || ''}
                />
              )}
            />
            <Controller
              name="location"
              control={validateControl}
              render={({ field: { value } }) => (
                <Form.Select
                  fluid
                  search
                  label={t('location')}
                  options={locationsDropdown}
                  placeholder={t('select_location')}
                  name="location"
                  value={value}
                  disabled
                  onChange={async (e, { name, value }) => {
                    validateSetValue(name, value)
                    validateSetValue('contract', null)
                    validateSetValue('account', null)
                    validateSetValue('expense', null)
                    validateSetValue('costtype', null)
                    validateSetValue('subledger', null)
                    validateSetValue('approvedBy', null)
                    fillDropdownApproversByLocation(value as string)
                    fillDropdownContractsByLocation(value as string)
                    fillDropdownExpensesByLocation(value as string)
                    setSelected({
                      selectedContract: true,
                      selectedExpense: true
                    })
                  }}
                  error={validateErrors.location ? true : false}
                />
              )}
            />
            <Controller
              name="description"
              control={validateControl}
              render={({ field: { value } }) => (
                <Form.Input
                  fluid
                  label={t('description')}
                  placeholder={t('description')}
                  name="description"
                  value={value || ''}
                  onChange={async (e, { name, value }) => {
                    validateSetValue(name, value)
                  }}
                  error={validateErrors.description ? true : false}
                />
              )}
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
                        fillDropdownAccountsByContract(value as string)
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
            <Controller
              name="priority"
              control={validateControl}
              render={({ field: { value } }) => (
                <Form.Select
                  fluid
                  search
                  label={t('priority')}
                  options={prioritiesDropdown}
                  placeholder={t('select_priority')}
                  name="priority"
                  value={value}
                  onChange={async (e, { name, value }) => {
                    validateSetValue(name, value)
                  }}
                  error={validateErrors.priority ? true : false}
                />
              )}
            />
            <Controller
              name="priorityJustification"
              control={validateControl}
              render={({ field: { value } }) => (
                <Form.Input
                  fluid
                  label={t('justify')}
                  placeholder="Justify the priority"
                  name="priorityJustification"
                  value={value || ''}
                  onChange={async (e, { name, value }) => {
                    validateSetValue(name, value)
                  }}
                  error={validateErrors.priorityJustification ? true : false}
                />
              )}
            />
          </Form.Group>
        </Segment>
        <Label basic size="large" color="blue">
          {t('shipments')}
        </Label>
        <Segment>
          <Form.Group widths="equal">
            <Controller
              name="requestor"
              control={validateControl}
              render={({ field: { value } }) => (
                <Form.Select
                  fluid
                  search
                  label={t('requestor')}
                  options={requestorsDropdown}
                  placeholder={t('select_requestor')}
                  name="requestor"
                  value={value}
                  onChange={async (e, { name, value }) => {
                    validateSetValue(name, value)
                  }}
                  error={validateErrors.requestor ? true : false}
                />
              )}
            />
            <Controller
              name="currency"
              control={validateControl}
              render={({ field: { value } }) => (
                <Form.Select
                  fluid
                  search
                  label={t('currency')}
                  options={currenciesDropdown}
                  placeholder={t('select_currency')}
                  name="currency"
                  value={value}
                  onChange={async (e, { name, value }) => {
                    validateSetValue(name, value)
                  }}
                  error={validateErrors.currency ? true : false}
                />
              )}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Controller
              name="shipTo"
              control={validateControl}
              render={({ field: { value } }) => (
                <Form.Select
                  fluid
                  search
                  label={t('shipto')}
                  options={shiptoDropdown}
                  placeholder={t('select_shipto')}
                  name="shipTo"
                  value={value}
                  onChange={async (e, { name, value }) => {
                    validateSetValue(name, value)
                  }}
                  error={validateErrors.shipTo ? true : false}
                />
              )}
            />
            <Controller
              name="shipBy"
              control={validateControl}
              render={({ field: { value } }) => (
                <Form.Select
                  fluid
                  search
                  label={t('shipby')}
                  options={shipbyDropdown}
                  placeholder={t('select_shipby')}
                  name="shipBy"
                  value={value}
                  onChange={async (e, { name, value }) => {
                    validateSetValue(name, value)
                  }}
                  error={validateErrors.shipBy ? true : false}
                />
              )}
            />
          </Form.Group>
        </Segment>
        <Label basic size="large" color="blue">
          {t('observations')}
        </Label>
        <Segment basic>
          <Form.Group widths="equal">
            <Controller
              name="observation"
              control={validateControl}
              render={({ field: { value } }) => (
                <TextArea
                  placeholder={t('observations_placeholder')}
                  name="observation"
                  value={value}
                  onChange={async (e, { name, value }) => {
                    validateSetValue(name, value)
                  }}
                />
              )}
            />
          </Form.Group>
        </Segment>
        <Label basic size="large" color="blue">
          {t('user_status')}
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
            <Controller
              name="dateRequired"
              control={validateControl}
              render={({ field: { value } }) => (
                <Form.Input
                  fluid
                  label={t('date_required')}
                  placeholder={t('date_required')}
                  name="dateRequired"
                  type="date"
                  value={value || ''}
                  onChange={async (e, { name, value }) => {
                    validateSetValue(name, value)
                  }}
                  error={validateErrors.dateRequired ? true : false}
                />
              )}
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
        <Link href={`/requisition/${locationId}?year=${year}`}>
          <Button type="button">{t('back_button')}</Button>
        </Link>
      </Form>
    </>
  )
}
