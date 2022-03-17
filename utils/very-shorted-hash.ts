const shortedHash = (hashSum: string): string => {
  if (hashSum) return `${hashSum.slice(0, 2)}...${hashSum.slice(-2)}`;

  return hashSum;
};

export default shortedHash;
