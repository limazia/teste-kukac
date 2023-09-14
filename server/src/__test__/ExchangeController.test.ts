import { Request, Response } from 'express'

import ExchangeController from '../controllers/ExchangeController'
import { makeExchange } from '../service/ExchangeService'

describe('ExchangeController', () => {
  it('deve retornar um erro se purchaseValue estiver faltando', () => {
    const req = { query: { deliveredValue: '10' } } as unknown as Request
    const res = { json: jest.fn() } as unknown as Response

    ExchangeController.index(req, res)

    expect(res.json).toHaveBeenCalledWith({ error: 'Parâmetro "purchaseValue" faltando' })
  })

  it('deve retornar um erro se deliveredValue estiver faltando', () => {
    const req = { query: { purchaseValue: '5' } } as unknown as Request
    const res = { json: jest.fn() } as unknown as Response

    ExchangeController.index(req, res)

    expect(res.json).toHaveBeenCalledWith({ error: 'Parâmetro "deliveredValue" faltando' })
  })

  it('deve retornar um erro se os parâmetros não forem números válidos', () => {
    const req = { query: { purchaseValue: 'abc', deliveredValue: 'xyz' } } as unknown as Request
    const res = { json: jest.fn() } as unknown as Response

    ExchangeController.index(req, res)

    expect(res.json).toHaveBeenCalledWith({ error: 'Os parâmetros devem ser números válidos' })
  })

  it('deve calcular a troca corretamente e retornar os resultados', () => {
    const req = { query: { purchaseValue: '5', deliveredValue: '15' } } as unknown as Request
    const res = { json: jest.fn() } as unknown as Response

    ExchangeController.index(req, res)

    const expectedResponse = { results: makeExchange(5, 15) }
    expect(res.json).toHaveBeenCalledWith(expectedResponse)
  })
})
