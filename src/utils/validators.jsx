import {
  isAlphanumeric,
  isEmail,
  isNotEmpty,
  matches,
  maxLength,
  minLength,
} from 'class-validator'

export const signUpValidation = (data) => {
  let error = {}
  if (data.password !== data.passwordConfirm) {
    error.passwordConfirm = 'Les mots de passe ne correspondent pas. '
  }
  if (!isEmail(data.email)) {
    error.email = 'Email invalide '
  }
  if (
    !isNotEmpty(data.username) ||
    !isAlphanumeric(data.username) ||
    !minLength(data.username, 3) ||
    !maxLength(data.username, 20)
  ) {
    error.username = "Le nom d'utilisateur est invalide. "
  }
  if (
    !matches(
      data.password,
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.;,:_-])[A-Za-z0-9.;,:_-]{8,30}$/
    )
  ) {
    error.password =
      'Doit contenir min 8 caractères, 1 majuscule, 1 minuscule, un chiffre et un caractère spécial (.-,)'
  }
  return error
}

export const loginValidation = (data) => {
  let error = {}
  if (
    !isNotEmpty(data.username) ||
    !isAlphanumeric(data.username) ||
    !minLength(data.username, 3) ||
    !maxLength(data.username, 20)
  ) {
    error.username = "Le nom d'utilisateur est invalide. "
  }

  if (
    !matches(
      data.password,
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.;,:_-])[A-Za-z0-9.;,:_-]{8,30}$/
    )
  ) {
    error.password =
      'Doit contenir min 8 caractères, 1 majuscule, 1 minuscule, un chiffre et un caractère spécial (.-,)'
  }
  return error
}
