import { PasswordValidationCheck } from "@/types/password.type";

export function getPasswordValidationCheck(password: string, confirmPassword: string): PasswordValidationCheck {
  const hasMinLength = password.length >= 12;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_\-+=;/'\[\]\\]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const matchesConfirm = password.length > 0 && password === confirmPassword;

  return {
    hasMinLength,
    hasSpecialChar,
    hasUppercase,
    hasLowercase,
    matchesConfirm,
    isValid: hasMinLength && hasSpecialChar && hasUppercase && hasLowercase && matchesConfirm,
  };
}
