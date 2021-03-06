// React
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
// Next
import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
// Providers
import { joiResolver } from '@hookform/resolvers/joi'
import axios from 'axios'
import Cookies from 'js-cookie'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Utils
import { config } from '@utils/environments'
import { parseCookies } from '@utils/parseCookies'
import { errorMessage } from '@utils/handleError'
// Models
import { Cookie } from '@models/auth/cookie.model'
import { LoginSchema } from '@models/auth/login.schema'
// Components
import { LoginComponent } from '@components/auth/Login'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  let cookie: Cookie
  try {
    cookie = parseCookies(ctx)
    return {
      props: {
        user: cookie.user,
        ...(await serverSideTranslations(ctx.locale as string, [
          'menu',
          'common'
        ]))
      }
    }
  } catch (error: any) {
    return {
      props: {
        user: null
      }
    }
  }
}

const LoginPage: React.FC = ({ user }: any) => {
  const router = useRouter()

  // SET SCHEMA TO VALIDATE FORM
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({ resolver: joiResolver(LoginSchema) })

  // HANDLE FORM VALUES
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  })
  const handleFormValues = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  // LOGIN
  const [errorLogin, setErrorLogin] = useState('')
  const login = async () => {
    try {
      const userDataValidation = await axios.post(
        `${config.apiUrl}/auth/login`,
        formValues
      )
      Cookies.set('user', userDataValidation.data, {
        expires: new Date(new Date().getTime() + 60 * 60 * 1000)
      })
      setErrorLogin('')
      router.push('/')
    } catch (error: any) {
      setErrorLogin(errorMessage(error))
    }
  }

  // VALIDATE IF USER IS LOGGED
  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user])

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Cost Code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginComponent
        validateRegister={register}
        validateErrors={errors}
        validateHandleSubmit={handleSubmit}
        formValues={formValues}
        handleFormValues={handleFormValues}
        login={login}
        errorLogin={errorLogin}
      />
    </>
  )
}

export default LoginPage
