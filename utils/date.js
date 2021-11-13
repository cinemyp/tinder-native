export const getUserAge = (seconds) => {
  const currentYear = new Date().getFullYear();
  const birthdayYear = new Date(seconds * 1000).getFullYear();
  return currentYear - birthdayYear;
};
