import React, { useEffect } from 'react'
import { Form, Button, Dropdown, Label } from 'semantic-ui-react'
import { useForm, Controller } from 'react-hook-form'
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'

const DropdownSchema = Joi.object({
  gender: Joi.required().messages({
    'string.empty': 'The field "Name" must not be empty',
    'any.required': 'The field "Name" must not be empty'
  })
})

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' }
]

const Test = () => {
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    control
  } = useForm({ resolver: joiResolver(DropdownSchema) })
  const onSubmit = data => {
    console.log('Submit event')
    alert(JSON.stringify(data))
  }

  console.log(errors)

  useEffect(() => {
    setValue('gender', 'male', { shouldValidate: true })
  }, [])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="gender"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Form.Select
            label="Gender"
            name="gender"
            options={options}
            placeholder="Gender"
            search
            value={value}
            onChange={async (e, { name, value }) => {
              setValue(name, value)
            }}
            error={errors.gender ? true : false}
          />
        )}
      />

      {errors.gender && (
        <Label pointing color="red">
          {errors.gender.message}
        </Label>
      )}
      {/*<Dropdown
        {...register('gender')}
        placeholder="Select Gender"
        fluid
        error={errors.gender ? true : false}
        search
        selection
        options={options}
      />*/}
      <Button type="submit">Submit</Button>
    </Form>
  )
}

export default Test
