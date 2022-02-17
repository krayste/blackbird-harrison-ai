import * as EmailValidator from "email-validator";

export function isValidEmail(email) {
  return EmailValidator.validate(email);
}

export function getPasswordProperties(password) {
  let upperFormat = "^(?=.*[A-Z])";
  let lowerFormat = "^(?=.*[a-z])";
  // eslint-disable-next-line no-useless-escape
  let specialFormat = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  let numberFormat = "^(?=.*[0-9])";
  const lengthCorrect = password.length >= 8;
  const upperCorrect = password.match(upperFormat) ? true : false;
  const lowerCorrect = password.match(lowerFormat) ? true : false;
  const specialCorrect = password.match(specialFormat) ? true : false;
  const numberCorrect = password.match(numberFormat) ? true : false;
  return {
    lengthCorrect,
    upperCorrect,
    lowerCorrect,
    specialCorrect,
    numberCorrect,
  };
}

export function isValidPassword(passwordProperties) {
  return (
    passwordProperties.lengthCorrect &&
    passwordProperties.lowerCorrect &&
    passwordProperties.upperCorrect &&
    passwordProperties.specialCorrect &&
    passwordProperties.numberCorrect
  );
}

export function getEmailErrorMessage(emailValid) {
  if (!emailValid) {
    return "Please enter valid email address";
  }
  return "";
}

export function getPasswordErrorMessage(passwordProperties) {
  if (!passwordProperties.lengthCorrect) {
    return "Password should contain 8 or more characters";
  }
  if (!passwordProperties.upperCorrect || !passwordProperties.lowerCorrect) {
    return "Password should contain a minimum of 1 uppercase and lowercase letter";
  }
  if (!passwordProperties.numberCorrect) {
    return "Password should contain a minimum of 1 digit of numeric value";
  }
  if (!passwordProperties.specialCorrect) {
    return "Password should contain a minimum of 1 special character";
  }

  return "";
}
