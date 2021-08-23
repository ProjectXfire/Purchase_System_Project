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
  const { t } = useTranslation('common')
  return (
    <>
      <Header as="h2">
        <Icon name="suitcase" />
        <Header.Content>
          {t('contract')} <Header.Subheader>{t('create')}</Header.Subheader>
        </Header.Content>
      </Header>
      <Form onSubmit={validateHandleSubmit(createItem)}>
        <Form.Group widths="equal">
          <Form.Field>
            <Form.Input
              label={t('name')}
              placeholder={t('name')}
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
              label={t('description')}
              placeholder={t('description')}
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
              label={t('area_unit')}
              name="areaUnit"
              placeholder={t('area_unit')}
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
              label={t('description')}
              placeholder={t('description')}
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
              label={t('client_code')}
              placeholder={t('client_code')}
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
            label={t('location')}
            name="location"
            placeholder={t('select_location')}
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
            label={t('contract_type')}
            name="contractType"
            placeholder={t('select_contract_type')}
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
          {t('save_button')}
        </Button>
        <Link href="/contract">
          <Button type="button">{t('back_button')}</Button>
        </Link>
      </Form>
    </>
  )
}
