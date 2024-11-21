export const getRandomInteger = (a, b) => {
  if (a > b) {
    [a, b] = [b, a];
  }
  const lower = Math.ceil(a);
  const upper = Math.floor(b);
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};
