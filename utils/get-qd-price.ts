const ONE_DAY = 24 * 60 * 60 * 1; // 1 day in seconds
const START_PRICE = 22;
const FINAL_PRICE = 96;
const SALE_LENGTH = 54 * ONE_DAY;

export const getQDPrice = (saleStart: number) => {
  console.log('getQDPrice: ', Date.now() / 1000, saleStart / 1000);
  const timeElapsed = Date.now() / 1000 - saleStart / 1000;
  console.log('timeElapsed: ', timeElapsed);
  const priceDiff = FINAL_PRICE - START_PRICE;
  const K = timeElapsed / SALE_LENGTH;

  return K * priceDiff + START_PRICE;
};
