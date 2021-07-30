// Next
import { GetServerSidePropsContext } from 'next'
// Providers
import axios, { AxiosResponse } from 'axios'
// Utils
import { parseCookies } from '@utils/parseCookies'
import { errorMessage } from '@utils/handleError'
import { config } from '@utils/environments'
// Models
import { Cookie } from '@models/auth/cookie.model'

interface ResponseList {
  user: string
  token: string
  permissions: Record<string, unknown>
  data: []
  pages: number
  error: string
}

interface ResponseOne {
  data: Record<string, unknown>
  user: string
  token: string
  permissions: Record<string, unknown>
  error: string
}

export const getListSSR = async (
  path: string,
  ctx: GetServerSidePropsContext
): Promise<ResponseList> => {
  if (parseCookies(ctx)) {
    const cookie: Cookie = parseCookies(ctx)
    const params = ctx.params
    const id = params && params.id ? (params.id as string) : ''
    try {
      const response = await getList(path, cookie.token, id)
      if (!id) {
        return {
          user: cookie.user,
          token: cookie.token,
          permissions: cookie.permissions,
          data: response.data.list,
          pages: response.data.pages,
          error: ''
        }
      }
      return {
        user: cookie.user,
        token: cookie.token,
        permissions: cookie.permissions,
        data: response.data,
        pages: 0,
        error: ''
      }
    } catch (error: any) {
      console.log(error)
      return {
        user: cookie.user,
        token: cookie.token,
        permissions: cookie.permissions,
        data: [],
        pages: 0,
        error: error.message
      }
    }
  }
  return {
    token: '',
    user: '',
    permissions: {},
    data: [],
    pages: 0,
    error: ''
  }
}

export const getOneSSR = async (
  path: string,
  ctx: GetServerSidePropsContext
): Promise<ResponseOne> => {
  const params = ctx.params
  if (parseCookies(ctx)) {
    const cookie: Cookie = parseCookies(ctx)
    const id = params && params.id ? (params.id as string) : ''
    try {
      const response = await getOne(path, id, cookie.token)
      return {
        data: response.data,
        user: cookie.user,
        token: cookie.token,
        permissions: cookie.permissions,
        error: ''
      }
    } catch (error: any) {
      return {
        data: {},
        user: cookie.user,
        token: cookie.token,
        permissions: cookie.permissions,
        error: error.message
      }
    }
  }
  return {
    data: {},
    user: '',
    token: '',
    permissions: {},
    error: ''
  }
}

export const getList = async (
  path: string,
  token: string,
  id?: string
): Promise<any> => {
  try {
    if (!id) {
      const response: AxiosResponse = await axios.get(
        `${config.apiUrl}/${path}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response
    }
    const response: AxiosResponse = await axios.get(
      `${config.apiUrl}/${path}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response
  } catch (error: any) {
    throw new Error(errorMessage(error))
  }
}

export const getOne = async (
  path: string,
  id: string,
  token: string
): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${config.apiUrl}/${path}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response
  } catch (error: any) {
    throw new Error(errorMessage(error))
  }
}

export const createOne = async (
  path: string,
  values: Record<string, unknown>,
  token: string
): Promise<any> => {
  try {
    await axios.post(`${config.apiUrl}/${path}`, values, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error: any) {
    throw new Error(errorMessage(error))
  }
}

export const updateOne = async (
  path: string,
  id: string,
  values: Record<string, unknown>,
  token: string
): Promise<any> => {
  try {
    await axios.put(`${config.apiUrl}/${path}/${id}`, values, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error: any) {
    throw new Error(errorMessage(error))
  }
}

export const deleteOne = async (
  path: string,
  id: string,
  token: string
): Promise<any> => {
  try {
    await axios.delete(`${config.apiUrl}/${path}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error: any) {
    throw new Error(errorMessage(error))
  }
}
