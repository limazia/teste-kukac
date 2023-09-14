import { Router } from 'express'

import PalindromesController from '@controllers/PalindromeController'
import ExchangeController from '@controllers/ExchangeController'
import VehicleController from '@controllers/VehicleController'

const router = Router()

router.get('/vehicles', VehicleController.index)
router.post('/vehicles/create/car', VehicleController.storeCar)
router.post('/vehicles/create/motorcycle', VehicleController.storeMotorcycle)

// Rota para buscar Palindromos
router.get('/palindromes', PalindromesController.index)

//Rota para calcular o Troco
router.get('/exchange', ExchangeController.index)

export default router
