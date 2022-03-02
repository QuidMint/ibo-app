const leftZero = (value: number | string) => {
  return ('0' + String(value)).slice(-2);
};

export const formatDate = (timestamp: string | number): string => {
  const dateObj = new Date(+timestamp * 1000);
  return `${leftZero(dateObj.getMonth())}.${leftZero(
    dateObj.getDate(),
  )}.${dateObj.getFullYear()}`;
};

export const formatDateNoYear = (timestamp: string | number): string => {
  const dateObj = new Date(+timestamp * 1000);
  return `${leftZero(dateObj.getMonth())}.${leftZero(
    dateObj.getDate(),
  )}`;
};

export const formatTime = (timestamp: string | number): string => {
  const dateObj = new Date(+timestamp * 1000);
  return `${leftZero(dateObj.getHours())}:${leftZero(dateObj.getMinutes())}`;
};
