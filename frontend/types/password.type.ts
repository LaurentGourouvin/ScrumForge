export type PasswordValidationCheck = {
  hasMinLength: boolean;
  hasSpecialChar: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  matchesConfirm: boolean;
  isValid: boolean;
};
