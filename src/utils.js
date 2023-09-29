const moneyToInt = (money) => {
    const number = money.split(',')
    if (number.length == 1) return Number(number[0] * 100)
    else return Number(number[0]*100) + Number(number[1]);
}

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
