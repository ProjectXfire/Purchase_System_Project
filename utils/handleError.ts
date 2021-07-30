export const errorMessage = (error: {
  response: { data: { message: string } }
}): string => {
  if (error.response) {
    return error.response.data.message
  }
  return 'Server Connection Failed'
}
