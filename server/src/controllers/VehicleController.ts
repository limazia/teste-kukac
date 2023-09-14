import { Request, Response } from 'express'

import { Car, Motorcycle } from '@models/VehicleModel'
import {
  readData,
  registerCar,
  registerMotorcycle,
} from '@service/VehicleService'

class VehicleController {
  async index(req: Request, res: Response) {
    try {
      const vehicles = readData()

      res.json({ results: vehicles })
    } catch (error) {
      res.json({ error: 'Não foi possível listar os carros' })
    }
  }

  async storeCar(req: Request, res: Response) {
    try {
      const { vehicle } = req.body
      const { model, yearManufacture, quantityDoors, brand } = vehicle

      const carro = new Car(model, yearManufacture, quantityDoors, brand)
      registerCar(carro)

      res.json({ message: 'Carro cadastrado com sucesso' })
    } catch (ex) {
      console.log(ex)
      res.json({ error: 'Não foi possível cadastrar o carro' })
    }
  }

  async storeMotorcycle(req: Request, res: Response) {
    try {
      const { vehicle } = req.body
      const { model, yearManufacture, brand, passengers } = vehicle

      const moto = new Motorcycle(model, yearManufacture, brand, passengers)
      registerMotorcycle(moto)

      res.json({ message: 'Moto cadastrada com sucesso' })
    } catch (ex) {
      res.json({ error: 'Não foi possível cadastrar a moto' })
    }
  }
}

export default new VehicleController()
