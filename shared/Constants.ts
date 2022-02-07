export const regExpConstants = {
  upperCaseRegExp: '(?=.*[A-Z])',
  lowerCaseRegExp: '(?=.*[a-z])',
  digitRegExp: '(?=.*[0-9])',
};
export const nicknameValidation = {
  minLength: 3,
  maxlength: 32,
};

export const passwordValidation = {
  passwordRegExp: new RegExp(
    `${regExpConstants.upperCaseRegExp}${regExpConstants.lowerCaseRegExp}${regExpConstants.digitRegExp}`
  ),
  minLength: 6,
  maxlength: 32,
};
