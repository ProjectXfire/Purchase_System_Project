import cookie from 'cookie'
import { GetServerSidePropsContext } from 'next'

export const parseCookies = (ctx: GetServerSidePropsContext): any => {
  const cookieParsed = cookie.parse(
    ctx.req ? ctx.req.headers.cookie || '' : document.cookie
  )
  if (
    Object.keys(cookieParsed).length === 0 &&
    cookieParsed.constructor === Object
  ) {
    throw new Error('Invalid cookie')
  }
  if (cookieParsed.user) {
    return JSON.parse(cookieParsed.user)
  } else {
    throw new Error('Cookie undefined')
  }
}

export const parseCookiesLocal = (data: any): any => {
  const cookieParsed = JSON.parse(data)
  if (
    Object.keys(cookieParsed).length === 0 &&
    cookieParsed.constructor === Object
  ) {
    throw new Error('Invalid cookie')
  }
  if (cookieParsed.user) {
    return cookieParsed.locationsApprovers
  } else {
    throw new Error('Cookie undefined')
  }
}
