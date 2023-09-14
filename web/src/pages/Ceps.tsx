import React, { useState } from "react";
import { toast } from "react-toastify";

import { getCeps } from "utils/services/api";
import { Cep as CepResponse } from "utils/interfaces";

import { Input } from "@components/Forms/Input";
import { Button } from "@components/Forms/Button";

export function Ceps() {
  const [response, setResponse] = useState<CepResponse[]>([]);
  const [ceps, setCeps] = useState<string[]>(["", "", "", "", ""]);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const newResponses: CepResponse[] = [];

    for (const cep of ceps) {
      try {
        const results = await getCeps(cep);
        newResponses.push(results);
      } catch (error) {
        toast.error("Tente novamente mais tarde");
        newResponses.push({
          cep,
          logradouro: "",
          complemento: "",
          bairro: "",
          localidade: "",
          uf: "",
        });
      }
    }

    setResponse(newResponses);
    setLoading(false);
  }

  function handleReset() {
    setCeps(["", "", "", "", ""]);
    setResponse([]);
  }

  const isValid = () => loading || !ceps;

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Buscar CEPs</h5>

        <form onSubmit={handleSubmit}>
          <div className="row">
            {ceps.map((cep, index) => (
              <div key={`cep-${index}`} className="col-md-12 mt-4">
                <Input.Root>
                  <label htmlFor={`cep${index + 1}`}>CEP {index + 1}</label>
                  <Input.Content
                    type="text"
                    id={`cep${index + 1}`}
                    disabled={loading}
                    value={cep}
                    onChange={(e) => {
                      const newCeps = [...ceps];
                      newCeps[index] = e.target.value;
                      setCeps(newCeps);
                    }}
                  />
                </Input.Root>
              </div>
            ))}
          </div>

          <div className="row mt-4">
            <div className="col-md-6">
              <Button
                type="submit"
                className="btn btn-send btn-block"
                disabled={isValid()}
                loading={loading}
              >
                Buscar CEPs
              </Button>
            </div>
            <div className="col-md-6">
              <Button
                type="button" // Change type to 'button'
                className="btn btn-send btn-block"
                disabled={loading}
                onClick={handleReset}
              >
                Limpar
              </Button>
            </div>
          </div>
        </form>

        {response?.length > 0 && (
          <div className="row mt-4">
            <div className="col-md-12">
              <span>Resultado</span>

              <div className="row mt-3">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-body">
                      {response.map((result, index) => (
                        <div
                          key={`card-cep-${index}`}
                          className={`row ${index === 0 ? "" : "mt-4"}`}
                        >
                          <div className="col-md-12">
                            <div className="card">
                              <div className="card-body">
                                <p className="mb-0">
                                  <b>CEP: </b> <span>{result?.cep}</span>
                                </p>
                                <p className="mb-0">
                                  <b>Logradouro: </b>
                                  <span>{result?.logradouro}</span>
                                </p>
                                <p className="mb-0">
                                  <b>Complemento: </b>
                                  <span>{result?.complemento}</span>
                                </p>
                                <p className="mb-0">
                                  <b>Bairro: </b>{" "}
                                  <span>{result?.bairro}</span>
                                </p>
                                <p className="mb-0">
                                  <b>Localidade: </b>
                                  <span>{result?.localidade}</span>
                                </p>
                                <p className="mb-0">
                                  <b>UF: </b> <span>{result?.uf}</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
