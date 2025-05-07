




export const usePasswordStrength = (password: string): number => {
  let strength = 0;
  if (password.length >= 4) strength += 1; 
  if (/[A-Z]/.test(password) || /[a-z]/.test(password)) strength += 1; 
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;
  return strength;
};