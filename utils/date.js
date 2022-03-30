export const getUserAge = (birthday) => {
  let milliseconds = 0;
  if (birthday instanceof Date) {
    milliseconds = birthday.getMilliseconds();
  } else if (typeof birthday === 'string') {
    const date = Date.parse(birthday);
    milliseconds = date;
  }
  const difference = Date.now() - milliseconds;
  const ageDate = new Date(difference);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};
