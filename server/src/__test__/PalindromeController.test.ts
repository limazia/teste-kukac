import { Request, Response } from 'express'

import PalindromeController from '../controllers/PalindromeController'
import { savePalindromes } from '../service/PalindromeService'

describe('PalindromeController', () => {
  it('deve retornar um erro se startNumber estiver faltando', () => {
    const req = { query: { endNumber: '10' } } as unknown as Request
    const res = { json: jest.fn() } as unknown as Response

    PalindromeController.index(req, res)

    expect(res.json).toHaveBeenCalledWith({ error: 'Parâmetro "startNumber" faltando' })
  })

  it('deve retornar um erro se endNumber estiver faltando', () => {
    const req = { query: { startNumber: '5' } } as unknown as Request
    const res = { json: jest.fn() } as unknown as Response

    PalindromeController.index(req, res)

    expect(res.json).toHaveBeenCalledWith({ error: 'Parâmetro "endNumber" faltando' })
  })

  it('deve retornar um erro se os parâmetros não forem números inteiros', () => {
    const req = { query: { startNumber: 'abc', endNumber: 'xyz' } } as unknown as Request
    const res = { json: jest.fn() } as unknown as Response

    PalindromeController.index(req, res)

    expect(res.json).toHaveBeenCalledWith({ error: 'Os parâmetros devem ser números inteiros' })
  })

  it('deve buscar números palíndromos corretamente e retornar os resultados', () => {
    const req = { query: { startNumber: '10', endNumber: '20' } } as unknown as Request
    const res = { json: jest.fn() } as unknown as Response

    PalindromeController.index(req, res)

    const expectedResponse = { results: savePalindromes(10, 20) }
    expect(res.json).toHaveBeenCalledWith(expectedResponse)
  })
})
