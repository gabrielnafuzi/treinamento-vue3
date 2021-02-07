export function validateEmptyAndLength3(value) {
  if (!value) {
    return '*Este campo é obrigatorio'
  }

  if (value.length < 3) {
    return '*Este campo precisa ter no mínimo 3 caracteres'
  }

  return true
}

export function validateEmptyAndEmail(value) {
  if (!value) {
    return '*Este campo é obrigatório'
  }

  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i
  const isValid = emailRegex.test(value)

  if (!isValid) {
    return '*Este campo precisa ser um e-mail válido'
  }

  return true
}
