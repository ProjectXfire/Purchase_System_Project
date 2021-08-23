// React
import React from 'react'
import { Controller } from 'react-hook-form'
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

export const ContractEditComponent = ({
  validateHandleSubmit,
  validateSetValue,
  validateErrors,
  validateControl,
  locationDropdown,
  typeDropdown,
  areaUnitDropdown,
  editItem,
  error
}: {
  validateHandleSubmit: any
  validateSetValue: any
  validateErrors: any
  validateControl: any
  locationDropdown: DropdownValues[]
  typeDropdown: DropdownValues[]
  areaUnitDropdown: DropdownValues[]
  editItem: (data: Record<string, unknown>) => void
  error: string
}): React.ReactElement => {
  const { t } = useTranslation('common')
  return (
    <>
      <Header as="h2">
        <Icon name="suitcase" />
        <Header.Content>
          {t('contract')} <Header.Subheader>{t('edit')}</Header.Subheader>
        </Header.Content>
      </Header>
      <Form onSubmit={validateHandleSubmit(editItem)}>
        <Form.Group widths="equal">
          <Form.Field>
            <Controller
              name="name"
              control={validateControl}
              render={({ field: { value } }) => (
                <>
                  <Form.Input
                    label={t('name')}
                    placeholder={t('name')}
                    type="text"
                    name="name"
                    value={value || ''}
                    onChange={async (e, { name, value }) => {
                      validateSetValue(name, value)
                    }}
                  />
                  {validateErrors.name && (
                    <Label pointing color="red">
                      {validateErrors.name.message}
                    </Label>
                  )}
                </>
              )}
            />
          </Form.Field>
          <Form.Field>
            <Controller
              name="description"
              control={validateControl}
              render={({ field: { value } }) => (
                <>
                  <Form.Input
                    label={t('description')}
                    placeholder={t('description')}
                    type="text"
                    name="description"
                    value={value || ''}
                    onChange={async (e, { name, value }) => {
                      validateSetValue(name, value)
                    }}
                  />
                  {validateErrors.description && (
                    <Label pointing color="red">
                      {validateErrors.description.message}
                    </Label>
                  )}
                </>
              )}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <Controller
              name="areaUnit"
              control={validateControl}
              render={({ field: { value } }) => (
                <>
                  <Form.Select
                    label={t('area_unit')}
                    name="areaUnit"
                    placeholder={t('select_area_unit')}
                    fluid
                    search
                    value={value}
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
                </>
              )}
            />
          </Form.Field>
          <Form.Field>
            <Controller
              name="areaUnitDescription"
              control={validateControl}
              render={({ field: { value } }) => (
                <>
                  <Form.Input
                    label={t('description')}
                    placeholder={t('description')}
                    type="text"
                    name="areaUnitDescription"
                    value={value || ''}
                    onChange={async (e, { name, value }) => {
                      validateSetValue(name, value)
                    }}
                  />
                  {validateErrors.areaUnitDescription && (
                    <Label pointing color="red">
                      {validateErrors.areaUnitDescription.message}
                    </Label>
                  )}
                </>
              )}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <Controller
              name="clientCode"
              control={validateControl}
              render={({ field: { value } }) => (
                <>
                  <Form.Input
                    label={t('client_code')}
                    placeholder={t('client_code')}
                    type="text"
                    name="clientCode"
                    value={value || ''}
                    onChange={async (e, { name, value }) => {
                      validateSetValue(name, value)
                    }}
                  />
                  {validateErrors.clientCode && (
                    <Label pointing color="red">
                      {validateErrors.clientCode.message}
                    </Label>
                  )}
                </>
              )}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <Controller
            name="location"
            control={validateControl}
            render={({ field: { value } }) => (
              <Form.Select
                label={t('location')}
                name="location"
                placeholder={t('select_location')}
                fluid
                search
                value={value}
                options={locationDropdown}
                onChange={async (e, { name, value }) => {
                  validateSetValue(name, value)
                }}
                error={validateErrors.location ? true : false}
              />
            )}
          />
        </Form.Field>
        <Form.Field>
          <Controller
            name="contractType"
            control={validateControl}
            render={({ field: { value } }) => (
              <Form.Select
                label={t('contract_type')}
                name="contractType"
                placeholder={t('select_contract_type')}
                fluid
                search
                value={value}
                options={typeDropdown}
                onChange={async (e, { name, value }) => {
                  validateSetValue(name, value)
                }}
                error={validateErrors.contractType ? true : false}
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
        <Link href="/contract">
          <Button type="button">{t('back_button')}</Button>
        </Link>
      </Form>
    </>
  )
}
