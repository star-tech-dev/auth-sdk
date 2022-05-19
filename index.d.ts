export type Env = 'development' | 'production'

export interface MainConfig {
  env: Env
}

export interface Credentials {
  username: string
  password: string
}

export interface User {
  username: string
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
