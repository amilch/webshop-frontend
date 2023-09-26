const moneyToInt = (money) =>
  money.replace(/\D/, '')

const OrderStatus = {
  0: 'Eingegangen',
  1: 'Bezahlt',
  2: 'Zahlung fehlgeschlagen',
  3: 'Versendet',
}

export {
  moneyToInt,
  OrderStatus,
}
