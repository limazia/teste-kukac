import { Exchange } from '@models/ExchangeModel'

export const makeExchange = (purchaseValue: number, deliveredValue: number): Exchange => {
  const exchange: Exchange = {
    purchaseValue,
    deliveredValue,
    quantityNotes1: 0,
    quantityNotes10: 0,
    quantityNotes100: 0,
  }

  let valueExchange = deliveredValue - purchaseValue

  while (valueExchange > 0) {
    if (valueExchange >= 100) {
      exchange.quantityNotes100++
      valueExchange -= 100
    } else if (valueExchange >= 10) {
      exchange.quantityNotes10++
      valueExchange -= 10
    } else {
      exchange.quantityNotes1++
      valueExchange -= 1
    }
  }

  return exchange
}


