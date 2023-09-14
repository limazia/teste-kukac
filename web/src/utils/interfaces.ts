export interface Palindrome {
  results: number[];
}

export interface Exchange {
  purchaseValue: number;
  deliveredValue: number;
  quantityNotes1: number;
  quantityNotes10: number;
  quantityNotes100: number;
}

export interface Cep {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

interface VehicleBase {
  model: string;
  yearManufacture: number | string;
  brand: string;
}

interface Car extends VehicleBase {
  type: "car";
  quantityDoors: number | string;
}

interface Motorcycle extends VehicleBase {
  type: "motorcycle";
  passengers: number | string;
}

export type Vehicle = Car | Motorcycle;
