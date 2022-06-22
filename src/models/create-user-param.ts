export interface CreateUserParam {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  firstName?: string;
  lastName?: string;
}
