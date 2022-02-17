import { render, screen } from "@testing-library/react";
import LoginForm, {
  getEmailErrorMessage,
  getPasswordErrorMessage,
  getPasswordProperties,
  isValidEmail,
  isValidPassword,
} from ".";

test("renders sign in page", () => {
  render(<LoginForm />);
  const signInText = screen.getByText("Sign in");
  expect(signInText).toBeInTheDocument();
});

describe("getEmailErrorMessage", () => {
  test("it returns an empty error message for a valid email", () => {
    const emailValid = true;
    expect(getEmailErrorMessage(emailValid)).toEqual("");
  });
  test("it returns an error message for an invalid email", () => {
    const errorMessage = "Please enter valid email address";
    const emailValid = false;
    expect(getEmailErrorMessage(emailValid)).toEqual(errorMessage);
  });
});

describe("isValidPassword", () => {
  test("it returns true for all valid parameters", () => {
    const passwordProperties = {
      lengthCorrect: true,
      lowerCorrect: true,
      upperCorrect: true,
      specialCorrect: true,
      numberCorrect: true,
    };
    expect(isValidPassword(passwordProperties)).toBeTruthy();
  });
  test("it returns false for an incorrect length", () => {
    const passwordProperties = {
      lengthCorrect: false,
      lowerCorrect: true,
      upperCorrect: true,
      specialCorrect: true,
      numberCorrect: true,
    };
    expect(isValidPassword(passwordProperties)).toBeFalsy();
  });
  test("it returns false for a missing lowercase", () => {
    const passwordProperties = {
      lengthCorrect: true,
      lowerCorrect: false,
      upperCorrect: true,
      specialCorrect: true,
      numberCorrect: true,
    };
    expect(isValidPassword(passwordProperties)).toBeFalsy();
  });
  test("it returns false for a missing uppercase", () => {
    const passwordProperties = {
      lengthCorrect: true,
      lowerCorrect: true,
      upperCorrect: false,
      specialCorrect: true,
      numberCorrect: true,
    };
    expect(isValidPassword(passwordProperties)).toBeFalsy();
  });
  test("it returns false for a missing special character", () => {
    const passwordProperties = {
      lengthCorrect: true,
      lowerCorrect: true,
      upperCorrect: true,
      specialCorrect: false,
      numberCorrect: true,
    };
    expect(isValidPassword(passwordProperties)).toBeFalsy();
  });
  test("it returns false for a missing number", () => {
    const passwordProperties = {
      lengthCorrect: true,
      lowerCorrect: true,
      upperCorrect: true,
      specialCorrect: true,
      numberCorrect: false,
    };
    expect(isValidPassword(passwordProperties)).toBeFalsy();
  });
});

describe("getPasswordErrorMessage", () => {
  test("it returns an empty message for all valid parameters", () => {
    const passwordProperties = {
      lengthCorrect: true,
      lowerCorrect: true,
      upperCorrect: true,
      specialCorrect: true,
      numberCorrect: true,
    };
    expect(getPasswordErrorMessage(passwordProperties)).toEqual("");
  });
  test("it states the error as requiring 8 or more characters", () => {
    const errorMessage = "Password should contain 8 or more characters";
    const passwordProperties = {
      lengthCorrect: false,
      lowerCorrect: true,
      upperCorrect: true,
      specialCorrect: true,
      numberCorrect: true,
    };
    expect(getPasswordErrorMessage(passwordProperties)).toEqual(errorMessage);
  });
  test("it states the error as lowercase/uppercase for missing lowercase", () => {
    const errorMessage =
      "Password should contain a minimum of 1 uppercase and lowercase letter";

    const passwordProperties = {
      lengthCorrect: true,
      lowerCorrect: false,
      upperCorrect: true,
      specialCorrect: true,
      numberCorrect: true,
    };
    expect(getPasswordErrorMessage(passwordProperties)).toEqual(errorMessage);
  });
  test("it states the error as lowercase/uppercase for missing uppercase", () => {
    const errorMessage =
      "Password should contain a minimum of 1 uppercase and lowercase letter";

    const passwordProperties = {
      lengthCorrect: true,
      lowerCorrect: true,
      upperCorrect: false,
      specialCorrect: true,
      numberCorrect: true,
    };
    expect(getPasswordErrorMessage(passwordProperties)).toEqual(errorMessage);
  });
  test("it states the error as requiring special char", () => {
    const errorMessage =
      "Password should contain a minimum of 1 special character";

    const passwordProperties = {
      lengthCorrect: true,
      lowerCorrect: true,
      upperCorrect: true,
      specialCorrect: false,
      numberCorrect: true,
    };
    expect(getPasswordErrorMessage(passwordProperties)).toEqual(errorMessage);
  });
  test("it states the error as requiring a number", () => {
    const errorMessage =
      "Password should contain a minimum of 1 digit of numeric value";

    const passwordProperties = {
      lengthCorrect: true,
      lowerCorrect: true,
      upperCorrect: true,
      specialCorrect: true,
      numberCorrect: false,
    };
    expect(getPasswordErrorMessage(passwordProperties)).toEqual(errorMessage);
  });
});

describe("isValidEmail", () => {
  // Example emails sourced from https://www.qaacharya.in/2020/05/test-cases-for-email-field.html
  test("it should recognise valid email addresses", () => {
    const emailAddresses = [
      "email@example.com",
      "firstname.lastname@example.com",
      "email@subdomain.example.com",
      "firstname+lastname@example.com",
      "1234567890@example.com",
    ];
    emailAddresses.forEach((address) => {
      expect(isValidEmail(address)).toBeTruthy();
    });
  });
  test("it shouldn't recognise invalid email addresses", () => {
    const emailAddresses = [
      "singleword",
      "#@%^%#$@#$@#.com",
      "@example.com",
      "email.example.com",
      "email@example@example.com",
      "email..email@example.com",
    ];
    emailAddresses.forEach((address) => {
      expect(isValidEmail(address)).toBeFalsy();
    });
  });
});

describe("getPasswordProperties", () => {
  // Example emails sourced from https://www.qaacharya.in/2020/05/test-cases-for-email-field.html
  const expected = {
    lengthCorrect: true,
    upperCorrect: true,
    lowerCorrect: true,
    specialCorrect: true,
    numberCorrect: true,
  };
  test("it should recognise valid passwords", () => {
    const capitalAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const capitalPasswords = capitalAlphabet.map(
      (letter) => `${letter}aaaaa!0`
    );
    capitalPasswords.forEach((password) => {
      expect(getPasswordProperties(password)).toStrictEqual(expected);
    });

    const lowerAlphabet = capitalAlphabet.map((letter) => letter.toLowerCase());
    const lowerPasswords = lowerAlphabet.map((letter) => `${letter}AAAAA!0`);
    lowerPasswords.forEach((password) => {
      expect(getPasswordProperties(password)).toStrictEqual(expected);
    });

    const numbers = "0123456789".split("");
    const numberPasswords = numbers.map((number) => `aBaaaa!${number}`);
    numberPasswords.forEach((password) => {
      expect(getPasswordProperties(password)).toStrictEqual(expected);
    });

    let symbols = "[`!@#$%^&*()_+-=[]{};':\"\\|,.<>/?~]".split("");
    const symbolPasswords = symbols.map((symbol) => `aBaaaa0${symbol}`);
    symbolPasswords.forEach((password) => {
      expect(getPasswordProperties(password)).toStrictEqual(expected);
    });
  });
  test("it shouldn't recognise invalid passwords", () => {
    const invalidPasswords = [
      "a",
      "A",
      "1",
      "?",
      "aa",
      "aA",
      "a1",
      "a?",
      "Aa",
      "AA",
      "A1",
      "A?",
      "1a",
      "1A",
      "11",
      "1?",
      "?a",
      "?A",
      "?1",
      "??",
      "aA1",
      "aA?",
      "A1?",
      "aaaaaaaa",
      "AAAAAAAA",
      "11111111",
      "????????",
      "aaaaaaaa1",
      "aaaaaaaa1?",
      "aaaaA1?",
      "aaaaaa[1",
      "aaaaaa[]",
    ];
    invalidPasswords.forEach((password) => {
      expect(isValidPassword(getPasswordProperties(password))).toBeFalsy();
    });
  });
});
