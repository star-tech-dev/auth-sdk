import axios, { AxiosRequestConfig } from 'axios'

export const sendRequest = (options: AxiosRequestConfig) => {
  const mergedOptions = {
    method: 'get',
    withCredentials: true,
    ...options
  } as AxiosRequestConfig

  mergedOptions.url = `${process.env.AUTH_SERVER_HOST}${options.url}`

  if (mergedOptions.method && ['get', 'delete'].includes(mergedOptions.method) && Object.prototype.hasOwnProperty.call(mergedOptions, 'data')) {
    mergedOptions.params = options.data
    delete mergedOptions.data
  }

  return axios(mergedOptions)
    .then(res => res.data)
    .catch(err => {
      throw err
    })
}

export default { sendRequest }
