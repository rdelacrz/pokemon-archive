export interface User {
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  creationDate: Date,
  loginDate: Date,
  modifiedDate: Date,
  verified: boolean,
  active: boolean,
}