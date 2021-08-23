// React
import React from 'react'
// Next
import Link from 'next/link'
// Providers
import { useTranslation } from 'next-i18next'
// Styles
import { Button, Form, Header, Icon, Label, Message } from 'semantic-ui-react'

type FormValues = {
  name: string
  description: string
}

export const PriorityCreateComponent = ({
  validateRegister,
  validateErrors,
  validateHandleSubmit,
  formValues,
  handleFormValues,
  createItem,
  error
}: {
  validateRegister: any
  validateErrors: any
  validateHandleSubmit: any
  formValues: FormValues
  handleFormValues: any
  createItem: () => void
  error: string
}): React.ReactElement => {
  const { t } = useTranslation('common')
  return (
    <>
      <Header as="h2">
        <Icon name="suitcase" />
        <Header.Content>
          {t('priority')} <Header.Subheader>{t('create')}</Header.Subheader>
        </Header.Content>
      </Header>
      <Form onSubmit={validateHandleSubmit(createItem)}>
        <Form.Field>
          <label>{t('name')}</label>
          <input
            placeholder={t('name')}
            type="text"
            name="name"
            {...validateRegister('name')}
            value={formValues.name}
            onChange={e => handleFormValues(e)}
          />
          {validateErrors.name && (
            <Label pointing color="red">
              {validateErrors.name.message}
            </Label>
          )}
        </Form.Field>
        <Form.Field>
          <label>{t('description')}</label>
          <input
            placeholder={t('description')}
            type="text"
            name="description"
            {...validateRegister('description')}
            value={formValues.description}
            onChange={e => handleFormValues(e)}
          />
          {validateErrors.description && (
            <Label pointing color="red">
              {validateErrors.description.message}
            </Label>
          )}
        </Form.Field>
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
        <Link href="/requisition/priority">
          <Button type="button">{t('back_button')}</Button>
        </Link>
      </Form>
    </>
  )
}
