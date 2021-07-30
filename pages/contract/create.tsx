// React
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
// Next
import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
// Providers
import { joiResolver } from '@hookform/resolvers/joi'
// Utils
import { parseCookies } from '@utils/parseCookies'
import { fillDropdown, fillDropdownCode } from '@utils/fillDropdown'
// Services
import { createOne, getList } from '@services/apiRequest'
// Models
import { Permissions } from '@models/auth/permission.model'
import { Location } from '@models/contract/location.model'
import { Type } from '@models/contract/type.model'
import { ContractSchema } from '@models/contract/contract.schema'
// Styles
import { Message } from 'semantic-ui-react'
// Components
import { Layout } from '@components/shared/layout'
import { ContractCreateComponent } from '@components/contract/contract/create'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  let cookie
  try {
    cookie = parseCookies(ctx)
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
        dataLocation: responseLocation.data,
        dataType: responseContractType.data,
        error: ''
      }
    }
  } catch (error: any) {
    return {
      props: {
        user: cookie.user || '',
        token: cookie.token || '',
        permissions: cookie.permissions || '',
        dataLocation: [],
        dataType: [],
        error: error.message
      }
    }
  }
}

const ContractCreatePage = ({
  user,
  token,
  permissions,
  dataLocation,
  dataType,
  error
}: {
  user: string
  token: string
  permissions: Permissions
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
    setValue
  } = useForm({ resolver: joiResolver(ContractSchema) })

  // CREATE NEW ITEM
  const createItem = async (data: Record<string, unknown>) => {
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
      await createOne('contract/create', contract, token)
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
    }
  }, [])

  return (
    <>
      <Head>
        <title>Contract - Create</title>
        <meta name="description" content="Contract" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <Layout permissions={permissions}>
          <main>
            {!error ? (
              <>
                {permissions.admin || permissions.contract_create ? (
                  <ContractCreateComponent
                    validateHandleSubmit={handleSubmit}
                    validateSetValue={setValue}
                    validateErrors={errors}
                    locationDropdown={locationDropdown}
                    typeDropdown={typeDropdown}
                    areaUnitDropdown={areaUnitDropdown}
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

export default ContractCreatePage
