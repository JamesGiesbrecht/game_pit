/* eslint-disable import/prefer-default-export */
export const toCurrency = (num) => (typeof num === 'number' ? `$${num.toFixed(2)}` : `$${num}`)
