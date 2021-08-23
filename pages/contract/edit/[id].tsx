// React
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
// Next
import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
// Providers
import { joiResolver } from '@hookform/resolvers/joi'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Utils
import { parseCookies } from '@utils/parseCookies'
import { fillDropdown, fillDropdownCode } from '@utils/fillDropdown'
// Services
import { getList, getOne, updateOne } from '@services/apiRequest'
// Models
import { Permissions } from '@models/auth/permission.model'
import { Contract } from '@models/contract/contract.model'
import { Location } from '@models/contract/location.model'
import { Type } from '@models/contract/type.model'
import { ContractSchema } from '@models/contract/contract.schema'
// Styles
import { Message } from 'semantic-ui-react'
// Components
import { Layout } from '@components/shared/layout'
import { ContractEditComponent } from '@components/contract/contract/edit'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  let cookie
  try {
    cookie = parseCookies(ctx)
    const params = ctx.params
    const id = params && params.id ? (params.id as string) : ''
    const responseContract = await getOne('contract/read', id, cookie.token)
    const responseLocation = await getList(
      'contract/location/list',
      cookie.token
    )
    const responseContractType = await getList(
      'contract/contracttype/list',
      cookie.token
    )
    return {
      props: {
        user: cookie.user,
        token: cookie.token,
        permissions: cookie.permissions,
        dataContract: responseContract.data,
        dataLocation: responseLocation.data,
        dataType: responseContractType.data,
        error: '',
        ...(await serverSideTranslations(ctx.locale as string, [
          'menu',
          'common'
        ]))
      }
    }
  } catch (error: any) {
    return {
      props: {
        user: cookie && cookie.user ? cookie.user : '',
        token: cookie && cookie.token ? cookie.token : '',
        permissions: cookie && cookie.permissions ? cookie.permissions : {},
        dataContract: {},
        dataLocation: [],
        dataType: [],
        error: error.message
      }
    }
  }
}

const ContractEditPage = ({
  user,
  token,
  permissions,
  dataContract,
  dataLocation,
  dataType,
  error
}: {
  user: string
  token: string
  permissions: Permissions
  dataContract: Contract
  dataLocation: Location[]
  dataType: Type[]
  error: string
}): React.ReactElement => {
  const router = useRouter()
  const [errorOnRequest, setErrorOnRequest] = useState('')

  // INIT DROPDOWN VALUES
  const locationDropdown = fillDropdown(dataLocation)
  const typeDropdown = fillDropdown(dataType)
  const areaUnitDropdown = fillDropdownCode()
  // SET SCHEMA TO VALIDATE FORM
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    control
  } = useForm({ resolver: joiResolver(ContractSchema) })

  // EDIT ITEM
  const editItem = async (data: Record<string, unknown>) => {
    const contract = {
      name: data.name,
      description: data.description,
      areaUnit: data.areaUnit,
      areaUnitDescription: data.areaUnitDescription,
      clientCode: data.clientCode || '',
      location: data.location,
      contractType: data.contractType
    }
    try {
      await updateOne('contract/edit', dataContract._id, contract, token)
      router.push('/contract')
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
      setValue('name', dataContract.name, { shouldValidate: true })
      setValue('description', dataContract.description, {
        shouldValidate: true
      })
      setValue('areaUnit', dataContract.areaUnit, { shouldValidate: true })
      setValue('areaUnitDescription', dataContract.areaUnitDescription, {
        shouldValidate: true
      })
      setValue('clientCode', dataContract.clientCode)
      setValue('location', dataContract.location._id, { shouldValidate: true })
      setValue('contractType', dataContract.contractType._id, {
        shouldValidate: true
      })
    }
  }, [])

  return (
    <>
      <Head>
        <title>Contract - Edit</title>
        <meta name="description" content="Contract" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <Layout permissions={permissions}>
          <main>
            {!error ? (
              <>
                {permissions.admin || permissions.contract_edit ? (
                  <ContractEditComponent
                    validateHandleSubmit={handleSubmit}
                    validateSetValue={setValue}
                    validateErrors={errors}
                    validateControl={control}
                    locationDropdown={locationDropdown}
                    typeDropdown={typeDropdown}
                    areaUnitDropdown={areaUnitDropdown}
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

export default ContractEditPage
