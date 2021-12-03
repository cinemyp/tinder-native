export const getUserAge = (seconds) => {
  console.log(seconds);
  const difference = Date.now() - seconds * 1000;
  console.log(difference);
  const ageDate = new Date(difference);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};
