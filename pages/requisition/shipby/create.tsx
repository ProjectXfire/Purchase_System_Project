// React
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
// Next
import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
// Providers
import { joiResolver } from '@hookform/resolvers/joi'
// Utils
import { parseCookies } from '@utils/parseCookies'
// Services
import { createOne } from '@services/apiRequest'
// Models
import { Permissions } from '@models/auth/permission.model'
import { ShipBySchema } from '@models/requisition/shipby.schema'
// Styles
import { Message } from 'semantic-ui-react'
// Components
import { Layout } from '@components/shared/layout'
import { ShipByCreateComponent } from '@components/requisition/shipby/create'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  let cookie
  try {
    cookie = parseCookies(ctx)
    return {
      props: {
        user: cookie.user,
        token: cookie.token,
        permissions: cookie.permissions
      }
    }
  } catch (error) {
    return {
      props: {
        user: cookie && cookie.user ? cookie.user : '',
        token: cookie && cookie.token ? cookie.token : '',
        permissions: cookie && cookie.permissions ? cookie.permissions : {}
      }
    }
  }
}

const ShipByCreatePage = ({
  user,
  token,
  permissions
}: {
  user: string
  token: string
  permissions: Permissions
}): React.ReactElement => {
  const router = useRouter()
  const [errorOnRequest, setErrorOnRequest] = useState('')

  // SET SCHEMA TO VALIDATE FORM
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({ resolver: joiResolver(ShipBySchema) })

  // HANDLE FORM VALUES
  const [formValues, setFormValues] = useState({
    name: '',
    description: ''
  })
  const handleFormValues = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  // CREATE NEW ITEM
  const createItem = async () => {
    try {
      await createOne('requisition/ship-by/create', formValues, token)
      router.push('/requisition/shipby')
      setErrorOnRequest('')
    } catch (error: any) {
      setErrorOnRequest(error.message)
    }
  }

  // VALIDATE IF USER IS LOGGED
  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
    }
  }, [])

  return (
    <>
      <Head>
        <title>Ship By - Create</title>
        <meta name="description" content="Requisition" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <Layout permissions={permissions}>
          <main>
            {permissions.admin || permissions.req_create ? (
              <ShipByCreateComponent
                validateRegister={register}
                validateErrors={errors}
                validateHandleSubmit={handleSubmit}
                formValues={formValues}
                handleFormValues={handleFormValues}
                createItem={createItem}
                error={errorOnRequest}
              />
            ) : (
              <Message
                header="Permission Access Denied"
                icon="times"
                content="Error"
                color="red"
              />
            )}
          </main>
        </Layout>
      )}
    </>
  )
}

export default ShipByCreatePage
