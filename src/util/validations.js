const validate = (val, rules) => {
  let isValid = true
  Object.keys(rules).map((rule) => {
    switch (rule) {
      case 'isEmail':
        isValid = isValid && emailValidator(val)
        break
      case 'minLength':
        isValid = isValid && minLengthValidator(val, rules[rule])
        break
      case 'equalTo':
        isValid = isValid && equalToValidator(val, rules[rule])
        break
      case 'notEmpty':
        isValid = isValid && notEmptyValidator(val)
        break
    }
  })
  return isValid
}

const emailValidator = (val) => {
  const exp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  return exp.test(val)
}

const minLengthValidator = (val, minLength) => {
  return val.length >= minLength
}

const equalToValidator = (val, equalValue) => {
  return val === equalValue
}

const notEmptyValidator = (val) => {
  return val.trim().length > 0
}

export default validate
