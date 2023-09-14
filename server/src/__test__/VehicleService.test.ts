import * as fs from 'fs'

import {
  readData,
  registerCar,
  registerMotorcycle,
} from '../service/VehicleService'
import { Car, Motorcycle } from '../models/VehicleModel'

jest.mock('fs')

describe('VehicleService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('deve ler dados corretamente', () => {
    const mockReadFileSync = jest.spyOn(fs, 'readFileSync')
    mockReadFileSync.mockReturnValue('[]')

    const data = readData()

    expect(data).toEqual([])
  })

  it('deve cadastrar um carro corretamente', () => {
    const mockReadFileSync = jest.spyOn(fs, 'readFileSync')
    const mockWriteFileSync = jest.spyOn(fs, 'writeFileSync')
    mockReadFileSync.mockReturnValue('[]')

    const car = new Car('Car', 2022, 4, 'Brand')
    const registeredCar = registerCar(car)

    expect(mockWriteFileSync).toHaveBeenCalled()
    expect(registeredCar).toEqual(car)
  })

  it('deve cadastrar uma moto corretamente', () => {
    const mockReadFileSync = jest.spyOn(fs, 'readFileSync')
    const mockWriteFileSync = jest.spyOn(fs, 'writeFileSync')
    mockReadFileSync.mockReturnValue('[]')

    const motorcycle = new Motorcycle('Motorcycle', 2022, 'Brand', 2)
    const registeredMotorcycle = registerMotorcycle(motorcycle)

    expect(mockWriteFileSync).toHaveBeenCalled()
    expect(registeredMotorcycle).toEqual(motorcycle)
  })
})
