import errorCodes from '../constants/errors'

export const logError = (message, source) => {
  console.error(`[@star-tech/auth][${source}] ${message}`)
}

export const handleError = err => {
  return {
    status: err.response.status,
    error: {
      ...err.response.data,
      text: errorCodes[err.response.data.message]
    }
  }
}
