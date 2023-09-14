export interface Vehicle {
  model: string;
  yearManufacture: number;
  brand: string;
}

export enum CarDoors {
  MIN = 2,
  MAX = 4,
}

export enum MotorcyclePassengers {
  MIN = 1,
  MAX = 2,
}

export class Car implements Vehicle {
  constructor(
    public model: string,
    public yearManufacture: number,
    public quantityDoors: number,
    public brand: string
  ) {
    this.validateCarDoors()
  }

  private validateCarDoors() {
    if (this.quantityDoors < CarDoors.MIN || this.quantityDoors > CarDoors.MAX) {
      throw new InvalidCarDoorsError()
    }
  }
}

export class Motorcycle implements Vehicle {
  readonly wheels: number = 2

  constructor(
    public model: string,
    public yearManufacture: number,
    public brand: string,
    public passengers: number
  ) {
    this.validateMotorcyclePassengers()
  }

  private validateMotorcyclePassengers() {
    if (this.passengers < MotorcyclePassengers.MIN || this.passengers > MotorcyclePassengers.MAX) {
      throw new InvalidMotorcyclePassengersError()
    }
  }
}

export class InvalidCarDoorsError extends Error {
  constructor() {
    super('Número de portas inadequado para um automóvel')
    this.name = 'InvalidCarDoorsError'
  }
}

export class InvalidMotorcyclePassengersError extends Error {
  constructor() {
    super('Quantidade de ocupantes inadequada para uma motocicleta')
    this.name = 'InvalidMotorcyclePassengersError'
  }
}
