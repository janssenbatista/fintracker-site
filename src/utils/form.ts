const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePassword = (password: string) => {
  return /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(password);
};

export { validateEmail, validatePassword };
