import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { Vehicle, Car, Motorcycle } from '@models/VehicleModel'

const DB_FILE = resolve('src', 'db.json')

export const readData = (): Vehicle[] => {
  try {
    const data = readFileSync(DB_FILE, 'utf-8')

    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

const saveData = (vehicles: Vehicle[]) => {
  const data = JSON.stringify(vehicles, null, 2)

  writeFileSync(DB_FILE, data)
}

export const registerCar = (car: Car): Vehicle => {
  const vehicles = readData()
  vehicles.push(car)
  saveData(vehicles)

  return car
}

export const registerMotorcycle = (motorcycle: Motorcycle): Vehicle => {
  const vehicles = readData()
  vehicles.push(motorcycle)
  saveData(vehicles)

  return motorcycle
}
