import type { Env, MainConfig, Credentials, RegisterCredentials, User } from '../index'
import { handleError, logError } from './utils/errors'
import { sendRequest } from './api'
import { Response } from '../index'

const DEFAULT_CONFIG: MainConfig = {
  env: 'development'
}

export class Auth {
  private env: Env

  public isAuthenticated: boolean
  public user: User | null

  constructor (config: MainConfig = DEFAULT_CONFIG) {
    this.env = config.env
    this.isAuthenticated = false
    this.user = null
  }

  async check (): Promise<Response> {
    if (this.env === 'development') {
      console.log('[auth-sdk][check]')
    }

    const result = await sendRequest({
      method: 'get',
      url: '/check'
    })

    if (result.status) {
      this.isAuthenticated = true
      this.user = result.data.user
    }

    return result
  }

  async login (credentials: Credentials): Promise<User | Response> {
    if (this.env === 'development') {
      console.log('[auth-sdk][login]', credentials)
    }

    if (!credentials || !credentials.username || !credentials.password) {
      logError('credentials are missing', 'login')
      return null
    }

    const result = await sendRequest({
      method: 'post',
      url: '/login',
      data: credentials
    }).catch(err => handleError(err))

    if (result.error) {
      return result
    }

    this.isAuthenticated = true
    this.user = result.user
    return this.user
  }

  async register (credentials: RegisterCredentials): Promise<User | Response> {
    if (this.env === 'development') {
      console.log('[auth-sdk][register]', credentials)
    }

    if (!credentials || !credentials.username || !credentials.password || !credentials.password) {
      logError('credentials are missing', 'register')
      return null
    }

    const result = await sendRequest({
      method: 'post',
      url: '/register',
      data: credentials
    }).catch(err => handleError(err))

    if (result.error) {
      return result
    }

    this.isAuthenticated = true
    this.user = result.user
    return this.user
  }

  async logout () {
    if (this.env === 'development') {
      console.log('[auth-sdk][logout]')
    }

    const result = await sendRequest({
      method: 'get',
      url: '/logout'
    }).catch(err => handleError(err))

    this.isAuthenticated = false
    this.user = null

    return result
  }
}

export default new Auth(DEFAULT_CONFIG)
