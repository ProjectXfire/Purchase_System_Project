// React
import React from 'react'
import { Controller } from 'react-hook-form'
// Next
import Link from 'next/link'
// Providers
import { useTranslation } from 'next-i18next'
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
  const { t } = useTranslation('common')
  return (
    <>
      <Header as="h2">
        <Icon name="suitcase" />
        <Header.Content>
          {t('account')} <Header.Subheader> {t('edit')}</Header.Subheader>
        </Header.Content>
      </Header>
      <Form onSubmit={validateHandleSubmit(updateItem)}>
        <Form.Field>
          <Controller
            name="costcode"
            control={validateControl}
            render={({ field: { value } }) => (
              <Form.Select
                label={t('costcode')}
                name="costcode"
                placeholder={t('select_costcode')}
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
                label={t('costtype')}
                name="costtype"
                placeholder={t('select_costtype')}
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
                label={t('budget')}
                name="budget"
                placeholder={t('select_budget')}
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
          {t('save_button')}
        </Button>
        <Link href="/chartofaccount/account">
          <Button type="button">{t('back_button')}</Button>
        </Link>
      </Form>
    </>
  )
}
