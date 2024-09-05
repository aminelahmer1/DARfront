import { User } from '../models/user';
import { Role } from '../models/role';

export class MfaVerificationResponse {
  email!: string;
  jwt!: string;
  authValid!: boolean;
  mfaRequired!: boolean;
  tokenValid!: boolean;
  message!: string;
  user!: User;
  roles!: Role[];

  constructor(
    email: string,
    jwt: string,
    tokenValid: boolean,
    authValid: boolean,
    mfaRequired: boolean,
    message: string,
    user: User,
    roles: Role[]
  ) {
    this.email = email != null ? email : '';
    this.jwt = jwt != null ? jwt : '';
    this.message = message != null ? message : '';
    this.mfaRequired = mfaRequired != null ? mfaRequired : false;
    this.tokenValid = tokenValid != null ? tokenValid : false;
    this.authValid = authValid != null ? authValid : false;
    this.user = user;
    this.roles = roles != null ? roles : [];
  }
}
