import { AccountModel } from 'domain/models/account-model'

type AuthenticationParams = {
  email: string
  password: string
};

export interface IAuthentication {
  auth(params: AuthenticationParams): Promise<AccountModel>
}
