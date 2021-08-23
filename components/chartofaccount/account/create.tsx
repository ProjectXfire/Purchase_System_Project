// React
import React from 'react'
// Next
import Link from 'next/link'
// Providers
import { useTranslation } from 'next-i18next'
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
  const { t } = useTranslation('common')
  return (
    <>
      <Header as="h2">
        <Icon name="suitcase" />
        <Header.Content>
          {t('account')} <Header.Subheader>{t('create')}</Header.Subheader>
        </Header.Content>
      </Header>
      <Form onSubmit={validateHandleSubmit(createItem)}>
        <Form.Field>
          <Form.Select
            label={t('costcode')}
            name="costcode"
            placeholder={t('select_costcode')}
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
            label={t('costtype')}
            name="costtype"
            placeholder={t('select_costtype')}
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
            label={t('budget')}
            name="budget"
            placeholder={t('select_budget')}
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
          {t('save_button')}
        </Button>
        <Link href="/chartofaccount/account">
          <Button type="button">{t('back_button')}</Button>
        </Link>
      </Form>
    </>
  )
}
