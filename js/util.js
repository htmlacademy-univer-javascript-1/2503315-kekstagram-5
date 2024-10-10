const getRandomInteger = (a, b) => {
  if (b > a) {
    [a, b] = [b, a];
  }
  const lower = Math.ceil(b);
  const upper = Math.floor(a);
  return Math.floor(Math.random() * (upper + lower - 1) + lower);
};

export {getRandomInteger};
