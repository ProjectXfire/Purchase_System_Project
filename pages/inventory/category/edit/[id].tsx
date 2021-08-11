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
import { CategorySchema } from '@models/inventory/category.schema'
import { Category } from '@models/inventory/category.model'
// Styles
import { Message } from 'semantic-ui-react'
// Components
import { Layout } from '@components/shared/layout'
import { CategoryEditComponent } from '@components/inventory/category/edit'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const response = await getOneSSR('requisition/item-category/read', ctx)
  return {
    props: response
  }
}

const CategoryEditPage = ({
  data,
  user,
  token,
  permissions,
  error
}: {
  data: Category
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
  } = useForm({ resolver: joiResolver(CategorySchema) })

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
        'requisition/item-category/edit',
        data._id,
        formValues,
        token
      )
      router.push('/inventory/category')
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
        <title>Category - Edit</title>
        <meta name="description" content="Inventory" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <Layout permissions={permissions}>
          <main>
            {!error ? (
              <>
                {permissions.admin ? (
                  <CategoryEditComponent
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

export default CategoryEditPage
