export type SignUpBody = {
  name: string,
  password: string,
  email: string
}

export type SignInBody = {
  email: string
  password: string,
}