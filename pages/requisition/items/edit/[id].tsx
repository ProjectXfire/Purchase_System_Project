// React
import React, { useEffect, useState } from 'react'
// Next
import Head from 'next/head'
import { useRouter } from 'next/router'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
// Providers
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { Message } from 'semantic-ui-react'
// Services
import { getList, getOne, updateOne } from '@services/apiRequest'
// Utils
import { parseCookies } from '@utils/parseCookies'
import { fillDropdown, categoriesDropdown } from '@utils/fillDropdown'
// Models
import { RequisitionItems } from '@models/requisition/requisition.items.model'
import { Permissions } from '@models/auth/permission.model'
import { Product } from '@models/inventory/product.model'
// Schema
import { RequisitionItemsSchema } from '@models/requisition/requisition.items.schema'
// Components
import { Layout } from '@components/shared/layout'
import { RequisitionItemsEditComponent } from '@components/requisition/requisition/editItems'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  let cookie
  try {
    cookie = parseCookies(ctx)
    const params = ctx.params
    const id = params && params.id ? (params.id as string) : ''
    const itemResponse = await getOne(
      'requisition/items/read',
      id,
      cookie.token
    )
    const products = await getList('requisition/item/list', cookie.token)
    return {
      props: {
        data: itemResponse.data,
        products: products.data,
        user: cookie.user,
        token: cookie.token,
        permissions: cookie.permissions,
        error: ''
      }
    }
  } catch (error: any) {
    return {
      props: {
        data: [],
        products: [],
        user: cookie && cookie.user ? cookie.user : '',
        token: cookie && cookie.token ? cookie.token : '',
        permissions: cookie && cookie.permissions ? cookie.permissions : {},
        error: error.message
      }
    }
  }
}

const RequisitionItemsEditPage = ({
  data,
  products,
  user,
  token,
  permissions,
  error
}: {
  data: RequisitionItems
  products: Product[]
  user: string
  token: string
  permissions: Permissions
  error: string
}): React.ReactElement => {
  const router = useRouter()
  const [errorOnRequest, setErrorOnRequest] = useState('')

  // INIT DROPDOWN
  const productsDropdown = fillDropdown(products)

  // SET SCHEMA TO VALIDATE FORM
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    control,
    getValues
  } = useForm({ resolver: joiResolver(RequisitionItemsSchema) })

  // SHOW FIELDS ACCORDING TO CATEGORY
  const [showItemOption, setShowItemOption] = useState({
    material: false,
    others: false,
    description: false,
    unitMeasure: false
  })

  // COMPLETE PRODUCT DATA
  const setProductData = async (id: string) => {
    try {
      const product = await getOne('requisition/item/read', id, token)
      setValue('price', product.unitPrice)
      setValue('unitMeasure', product.unitMeasure)
      setErrorOnRequest('')
    } catch (error: any) {
      setErrorOnRequest(error.message)
    }
  }

  // EDIT ITEM
  const editItem = async () => {
    try {
      await updateOne('requisition/items/edit', data._id, getValues(), token)
      router.push(`/requisition/items/${data.requisition}`)
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
      setValue('itemCategory', data.itemCategory)
      setValue('description', data.description)
      setValue(
        'material',
        data.material && data.material._id ? data.material._id : null
      )
      setValue('other', data.other)
      setValue('price', data.price)
      setValue('unitMeasure', data.unitMeasure)
      setValue('quantity', data.quantity)
      setValue('totalCost', data.totalCost)
      if (data.itemCategory === 'Purchase') {
        setShowItemOption({
          material: true,
          others: false,
          description: false,
          unitMeasure: true
        })
      }
      if (data.itemCategory === 'Services') {
        setShowItemOption({
          material: false,
          others: true,
          description: true,
          unitMeasure: false
        })
      }
      if (data.itemCategory === 'Petty Cash') {
        setShowItemOption({
          material: false,
          others: true,
          description: true,
          unitMeasure: true
        })
      }
    }
  }, [])

  return (
    <>
      <Head>
        <title>Currency - Edit</title>
        <meta name="description" content="Requisition" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <Layout permissions={permissions}>
          <main>
            {!error ? (
              <>
                {permissions.admin || permissions.req_edit ? (
                  <RequisitionItemsEditComponent
                    validateControl={control}
                    validateSetValue={setValue}
                    validateGetValues={getValues}
                    validateErrors={errors}
                    validateHandleSubmit={handleSubmit}
                    requisitionId={data.requisition}
                    productsDropdown={productsDropdown}
                    categoriesDropdown={categoriesDropdown}
                    showItemOption={showItemOption}
                    setShowItemOption={setShowItemOption}
                    setProductData={setProductData}
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

export default RequisitionItemsEditPage
