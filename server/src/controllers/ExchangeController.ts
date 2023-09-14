import { Request, Response } from 'express'

import { makeExchange } from '@service/ExchangeService'

class ExchangeController {
  async index(req: Request, res: Response) {
    try {
      const { purchaseValue, deliveredValue } = req.query

      if (!purchaseValue) return res.json({ error: 'Parâmetro "purchaseValue" faltando' })
      if (!deliveredValue) return res.json({ error: 'Parâmetro "deliveredValue" faltando' })

      const purchase = parseFloat(purchaseValue as string)
      const delivered = parseFloat(deliveredValue as string)

      if (isNaN(purchase) || isNaN(delivered)) {
        return res.json({ error: 'Os parâmetros devem ser números válidos' })
      }

      const exchange = makeExchange(purchase, delivered)

      res.json({ results: exchange })
    } catch (ex) {
      res.json({ error: 'Erro ao calcular' })
    }
  }
}

export default new ExchangeController()
