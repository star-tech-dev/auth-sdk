import type { Env, MainConfig, Credentials, User } from '../index'
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

  async check () {
    console.log('checkAuth2', this.isAuthenticated)
    return sendRequest({
      method: 'get',
      url: '/check'
    })
  }

  async login (credentials: Credentials): Promise<Response> {
    if (!credentials || !credentials.username || !credentials.password) {
      logError('credentials are missing', 'authenticate')
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

    // this.isAuthenticated = true
    // this.user = {
    //   username: credentials.username
    // }
    // return this.user
  }
}

export default new Auth(DEFAULT_CONFIG)
