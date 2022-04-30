import {
  isAlphanumeric,
  isEmail,
  isNotEmpty,
  matches,
  maxLength,
  minLength,
} from 'class-validator'

function validateCredentials(credentials) {
  let error = ''
  if (
    credentials.passwordConfirm &&
    credentials.password !== credentials.passwordConfirm
  ) {
    error += 'Les mots de passe ne correspondent pas. '
  }

  if (credentials.email && !isEmail(credentials.email)) {
    error += 'Email invalide '
  }

  if (
    credentials.username &&
    (!isNotEmpty(credentials.username) ||
      !isAlphanumeric(credentials.username) ||
      !minLength(credentials.username, 3) ||
      !maxLength(credentials.username, 20))
  ) {
    error += "Le nom d'utilisateur est invalide. "
  }

  if (
    !matches(
      credentials.password,
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.;,:_-])[A-Za-z0-9.;,:_-]{8,30}$/
    )
  ) {
    error +=
      'Mot de passe invalide ! Doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial (.-,)'
  }
  return error
}
export default validateCredentials
