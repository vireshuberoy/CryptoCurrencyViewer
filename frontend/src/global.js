export function setLoginToken(data) {
  return localStorage.setItem("loggedIn", data);
}

export function removeLoginToken() {
  return localStorage.removeItem("loggedIn");
}

export function getLoginToken() {
  return JSON.parse(localStorage.getItem("loggedIn"));
}

export const PASS_REGEX = {
  length: /^[A-Za-z\d@$!%*?&+]{8,20}$/,
  case: /^.*(?=.*[a-z])(?=.*[A-Z]).*$/,
  specialCharacter: /^.*(?=.*[@$!%*?&+]).*$/,
  digit: /^.*(?=.*\d).*$/,
};

export const PASS_VALID_MSGS = {
  length: "Length should be between 8-20 characters",
  case: "Should contain at least one lowercase and uppercase character",
  specialCharacter:
    "Should contain at least one special character, and not any others: (allowed characters- @, $, !, %, *, ?, &, +)",
  digit: "Should contain at least one digit",
};
