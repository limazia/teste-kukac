import { useState } from "react";
import { toast } from "react-toastify";

import { getExchange } from "utils/services/api";
import { Exchange as ExchangeResponse } from "utils/interfaces";

import { Input } from "@components/Forms/Input";
import { Button } from "@components/Forms/Button";

export function Exchange() {
  const [response, setResponse] = useState<ExchangeResponse | null>(null);
  const [purchaseValue, setPurchaseValue] = useState<string>("");
  const [deliveredValue, setDeliveredValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      loadExchange();

      setLoading(false);
    } catch (error) {
      toast.error("Tente novamente mais tarde");
    }
  }

  const loadExchange = async () => {
    const { results, error } = await getExchange(purchaseValue, deliveredValue);

    if (error) {
      toast.error(error);
    } else {
      setResponse(results);
    }
  };

  const isValid = () => loading || !purchaseValue || !deliveredValue;

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Calcular troco</h5>

        <form onSubmit={handleSubmit}>
          <div className="row mt-4">
            <div className="col-md-6">
              <Input.Root>
                <label htmlFor="purchaseValue">Valor Compra</label>
                <Input.Content
                  type="number"
                  id="purchaseValue"
                  disabled={loading}
                  value={purchaseValue}
                  onChange={(e) => setPurchaseValue(e.target.value)}
                />
              </Input.Root>
            </div>
            <div className="col-md-6">
              <Input.Root>
                <label htmlFor="deliveredValue">Valor Entregue</label>
                <Input.Content
                  type="number"
                  id="deliveredValue"
                  disabled={loading}
                  value={deliveredValue}
                  onChange={(e) => setDeliveredValue(e.target.value)}
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
                Calcular
              </Button>
            </div>
          </div>
        </form>

        {response && (
          <div className="row mt-4">
            <div className="col-md-12">
              <span>Resultado</span>

              <ul className="list-group mt-3">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Valor Compra
                  <span className="badge badge-primary badge-pill">
                    R$ {response.purchaseValue}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Valor Entregue
                  <span className="badge badge-primary badge-pill">
                    R$ {response.deliveredValue}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Quantidade de Notas de R$ 1
                  <span className="badge badge-primary badge-pill">
                    {response.quantityNotes1}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Quantidade de Notas de R$ 10
                  <span className="badge badge-primary badge-pill">
                    {response.quantityNotes10}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Quantidade de Notas de R$ 100
                  <span className="badge badge-primary badge-pill">
                    {response.quantityNotes100}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
