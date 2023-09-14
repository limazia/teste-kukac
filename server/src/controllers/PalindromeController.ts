import { Request, Response } from 'express'

import { savePalindromes } from '@service/PalindromeService'

class PalindromeController {
  async index(req: Request, res: Response) {
    try {
      const { startNumber, endNumber } = req.query

      if (!startNumber) return res.json({ error: 'Parâmetro "startNumber" faltando' })
      if (!endNumber) return res.json({ error: 'Parâmetro "endNumber" faltando' })

      const start = parseInt(startNumber as string, 10)
      const end = parseInt(endNumber as string, 10)

      if (isNaN(start) || isNaN(end)) {
        return res.json({ error: 'Os parâmetros devem ser números inteiros' })
      }

      const numbersPalindromes = savePalindromes(start, end)

      res.json({ results: numbersPalindromes })
    } catch (ex) {
      res.json({ error: 'Erro ao buscar números palíndromos' })
    }
  }
}

export default new PalindromeController()
