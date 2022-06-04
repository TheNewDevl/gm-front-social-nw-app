import {
  isAlpha,
  isAlphanumeric,
  isEmail,
  isNotEmpty,
  isString,
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

export const postValidation = (data) => {
  let error = {}
  if (
    !isNotEmpty(data.text) ||
    !isString(data.text) ||
    !minLength(data.text, 3)
  ) {
    error.text = 'La publication doit contenir au minimum 3 caractères.'
  }
  return error
}

export const profileValidation = (data) => {
  let error = {}

  if (!isAlpha(data.firstName) || !minLength(data.firstName, 3)) {
    error.firstName =
      'Le prénom ne doit comporter que des lettres, 3 caractères min'
  }

  if (!isAlpha(data.lastName) || !minLength(data.lastName, 3)) {
    error.lastName =
      'Le nom ne doit comporter que des lettres, 3 caractères min'
  }

  if (!isString(data.bio) || !minLength(data.bio, 20)) {
    error.bio = 'Le texte doit comporter au minimum 20 caractères'
  }

  return error
}
