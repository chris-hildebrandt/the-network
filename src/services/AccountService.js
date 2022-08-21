import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { Account } from "../models/Account.js"

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (error) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', error)
    }
  }

  async editAccount(accountData) {
    const res = await api.put('account', accountData)
    AppState.account = new Account(res.data)
  }
}



export const accountService = new AccountService()
