export const setStorage = (flag: string, value: string): void => {
  localStorage.setItem(flag, value);
};

export const getStorage = (flag: string): string | null => {
  const existValue = localStorage.getItem(flag);
  if (existValue) {
    return existValue;
  } else {
    return null;
  }
};
