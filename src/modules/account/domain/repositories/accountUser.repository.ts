import { AccountUserEntity } from "../entities/account.entity";

export interface AccountUserRepository {
  create(user: AccountUserEntity, hashedPassword: string): Promise<AccountUserEntity>;
 findByEmail(email: string): Promise<(AccountUserEntity & { password: string }) | null>;
}
