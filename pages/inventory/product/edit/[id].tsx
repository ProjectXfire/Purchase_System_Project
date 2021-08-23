// React
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
// Next
import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
// Providers
import { joiResolver } from '@hookform/resolvers/joi'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Services
import { getOneSSR, updateOne } from '@services/apiRequest'
// Models
import { Permissions } from '@models/auth/permission.model'
import { ProductSchema } from '@models/inventory/product.schema'
import { Product } from '@models/inventory/product.model'
// Styles
import { Message } from 'semantic-ui-react'
// Components
import { Layout } from '@components/shared/layout'
import { ProductEditComponent } from '@components/inventory/product/edit'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const response = await getOneSSR('requisition/item/read', ctx)
  return {
    props: {
      ...response,
      ...(await serverSideTranslations(ctx.locale as string, [
        'menu',
        'common'
      ]))
    }
  }
}

const ProductEditPage = ({
  data,
  user,
  token,
  permissions,
  error
}: {
  data: Product
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
  } = useForm({ resolver: joiResolver(ProductSchema) })

  // HANDLE FORM VALUES
  const [formValues, setFormValues] = useState({
    partNumber: '',
    description: '',
    unitMeasure: '',
    unitPrice: 0
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
      await updateOne('requisition/item/edit', data._id, formValues, token)
      router.push('/inventory/product')
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
        partNumber: data.partNumber,
        description: data.description,
        unitMeasure: data.unitMeasure,
        unitPrice: data.unitPrice
      })
      setValue('partNumber', data.partNumber, { shouldValidate: true })
      setValue('description', data.description, { shouldValidate: true })
      setValue('unitMeasure', data.unitMeasure, { shouldValidate: true })
      setValue('unitPrice', data.unitPrice, { shouldValidate: true })
    }
  }, [])

  return (
    <>
      <Head>
        <title>Product - Edit</title>
        <meta name="description" content="Inventory" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <Layout permissions={permissions}>
          <main>
            {!error ? (
              <>
                {permissions.admin ? (
                  <ProductEditComponent
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

export default ProductEditPage
