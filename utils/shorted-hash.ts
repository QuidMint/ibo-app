const shortedHash = (hashSum: string): string => {
  if (hashSum) return `${hashSum.slice(0, 6)}...${hashSum.slice(-4)}`;

  return hashSum;
};

export default shortedHash;
