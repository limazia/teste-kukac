import axios from "axios";

import { Vehicle } from "utils/interfaces";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

const viaCep = axios.create({
  baseURL: "https://viacep.com.br",
});

export const getPalindromes = async (startNumber: string, endNumber: string) => {
  try {
    const { data } = await api.get(`/palindromes?startNumber=${startNumber}&endNumber=${endNumber}`);

    return data;
  } catch (ex) {
    console.error("[GET /palindromes] > could not complete the request");
  }
};

export const getExchange = async (purchaseValue: string, deliveredValue: string) => {
  try {
    const { data } = await api.get(`/exchange?purchaseValue=${purchaseValue}&deliveredValue=${deliveredValue}`);

    return data;
  } catch (ex) {
    console.error("[GET /exchange] > could not complete the request");
  }
};

export const getVehicles = async () => {
  try {
    const { data } = await api.get("/vehicles");

    return data;
  } catch (ex) {
    console.error("[GET /vehicles] > could not complete the request");
  }
};

export const createVehicle = async (vehicleType: string, vehicle: Vehicle) => {
  try {
    const { data } = await api.post(`/vehicles/create/${vehicleType}`, { vehicle });

    return data;
  } catch (ex) {
    console.error("[POST /vehicles/create/:vehicleType] > could not complete the request");
  }
};

export const getCeps = async (cep: string) => {
  try {
    const { data } = await viaCep.get(`/ws/${cep}/json/`);

    return data;
  } catch (ex) {
    console.error("[GET /ws/:cep/json] > could not complete the request");
  }
};

