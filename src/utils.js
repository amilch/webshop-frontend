const moneyToInt = (money) =>
  money.replace(/\D/, '')

const OrderStatus = {
  0: 'created',
  1: 'payed',
  2: 'payment failed',
  3: 'shipped',
}

const formatDate = (isoDate) => {
  const date = new Date(Date.parse(isoDate))
  return date.toLocaleString('de-DE')
}

export {
  moneyToInt,
  OrderStatus,
  formatDate,
}
