// React
import React from 'react'
// Next
import Link from 'next/link'
// Providers
import { useTranslation } from 'next-i18next'
// Styles
import { Button, Form, Header, Icon, Label, Message } from 'semantic-ui-react'

type FormValues = {
  partNumber: string
  description: string
  unitMeasure: string
  unitPrice: number
}

export const ProductCreateComponent = ({
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
          {t('product')} <Header.Subheader>{t('create')}</Header.Subheader>
        </Header.Content>
      </Header>
      <Form onSubmit={validateHandleSubmit(createItem)}>
        <Form.Field>
          <label>{t('part_number')}</label>
          <input
            placeholder={t('part_number')}
            type="text"
            name="partNumber"
            {...validateRegister('partNumber')}
            value={formValues.partNumber}
            onChange={e => handleFormValues(e)}
          />
          {validateErrors.partNumber && (
            <Label pointing color="red">
              {validateErrors.partNumber.message}
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
        <Form.Field>
          <label>{t('unit_measure')}</label>
          <input
            placeholder={t('unit_measure')}
            type="text"
            name="unitMeasure"
            {...validateRegister('unitMeasure')}
            value={formValues.unitMeasure}
            onChange={e => handleFormValues(e)}
          />
          {validateErrors.unitMeasure && (
            <Label pointing color="red">
              {validateErrors.unitMeasure.message}
            </Label>
          )}
        </Form.Field>
        <Form.Field>
          <label>{t('price')}</label>
          <input
            placeholder={t('price')}
            type="number"
            name="unitPrice"
            {...validateRegister('unitPrice')}
            value={formValues.unitPrice}
            onChange={e => handleFormValues(e)}
          />
          {validateErrors.unitPrice && (
            <Label pointing color="red">
              {validateErrors.unitPrice.message}
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
        <Link href="/inventory/product">
          <Button type="button">{t('back_button')}</Button>
        </Link>
      </Form>
    </>
  )
}
