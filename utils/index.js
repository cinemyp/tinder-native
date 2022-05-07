export const capitalizeFirstLetter = (
  [first, ...rest],
  locale = navigator.language
) => first.toLocaleUpperCase(locale) + rest.join('');

export const limitText = (text, limit) => {
  text = text.trim();
  if (text.length <= limit) return text;
  text = text.slice(0, limit); // тупо отрезать по лимиту
  lastSpace = text.lastIndexOf(' ');
  if (lastSpace > 0) {
    // нашлась граница слов, ещё укорачиваем
    text = text.substr(0, lastSpace);
  }
  return text + '...';
};

export const compareArrays = (arr1, arr2) => {
  return (
    arr1.length === arr2.length &&
    arr1.every((item) => arr2.indexOf(item) !== -1)
  );
};
