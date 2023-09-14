import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { getVehicles, createVehicle } from "utils/services/api";
import { Vehicle } from "utils/interfaces";

import { Input } from "@components/Forms/Input";
import { Button } from "@components/Forms/Button";
import { Spinner } from "@components/Spinner";

export function Vehicles() {
  const [response, setResponse] = useState<Vehicle[]>([]);
  const [typeVehicle, setTypeVehicle] = useState<"car" | "motorcycle">("car");
  const [model, setModel] = useState("");
  const [yearManufacture, setYearManufacture] = useState("");
  const [brand, setBrand] = useState("");
  const [quantityDoors, setQuantityDoors] = useState("");
  const [passengers, setPassengers] = useState("");
  const [vehicleLoading, setVehicleLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadVehicles();

    setTimeout(() => setVehicleLoading(false), 2000);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const vehicle: Vehicle =
        typeVehicle === "car"
          ? { model, yearManufacture, quantityDoors, brand, type: "car" }
          : { model, yearManufacture, brand, passengers, type: "motorcycle" };

      const { message, error } = await createVehicle(typeVehicle, vehicle);

      if (message) {
        toast.success(message);

        setModel("");
        setYearManufacture("");
        setQuantityDoors("");
        setBrand("");
        setPassengers("");
        setLoading(false);
        loadVehicles();
      } else {
        toast.error(error);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Tente novamente mais tarde");
    }
  }

  const loadVehicles = async () => {
    const { results, error } = await getVehicles();

    if (error) {
      toast.error(error);
      setVehicleLoading(true);
    } else {
      setResponse(results);
    }
  };

  const isValid = () => loading || !model || !yearManufacture || !brand;

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Cadastrar veículo</h5>

        <form onSubmit={handleSubmit}>
          <div className="row mt-4">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="typeVehicle">Tipo de Veículo</label>
                <select
                  className="form-control"
                  id="typeVehicle"
                  disabled={loading}
                  value={typeVehicle}
                  onChange={(e) =>
                    setTypeVehicle(e.target.value as "car" | "motorcycle")
                  }
                >
                  <option value="car">Carro</option>
                  <option value="motorcycle">Moto</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              {typeVehicle === "car" && (
                <div className="form-group">
                  <label htmlFor="quantityDoors">Quantidade de Portas</label>
                  <select
                    className="form-control"
                    id="quantityDoors"
                    disabled={loading}
                    value={quantityDoors}
                    onChange={(e) => setQuantityDoors(e.target.value)}
                  >
                    <option disabled selected></option>
                    <option value={2}>2 Portas</option>
                    <option value={4}>4 Portas</option>
                  </select>
                </div>
              )}

              {typeVehicle === "motorcycle" && (
                <div className="form-group">
                  <label htmlFor="passengers">Passageiros</label>
                  <select
                    className="form-control"
                    id="passengers"
                    disabled={loading}
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-md-5">
              <Input.Root>
                <label htmlFor="brand">Marca</label>
                <Input.Content
                  type="text"
                  id="brand"
                  disabled={loading}
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </Input.Root>
            </div>
            <div className="col-md-5">
              <Input.Root>
                <label htmlFor="model">Modelo</label>
                <Input.Content
                  type="text"
                  id="model"
                  disabled={loading}
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
              </Input.Root>
            </div>

            <div className="col-md-2">
              <Input.Root>
                <label htmlFor="yearManufacture">Ano</label>
                <Input.Content
                  type="text"
                  id="yearManufacture"
                  disabled={loading}
                  value={yearManufacture}
                  onChange={(e) => setYearManufacture(e.target.value)}
                />
              </Input.Root>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-12">
              <Button
                type="submit"
                className="btn btn-send btn-block"
                disabled={isValid()}
                loading={loading}
              >
                Criar {typeVehicle === "car" ? "carro" : "moto"}
              </Button>
            </div>
          </div>
        </form>

        <div className="row mt-4">
          <div className="col-md-12">
            <span>Lista</span>

            {response?.length > 0 ? (
              <div className="mt-3">
                {vehicleLoading ? (
                  <Spinner colorClass="dark" size="2rem" />
                ) : (
                  <>
                    {response.map((result, index) => (
                      <div
                        key={`card-cep-${index}`}
                        className={`row ${index === 0 ? "" : "mt-4"}`}
                      >
                        <div className="col-md-12">
                          <div className="card">
                            <div className="card-body">
                              <p className="mb-0">
                                <span>{result.brand}</span>{" "}
                                <span>{result.model}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            ) : (
              <div className="d-block">
                <span className="text-muted">Nenhum veículo encontrado</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
