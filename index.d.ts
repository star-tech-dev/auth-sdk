export type Env = 'development' | 'production'

export interface MainConfig {
  env: Env
}

export interface Credentials {
  username: string
  password: string
}

export interface RegisterCredentials {
  username: string
  password: string
  passwordConfirm: string
}

export interface User {
  _id: string
  username: string
  passwordUpdated: string
}

export interface ResponseError {
  status: number
  message: string
  text: string
}

export interface Response {
  status: number
  data: any
  error?: ResponseError
}
