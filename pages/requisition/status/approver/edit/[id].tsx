// React
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
// Next
import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
// Providers
import { joiResolver } from '@hookform/resolvers/joi'
// Services
import { getOneSSR, updateOne } from '@services/apiRequest'
// Models
import { Permissions } from '@models/auth/permission.model'
import { ApproverStatusSchema } from '@models/requisition/approver.status.schema'
import { ApproverStatus } from '@models/requisition/approver.status.model'
// Styles
import { Message } from 'semantic-ui-react'
// Components
import { Layout } from '@components/shared/layout'
import { ApproverStatusEditComponent } from '@components/requisition/status/approver/edit'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const response = await getOneSSR('requisition/approver-status/read', ctx)
  return {
    props: response
  }
}

const ApproverStatusEditPage = ({
  data,
  user,
  token,
  permissions,
  error
}: {
  data: ApproverStatus
  user: string
  token: string
  permissions: Permissions
  error: string
}): React.ReactElement => {
  const router = useRouter()
  const [errorOnRequest, setErrorOnRequest] = useState('')

  // SET SCHEMA TO VALIDATE FORM
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm({ resolver: joiResolver(ApproverStatusSchema) })

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

  // EDIT ITEM
  const editItem = async () => {
    try {
      await updateOne(
        'requisition/approver-status/edit',
        data._id,
        formValues,
        token
      )
      router.push('/requisition/status/approver')
      setErrorOnRequest('')
    } catch (error: any) {
      setErrorOnRequest(error.message)
    }
  }

  // VALIDATE IF USER IS LOGGED
  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
    } else {
      setFormValues({
        name: data.name,
        description: data.description
      })
      setValue('name', data.name, { shouldValidate: true })
      setValue('description', data.description, { shouldValidate: true })
    }
  }, [])

  return (
    <>
      <Head>
        <title>Approver Status - Edit</title>
        <meta name="description" content="Requisition" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <Layout permissions={permissions}>
          <main>
            {!error ? (
              <>
                {permissions.admin ? (
                  <ApproverStatusEditComponent
                    validateRegister={register}
                    validateErrors={errors}
                    validateHandleSubmit={handleSubmit}
                    formValues={formValues}
                    handleFormValues={handleFormValues}
                    editItem={editItem}
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
              </>
            ) : (
              <Message
                header={error}
                icon="times"
                content="Server error"
                color="red"
              />
            )}
          </main>
        </Layout>
      )}
    </>
  )
}

export default ApproverStatusEditPage