import React, { useContext, useEffect, useState } from 'react'
// Next
import { useRouter } from 'next/router'
// Providers
import Cookies from 'js-cookie'
import { useForm, Controller } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
// Context
import { AppContext } from '@contextProvider/states'
// Utils
import { parseCookiesLocal } from '@utils/parseCookies'
// Schema
import { RequisitionModalSchema } from '@models/requisition/requisition.modal.schema'
// Styles
import { Modal, Button, Header, Form, Divider } from 'semantic-ui-react'
import {
  fillDropdownLocationsApprovers,
  fillDropdonwYears
} from '@utils/fillDropdown'

interface DropdownValues {
  key: number
  value: string
  text: string
}

export const ModalDropdownComponent = ({
  open,
  setOpen,
  headerMessage,
  textMessage,
  secondTextMessage,
  acceptButtonText,
  cancelButtonText,
  setVisible
}: {
  open: boolean
  setOpen: any
  headerMessage?: string
  textMessage?: string
  secondTextMessage?: string
  acceptButtonText?: string
  cancelButtonText?: string
  setVisible: any
}): React.ReactElement => {
  const router = useRouter()
  const [options, setOptions] = useState<DropdownValues[]>([])

  // SET SCHEMA TO VALIDATE FORM
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    control
  } = useForm({ resolver: joiResolver(RequisitionModalSchema) })

  const { dispatch }: any = useContext(AppContext)
  const getRequisitionsLocation = () => {
    dispatch({ type: 'SELECT_LOCATION', payload: getValues() })
    router.push({
      pathname: `/requisition/${getValues('location')}`,
      query: { year: getValues('year') }
    })
    setValue('location', '', { shouldValidate: false })
    setValue('year', new Date().getFullYear(), { shouldValidate: false })
    setOpen(false)
    setVisible(false)
  }

  useEffect(() => {
    try {
      const getLocations = parseCookiesLocal(Cookies.get('user'))
      setOptions(fillDropdownLocationsApprovers(getLocations))
    } catch (error: any) {
      console.log(error.message)
    }
    setValue('location', '', { shouldValidate: false })
    setValue('year', new Date().getFullYear(), { shouldValidate: false })
  }, [])

  return (
    <Modal
      size="mini"
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header size="tiny" icon="industry" content={headerMessage} />
      <Modal.Content>
        <Form onSubmit={handleSubmit(getRequisitionsLocation)}>
          <Form.Field>
            <Form.Select
              placeholder={textMessage}
              fluid
              search
              selection
              name="location"
              options={options}
              onChange={async (e, { name, value }) => {
                setValue(name, value)
              }}
              error={errors.location ? true : false}
            />
          </Form.Field>
          <Divider />
          <Form.Field>
            <Controller
              name="year"
              control={control}
              render={({ field: { value } }) => (
                <Form.Select
                  fluid
                  placeholder={secondTextMessage}
                  search
                  selection
                  name="year"
                  value={value}
                  options={fillDropdonwYears()}
                  onChange={async (e, { name, value }) => {
                    setValue(name, value)
                  }}
                  error={errors.year ? true : false}
                />
              )}
            />
          </Form.Field>
          <Button type="submit" color="green">
            {acceptButtonText}
          </Button>
          <Button type="button" color="red" onClick={() => setOpen(false)}>
            {cancelButtonText}
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  )
}
