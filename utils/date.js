export const getUserAge = (seconds) => {
  const difference = Date.now() - seconds * 1000;
  const ageDate = new Date(difference);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};
