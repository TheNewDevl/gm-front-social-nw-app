import {
  isAlphanumeric,
  isEmail,
  isNotEmpty,
  matches,
  maxLength,
  minLength,
} from 'class-validator'

function validateCredentials(credentials) {
  let error = {}
  if (
    credentials.passwordConfirm &&
    credentials.password !== credentials.passwordConfirm
  ) {
    error.passwordConfirm = 'Les mots de passe ne correspondent pas. '
  }

  if (credentials.email && !isEmail(credentials.email)) {
    error.email = 'Email invalide '
  }

  if (
    credentials.username &&
    (!isNotEmpty(credentials.username) ||
      !isAlphanumeric(credentials.username) ||
      !minLength(credentials.username, 3) ||
      !maxLength(credentials.username, 20))
  ) {
    error.username = "Le nom d'utilisateur est invalide. "
  }

  if (
    !matches(
      credentials.password,
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.;,:_-])[A-Za-z0-9.;,:_-]{8,30}$/
    )
  ) {
    error.password =
      'Doit contenir min 8 caractères, 1 majuscule, 1 minuscule, un chiffre et un caractère spécial (.-,)'
  }

  return error
}
export default validateCredentials
