import React, { ReactElement } from 'react'
// Styles
import {
  Form,
  Grid,
  Header,
  Segment,
  Icon,
  Label,
  Message
} from 'semantic-ui-react'

type FormValues = {
  email: string
  password: string
}

export const LoginComponent = ({
  validateRegister,
  validateErrors,
  validateHandleSubmit,
  formValues,
  handleFormValues,
  login,
  errorLogin
}: {
  validateRegister: any
  validateErrors: any
  validateHandleSubmit: any
  formValues: FormValues
  handleFormValues: any
  login: any
  errorLogin: string
}): ReactElement => {
  return (
    <Grid centered style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 500 }}>
        <Header as="h2" color="blue" textAlign="center">
          <Icon name="suitcase" /> Purchase System
        </Header>
        <Form size="large" onSubmit={validateHandleSubmit(login)}>
          <Segment>
            <Form.Field>
              <input
                placeholder="E-mail address"
                type="text"
                name="email"
                {...validateRegister('email')}
                value={formValues.email}
                onChange={e => handleFormValues(e)}
              />
              {validateErrors.email && (
                <Label pointing color="red">
                  {validateErrors.email.message}
                </Label>
              )}
            </Form.Field>
            <Form.Field>
              <input
                placeholder="Password"
                type="password"
                name="password"
                {...validateRegister('password')}
                value={formValues.password}
                onChange={e => handleFormValues(e)}
              />
              {validateErrors.password && (
                <Label pointing color="red">
                  {validateErrors.password.message}
                </Label>
              )}
            </Form.Field>
          </Segment>
          {errorLogin && (
            <Message
              color="red"
              icon="times"
              header="Login fail"
              content={errorLogin}
            />
          )}
          <button className="ui primary fluid button">Login</button>
        </Form>
      </Grid.Column>
    </Grid>
  )
}
