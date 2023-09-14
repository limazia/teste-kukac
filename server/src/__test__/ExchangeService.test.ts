import { makeExchange } from '../service/ExchangeService'

describe('ExchangeService', () => {
  it('deve calcular a troca corretamente para valores válidos', () => {
    const exchange = makeExchange(5, 15)

    expect(exchange.purchaseValue).toBe(5)
    expect(exchange.deliveredValue).toBe(15)
    expect(exchange.quantityNotes1).toBe(0)
    expect(exchange.quantityNotes10).toBe(1)
    expect(exchange.quantityNotes100).toBe(1)
  })

  it('deve calcular a troca corretamente para valores diferentes', () => {
    const exchange = makeExchange(7, 22)

    expect(exchange.purchaseValue).toBe(7)
    expect(exchange.deliveredValue).toBe(22)
    expect(exchange.quantityNotes1).toBe(5)
    expect(exchange.quantityNotes10).toBe(1)
    expect(exchange.quantityNotes100).toBe(1)
  })

  it('deve retornar troca zero para valores iguais', () => {
    const exchange = makeExchange(10, 10)

    expect(exchange.purchaseValue).toBe(10)
    expect(exchange.deliveredValue).toBe(10)
    expect(exchange.quantityNotes1).toBe(0)
    expect(exchange.quantityNotes10).toBe(0)
    expect(exchange.quantityNotes100).toBe(0)
  })
})
