/**
 * Email and password rules shared by the registration endpoint and the
 * credentials sign-in flow. Kept deliberately simple and dependency-free.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email);
}

export function isPasswordValid(password: string): boolean {
  return password.length >= 8 && password.length <= 128;
}

/**
 * Validation for the shared credential rules. Returns an error message or
 * null when the input is valid.
 */
export function validateCredentials(input: {
  email: string;
  password: string;
  name?: string;
}): string | null {
  if (!isValidEmail(input.email)) {
    return "Enter a valid email address.";
  }
  if (!isPasswordValid(input.password)) {
    return "Password must be 8 to 128 characters.";
  }
  if (input.name !== undefined && input.name.length > 60) {
    return "Name must be 60 characters or fewer.";
  }
  return null;
}
